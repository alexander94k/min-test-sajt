import fs from 'fs';
import path from 'path';

// All content pages to fix
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

function removeCenterAlignmentInline() {
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
      let changes = 0;

      // Remove text-align: center from inline styles
      const beforeRemove = content;
      content = content.replace(/style="([^"]*)text-align:\s*center;?([^"]*)"/gi, (match, before, after) => {
        changes++;
        const cleanedBefore = before.trim();
        const cleanedAfter = after.trim();
        const combined = [cleanedBefore, cleanedAfter].filter(s => s).join(' ');
        return combined ? `style="${combined}"` : '';
      });

      // Also remove standalone text-align: center with semicolon at the end
      content = content.replace(/style="text-align:\s*center;?"/gi, () => {
        changes++;
        return '';
      });

      if (changes > 0) {
        fs.writeFileSync(filePath, content);
        processedCount++;
        console.log(`  ✓ Removed ${changes} center alignment inline styles from: ${slug}.astro`);
      } else {
        console.log(`  - No inline center styles found in: ${slug}.astro`);
      }

    } catch (error) {
      console.log(`  ✗ Error fixing ${slug}: ${error.message}`);
    }
  }

  console.log(`\n✓ Successfully processed ${processedCount} pages`);
}

removeCenterAlignmentInline();
