import fs from 'fs';
import path from 'path';

const sitemapPath = '/Users/alexander/Desktop/min-test-sajt/sitemap.csv';
const pagesDir = '/Users/alexander/Desktop/min-test-sajt/src/pages';
const artiklarDir = '/Users/alexander/Desktop/min-test-sajt/src/content/artiklar';

// Read sitemap
const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
const urls = sitemapContent.split('\n').filter(line => line.trim() && line.includes('xn--rnta-loa.nu'));

console.log('=== SITEMAP VERIFICATION ===\n');
console.log(`Total URLs in sitemap: ${urls.length}\n`);

let foundCount = 0;
let missingCount = 0;
const missing = [];

for (const url of urls) {
  const cleanUrl = url.trim();
  let slug = cleanUrl.replace('https://xn--rnta-loa.nu/', '').replace(/\/$/, '');
  
  // Decode URL encoded characters
  slug = decodeURIComponent(slug);
  
  // Skip special files
  if (slug.includes('.kml') || slug === '') {
    continue;
  }
  
  let found = false;
  
  // Check if it's an article
  if (slug.startsWith('artiklar/') || 
      slug.includes('effektiv-ranta-lanekostnad') ||
      slug.includes('riksbanken-forsvinner') ||
      slug.includes('ranta-kreditlan') ||
      slug.includes('krypto-staking') ||
      slug.includes('ranta-kreditkort') ||
      slug.includes('kontokredit-ranta') ||
      slug.includes('hitta-lagsta') ||
      slug.includes('basta-billan') ||
      slug.includes('nyckelfardigt') ||
      slug.includes('klarna-ranta') ||
      slug.includes('lag-ranta-ger') ||
      slug.includes('tips-nar')) {
    
    // Check in artiklar directory
    const artikelFiles = fs.readdirSync(artiklarDir);
    for (const file of artikelFiles) {
      if (file.endsWith('.md')) {
        const content = fs.readFileSync(path.join(artiklarDir, file), 'utf-8');
        if (content) {
          found = true;
          break;
        }
      }
    }
    
    if (found) {
      console.log(`✓ Article: ${slug}`);
      foundCount++;
    } else {
      console.log(`✗ MISSING Article: ${slug}`);
      missing.push(slug);
      missingCount++;
    }
  } else {
    // Check as page
    const possiblePaths = [
      path.join(pagesDir, `${slug}.astro`),
      path.join(pagesDir, slug, 'index.astro'),
      path.join(pagesDir, `${slug.replace(/\//g, '-')}.astro`)
    ];
    
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        found = true;
        break;
      }
    }
    
    if (found) {
      console.log(`✓ Page: ${slug}`);
      foundCount++;
    } else {
      console.log(`✗ MISSING Page: ${slug}`);
      missing.push(slug);
      missingCount++;
    }
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`✓ Found: ${foundCount}`);
console.log(`✗ Missing: ${missingCount}`);

if (missing.length > 0) {
  console.log(`\nMissing pages:`);
  missing.forEach(m => console.log(`  - ${m}`));
}
