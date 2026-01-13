import fs from 'fs';
import path from 'path';

// Pages to fix
const pagesToFix = [
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

function removeBreadcrumbs() {
  const pagesDir = '/Users/alexander/Desktop/min-test-sajt/src/pages';
  let processedCount = 0;

  for (const slug of pagesToFix) {
    try {
      const filePath = path.join(pagesDir, `${slug}.astro`);

      if (!fs.existsSync(filePath)) {
        console.log(`  ⚠ File not found: ${slug}.astro`);
        continue;
      }

      let content = fs.readFileSync(filePath, 'utf-8');

      // Remove breadcrumb section (everything between <!-- Breadcrumb --> and the next <!-- or <section)
      content = content.replace(
        /<!-- Breadcrumb -->[\s\S]*?(?=<!-- Hero Section -->|<section)/,
        ''
      );

      fs.writeFileSync(filePath, content);
      processedCount++;
      console.log(`  ✓ Removed breadcrumbs: ${slug}.astro`);

    } catch (error) {
      console.log(`  ✗ Error fixing ${slug}: ${error.message}`);
    }
  }

  console.log(`\n✓ Successfully removed breadcrumbs from ${processedCount} pages`);
}

removeBreadcrumbs();
