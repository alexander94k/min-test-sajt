import fs from 'fs';
import path from 'path';

console.log('=== METADATA VERIFICATION ===\n');

// Check a few content pages
const contentPages = [
  'styrranta',
  'rantekonto',
  'csn-ranta',
  'basta-rantan'
];

console.log('Content Pages Metadata:');
for (const page of contentPages) {
  const filePath = `src/pages/${page}.astro`;
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const titleMatch = content.match(/pageTitle\s*=\s*"([^"]+)"/);
    const descMatch = content.match(/pageDescription\s*=\s*"([^"]+)"/);

    console.log(`\n✓ ${page}.astro`);
    console.log(`  Title: ${titleMatch ? titleMatch[1] : 'MISSING'}`);
    console.log(`  Desc: ${descMatch ? descMatch[1].substring(0, 80) + '...' : 'MISSING'}`);
  }
}

// Check articles
console.log('\n\nArticle Metadata:');
const artiklarDir = 'src/content/artiklar';
const articles = fs.readdirSync(artiklarDir).filter(f => f.endsWith('.md')).slice(0, 3);

for (const article of articles) {
  const content = fs.readFileSync(path.join(artiklarDir, article), 'utf-8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const title = frontmatter.match(/title:\s*"([^"]+)"/);
    const desc = frontmatter.match(/description:\s*"([^"]+)"/);
    const date = frontmatter.match(/publishDate:\s*(\S+)/);
    const image = frontmatter.match(/featuredImage:\s*(\S+)/);

    console.log(`\n✓ ${article}`);
    console.log(`  Title: ${title ? title[1] : 'MISSING'}`);
    console.log(`  Desc: ${desc ? desc[1].substring(0, 60) + '...' : 'MISSING'}`);
    console.log(`  Date: ${date ? date[1] : 'MISSING'}`);
    console.log(`  Image: ${image ? 'YES' : 'NO'}`);
  }
}

// Count totals
const totalPages = fs.readdirSync('src/pages').filter(f => f.endsWith('.astro')).length;
const totalBerakna = fs.readdirSync('src/pages/berakna').filter(f => f.endsWith('.astro')).length;
const totalArtiklar = fs.readdirSync('src/content/artiklar').filter(f => f.endsWith('.md')).length;

console.log('\n\n=== TOTALS ===');
console.log(`Pages (root): ${totalPages}`);
console.log(`Pages (berakna): ${totalBerakna}`);
console.log(`Articles: ${totalArtiklar}`);
console.log(`Total: ${totalPages + totalBerakna + totalArtiklar} pages/articles`);
