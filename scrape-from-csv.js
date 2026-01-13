import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

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

// Fetch JSON from URL
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Clean WordPress blocks
function cleanWordPressBlocks(html) {
  return html.replace(/<!-- wp:.*?-->/g, '');
}

// Convert HTML to Markdown
function htmlToMarkdown(html, imagesDir, articleSlug, wpImages) {
  let md = html;

  // Clean WordPress blocks
  md = cleanWordPressBlocks(md);

  // Track images to download
  const imagesToDownload = [];

  // Find all img tags
  const imgRegex = /<img[^>]+>/gi;
  const imgMatches = html.match(imgRegex) || [];

  imgMatches.forEach(imgTag => {
    const srcMatch = imgTag.match(/src=["']([^"']+)["']/i);
    if (!srcMatch) return;

    const src = srcMatch[1];
    const altMatch = imgTag.match(/alt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1] : '';

    const filename = `${articleSlug}-${path.basename(src)}`;
    const localPath = `/images/articles/${filename}`;
    const fullLocalPath = path.join(imagesDir, filename);

    imagesToDownload.push({ url: src, filename, localPath: fullLocalPath });
    md = md.replace(imgTag, `\n\n![${alt || 'Image'}](${localPath})\n\n`);
  });

  // Headers
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n\n## $1\n\n');
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n\n### $1\n\n');
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n\n#### $1\n\n');

  // Paragraphs
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

  // Clean up multiple newlines
  md = md.replace(/\n{3,}/g, '\n\n');
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

async function scrapeArticles() {
  const csvPath = '/Users/alexander/Desktop/min-test-sajt/sitemap.csv';
  const outputDir = '/Users/alexander/Desktop/min-test-sajt/src/content/artiklar';
  const imagesDir = '/Users/alexander/Desktop/min-test-sajt/public/images/articles';

  // Create directories
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Read CSV
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const urls = csvContent.split('\n').filter(line => line.includes('/artiklar/') ||
    (line.includes('xn--rnta-loa.nu') && !line.includes('berakna') && !line.includes('artiklar/') &&
     (line.includes('ranta') || line.includes('billan') || line.includes('klarna') || line.includes('krypto') ||
      line.includes('tips') || line.includes('lag-') || line.includes('nyckelfardigt') || line.includes('hitta') ||
      line.includes('kontokredit') || line.includes('riksbanken') || line.includes('effektiv'))));

  console.log(`Found ${urls.length} article URLs`);

  let processedCount = 0;

  for (const url of urls) {
    const cleanUrl = url.trim();
    if (!cleanUrl || cleanUrl === 'https://xn--rnta-loa.nu/' || cleanUrl === 'https://xn--rnta-loa.nu/artiklar/') continue;

    try {
      // Get slug from URL
      const urlSlug = cleanUrl.split('/').filter(Boolean).pop();

      // Try WordPress REST API
      const apiUrl = `https://xn--rnta-loa.nu/wp-json/wp/v2/posts?slug=${urlSlug}`;
      console.log(`\nFetching: ${cleanUrl}`);

      const posts = await fetchJSON(apiUrl);

      if (!posts || posts.length === 0) {
        console.log(`  ✗ No post found for ${urlSlug}`);
        continue;
      }

      const post = posts[0];
      const title = post.title.rendered.replace(/<[^>]+>/g, '').trim();
      const contentHtml = post.content.rendered;
      const excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '').trim().substring(0, 160);
      const publishDate = new Date(post.date).toISOString().split('T')[0];

      // Get featured image
      let featuredImageUrl = null;
      if (post.featured_media) {
        try {
          const mediaUrl = `https://xn--rnta-loa.nu/wp-json/wp/v2/media/${post.featured_media}`;
          const media = await fetchJSON(mediaUrl);
          if (media && media.source_url) {
            featuredImageUrl = media.source_url;
          }
        } catch (e) {
          console.log(`  ! Could not fetch featured image`);
        }
      }

      const slug = createSlug(title);
      const { md: contentMd, imagesToDownload } = htmlToMarkdown(contentHtml, imagesDir, slug, []);

      // Download images
      for (const img of imagesToDownload) {
        try {
          console.log(`  Downloading: ${img.filename}`);
          await downloadImage(img.url, img.localPath);
        } catch (error) {
          console.log(`  Failed to download ${img.filename}: ${error.message}`);
        }
      }

      // Download featured image if exists
      if (featuredImageUrl) {
        try {
          const featuredFilename = `${slug}-featured${path.extname(featuredImageUrl)}`;
          const featuredLocalPath = path.join(imagesDir, featuredFilename);
          console.log(`  Downloading featured: ${featuredFilename}`);
          await downloadImage(featuredImageUrl, featuredLocalPath);
          imagesToDownload.unshift({ filename: featuredFilename, localPath: featuredLocalPath });
        } catch (error) {
          console.log(`  Failed to download featured image: ${error.message}`);
        }
      }

      // Create frontmatter
      let featuredImagePath = '';
      if (imagesToDownload.length > 0) {
        featuredImagePath = `/images/articles/${imagesToDownload[0].filename}`;
      }

      const featuredImageLine = featuredImagePath
        ? `featuredImage: ${featuredImagePath}\n`
        : '';

      const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${excerpt.replace(/"/g, '\\"')}"
publishDate: ${publishDate}
author: "Ränta.nu"
${featuredImageLine}---

${contentMd}`;

      // Write file
      const filename = `${slug}.md`;
      const filepath = path.join(outputDir, filename);
      fs.writeFileSync(filepath, frontmatter);
      processedCount++;
      console.log(`  ✓ Created: ${filename}`);

      // Wait a bit to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.log(`  ✗ Error: ${error.message}`);
    }
  }

  console.log(`\n✓ Successfully converted ${processedCount} articles`);
}

scrapeArticles().catch(console.error);
