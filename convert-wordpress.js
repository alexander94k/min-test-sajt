import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { parseString } from 'xml2js';
import { promisify } from 'util';

const parseXML = promisify(parseString);

// Function to download image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Clean WordPress block comments
function cleanWordPressBlocks(html) {
  return html.replace(/<!-- wp:.*?-->/g, '');
}

// Convert HTML to Markdown with proper line breaks
function htmlToMarkdown(html, imagesDir, articleSlug) {
  let md = html;

  // Clean WordPress blocks
  md = cleanWordPressBlocks(md);

  // Track images to download
  const imagesToDownload = [];

  // Find all img tags (more flexible regex)
  const imgRegex = /<img[^>]+>/gi;
  const imgMatches = html.match(imgRegex) || [];

  imgMatches.forEach(imgTag => {
    // Extract src
    const srcMatch = imgTag.match(/src=["']([^"']+)["']/i);
    if (!srcMatch) return;

    const src = srcMatch[1];

    // Extract alt (optional)
    const altMatch = imgTag.match(/alt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1] : '';

    // Create filename and path
    const filename = `${articleSlug}-${path.basename(src)}`;
    const localPath = `/images/articles/${filename}`;
    const fullLocalPath = path.join(imagesDir, filename);

    // Add to download list
    imagesToDownload.push({ url: src, filename, localPath: fullLocalPath });

    // Replace in markdown
    md = md.replace(imgTag, `\n\n![${alt || 'Image'}](${localPath})\n\n`);
  });

  // Headers
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n\n## $1\n\n');
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n\n### $1\n\n');
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n\n#### $1\n\n');

  // Paragraphs - add double line breaks
  md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, '\n\n$1\n\n');

  // Line breaks
  md = md.replace(/<br\s*\/?>/gi, '  \n');

  // Lists
  md = md.replace(/<ul[^>]*>/gi, '\n');
  md = md.replace(/<\/ul>/gi, '\n');
  md = md.replace(/<ol[^>]*>/gi, '\n');
  md = md.replace(/<\/ol>/gi, '\n');
  md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');

  // Bold and Italic
  md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');

  // Links
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

  // Remove remaining HTML tags
  md = md.replace(/<[^>]+>/g, '');

  // Decode HTML entities
  md = md.replace(/&nbsp;/g, ' ');
  md = md.replace(/&amp;/g, '&');
  md = md.replace(/&lt;/g, '<');
  md = md.replace(/&gt;/g, '>');
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#8217;/g, "'");
  md = md.replace(/&#8220;/g, '"');
  md = md.replace(/&#8221;/g, '"');
  md = md.replace(/&#8211;/g, '–');
  md = md.replace(/&#8212;/g, '—');

  // Clean up multiple newlines (more than 2 in a row)
  md = md.replace(/\n{3,}/g, '\n\n');

  // Trim
  md = md.trim();

  return { md, imagesToDownload };
}

// Create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/å/g, 'a')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function convertWordPress() {
  const xmlPath = '/Users/alexander/Desktop/min-test-sajt/rnta.WordPress.2026-01-10.xml';
  const outputDir = '/Users/alexander/Desktop/min-test-sajt/src/content/artiklar';
  const imagesDir = '/Users/alexander/Desktop/min-test-sajt/public/images/articles';

  // Create directories if they don't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Read and parse XML
  const xmlContent = fs.readFileSync(xmlPath, 'utf-8');
  const result = await parseXML(xmlContent);

  const items = result.rss.channel[0].item || [];
  let processedCount = 0;

  for (const item of items) {
    // Only process posts
    const postType = item['wp:post_type'] ? item['wp:post_type'][0] : '';
    if (postType !== 'post') continue;

    // Extract data
    let title = item.title ? item.title[0] : 'Untitled';
    // Remove HTML tags from title
    title = title.replace(/<[^>]+>/g, '').trim();
    const contentHtml = item['content:encoded'] ? item['content:encoded'][0] : '';
    const pubDate = item.pubDate ? item.pubDate[0] : new Date().toISOString();
    const author = item['dc:creator'] ? item['dc:creator'][0] : 'Unknown';

    // Create slug
    const slug = createSlug(title);

    // Convert to Markdown
    const { md: contentMd, imagesToDownload } = htmlToMarkdown(contentHtml, imagesDir, slug);

    // Extract description (first paragraph)
    const firstParagraph = contentMd.split('\n\n')[0].substring(0, 160);
    const description = firstParagraph.replace(/[#*\[\]]/g, '').trim();

    // Download images
    console.log(`Processing: ${title}`);
    for (const img of imagesToDownload) {
      try {
        console.log(`  Downloading: ${img.filename}`);
        await downloadImage(img.url, img.localPath);
      } catch (error) {
        console.log(`  Failed to download ${img.filename}: ${error.message}`);
      }
    }

    // Create frontmatter with first image as featured image
    let featuredImagePath = '';
    if (imagesToDownload.length > 0) {
      // Get the web path (not the file system path)
      featuredImagePath = `/images/articles/${imagesToDownload[0].filename}`;
    }

    const featuredImageLine = featuredImagePath
      ? `featuredImage: ${featuredImagePath}\n`
      : '';

    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
publishDate: ${new Date(pubDate).toISOString().split('T')[0]}
author: "${author.replace(/"/g, '\\"')}"
${featuredImageLine}---

${contentMd}`;

    // Write file
    const filename = `${slug}.md`;
    const filepath = path.join(outputDir, filename);
    fs.writeFileSync(filepath, frontmatter);
    processedCount++;
    console.log(`  ✓ Created: ${filename}`);
  }

  console.log(`\n✓ Successfully converted ${processedCount} articles`);
}

convertWordPress().catch(console.error);
