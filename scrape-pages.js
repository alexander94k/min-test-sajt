import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

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

// Convert HTML to clean text with paragraphs
function htmlToText(html) {
  let text = html;

  // Clean WordPress blocks
  text = cleanWordPressBlocks(text);

  // Headers to text with line breaks
  text = text.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n\n$1\n\n');
  text = text.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n\n$1\n\n');
  text = text.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n\n$1\n\n');

  // Paragraphs
  text = text.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');

  // Lists
  text = text.replace(/<ul[^>]*>/gi, '\n');
  text = text.replace(/<\/ul>/gi, '\n');
  text = text.replace(/<ol[^>]*>/gi, '\n');
  text = text.replace(/<\/ol>/gi, '\n');
  text = text.replace(/<li[^>]*>(.*?)<\/li>/gi, '• $1\n');

  // Remove images
  text = text.replace(/<img[^>]+>/gi, '');

  // Bold and Italic
  text = text.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '$1');
  text = text.replace(/<b[^>]*>(.*?)<\/b>/gi, '$1');
  text = text.replace(/<em[^>]*>(.*?)<\/em>/gi, '$1');
  text = text.replace(/<i[^>]*>(.*?)<\/i>/gi, '$1');

  // Links - keep text only
  text = text.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '$2');

  // Remove remaining HTML tags
  text = text.replace(/<[^>]+>/g, '');

  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#8217;/g, "'");
  text = text.replace(/&#8220;/g, '"');
  text = text.replace(/&#8221;/g, '"');
  text = text.replace(/&#8211;/g, '–');
  text = text.replace(/&#8212;/g, '—');

  // Clean up multiple newlines and spaces
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.replace(/[ \t]+/g, ' ');
  text = text.trim();

  return text;
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

// Pages to scrape (from sitemap)
const pagesToScrape = [
  'rantekonto',
  'lana-pengar-utan-ranta',
  'ranta-pa-blancolan',
  'csn-ranta',
  'styrranta',
  'marginalranta',
  'reporanta',
  'riksbankens-ranta',
  'rorlig-ranta',
  'statslaneranta',
  'bunden-fast-ranta',
  'drojsmalsranta',
  'forhandla-ranta-pa-bolan',
  'lana-pengar-med-lag-ranta',
  'inlaningsranta',
  'diskonteringsranta',
  'marknadsranta',
  'riksgaldens-ranta',
  'stibor-ranta',
  'statsobligationer-ranta',
  'riskfri-ranta',
  'referensranta',
  'realranta',
  'ockerranta',
  'nominell-ranta',
  'rantelagen',
  'rantetyper',
  'vad-ar-ranta'
];

async function scrapePages() {
  const outputDir = '/Users/alexander/Desktop/min-test-sajt/scraped-content';

  // Create directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let processedCount = 0;

  for (const slug of pagesToScrape) {
    try {
      // Try WordPress REST API
      const apiUrl = `https://xn--rnta-loa.nu/wp-json/wp/v2/pages?slug=${slug}`;
      console.log(`\nFetching: ${slug}`);

      const pages = await fetchJSON(apiUrl);

      if (!pages || pages.length === 0) {
        console.log(`  ✗ No page found for ${slug}`);
        continue;
      }

      const page = pages[0];
      const title = page.title.rendered.replace(/<[^>]+>/g, '').trim();
      const contentHtml = page.content.rendered;
      const excerpt = page.excerpt.rendered.replace(/<[^>]+>/g, '').trim();

      // Convert to plain text
      const contentText = htmlToText(contentHtml);

      // Create JSON file with content
      const data = {
        slug,
        title,
        excerpt: excerpt.substring(0, 160),
        content: contentText
      };

      const filename = `${slug}.json`;
      const filepath = path.join(outputDir, filename);
      fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
      processedCount++;
      console.log(`  ✓ Scraped: ${filename}`);

      // Wait a bit to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.log(`  ✗ Error: ${error.message}`);
    }
  }

  console.log(`\n✓ Successfully scraped ${processedCount} pages`);
}

scrapePages().catch(console.error);
