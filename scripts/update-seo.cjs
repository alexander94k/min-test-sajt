/**
 * Script to update all Astro pages with the BaseHead SEO component
 * Run with: node scripts/update-seo.js
 */

const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'src', 'pages');
const beraknaDir = path.join(pagesDir, 'berakna');
const artiklarDir = path.join(pagesDir, 'artiklar');

// Function to update a single file
function updateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);

    // Skip if already has BaseHead
    if (content.includes('BaseHead')) {
      console.log(`✅ Already updated: ${fileName}`);
      return;
    }

    // Skip dynamic routes
    if (fileName.includes('[')) {
      console.log(`⏭️ Skipping dynamic route: ${fileName}`);
      return;
    }

    // Determine import path based on directory depth
    let importPath = '../components/BaseHead.astro';
    if (filePath.includes('/berakna/') || filePath.includes('/artiklar/')) {
      importPath = '../../components/BaseHead.astro';
    }

    // Pattern 1: Files with pageTitle and pageDescription in frontmatter
    const pattern1 = /^---\n([\s\S]*?)(const pageTitle[\s\S]*?const pageDescription[\s\S]*?)---\n\n<!DOCTYPE html>\n<html lang="sv">\n<head>\n\s*<meta charset="UTF-8">\n\s*<meta name="viewport"[^>]*>\n\s*<title>\{pageTitle\}<\/title>\n\s*<meta name="description" content=\{pageDescription\}>\n\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com\/">\n\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com\/"[^>]*>\n\s*<link href="https:\/\/fonts\.googleapis\.com\/css2[^"]*" rel="stylesheet">/;

    // Pattern 2: Files without pageTitle/pageDescription variables
    const pattern2 = /^---\n([\s\S]*?)---\n\n<!DOCTYPE html>\n<html lang="sv">\n<head>\n\s*<meta charset="UTF-8">\n\s*<meta name="viewport"[^>]*>\n\s*<title>[^<]+<\/title>\n\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com\/">\n\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com\/"[^>]*>\n\s*<link href="https:\/\/fonts\.googleapis\.com\/css2[^"]*" rel="stylesheet">/;

    // Try simpler replacement approach
    // Add BaseHead import after Footer import
    if (!content.includes("import BaseHead")) {
      content = content.replace(
        /(import Footer from ['"][^'"]+['"];?)/,
        `$1\nimport BaseHead from '${importPath}';`
      );
    }

    // Replace the head section with BaseHead
    // Pattern for files with pageTitle/pageDescription
    content = content.replace(
      /<head>\n\s*<meta charset="UTF-8">\n\s*<meta name="viewport"[^>]*>\n\s*<title>\{pageTitle\}<\/title>\n\s*<meta name="description" content=\{pageDescription\}>\n\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com\/">\n\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com\/"[^>]*>\n\s*<link href="https:\/\/fonts\.googleapis\.com\/css2[^"]*" rel="stylesheet">/,
      '<head>\n    <BaseHead />'
    );

    // Pattern for files with hardcoded title
    content = content.replace(
      /<head>\n\s*<meta charset="UTF-8">\n\s*<meta name="viewport"[^>]*>\n\s*<title>[^{][^<]*<\/title>\n\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com\/">\n\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com\/"[^>]*>\n\s*<link href="https:\/\/fonts\.googleapis\.com\/css2[^"]*" rel="stylesheet">/,
      '<head>\n    <BaseHead />'
    );

    // Remove now-unused pageTitle and pageDescription constants if BaseHead was added
    if (content.includes('<BaseHead />')) {
      content = content.replace(/\nconst pageTitle = "[^"]*";\nconst pageDescription = "[^"]*";\n/g, '\n');
      content = content.replace(/\nconst pageTitle = "[^"]*";\nconst pageDescription = "[^"]*";/g, '');
    }

    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated: ${fileName}`);
  } catch (err) {
    console.error(`❌ Error updating ${filePath}:`, err.message);
  }
}

// Process all .astro files in a directory
function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory doesn't exist: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    if (file.endsWith('.astro')) {
      const filePath = path.join(dir, file);
      updateFile(filePath);
    }
  });
}

console.log('🚀 Starting SEO update...\n');
console.log('📁 Processing main pages...');
processDirectory(pagesDir);

console.log('\n📁 Processing /berakna pages...');
processDirectory(beraknaDir);

console.log('\n📁 Processing /artiklar pages...');
processDirectory(artiklarDir);

console.log('\n✨ Done!');
