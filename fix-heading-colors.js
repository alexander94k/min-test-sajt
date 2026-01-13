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

function fixHeadingColors() {
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

      // Add CSS for white headings on dark backgrounds
      const cssAddition = `
    /* White headings on dark backgrounds */
    .dark-bg h2,
    .dark-bg h3,
    .section-title-white {
      color: white !important;
    }

    .dark-bg p {
      color: rgba(255, 255, 255, 0.9);
    }
`;

      // Insert the new CSS before the closing style tag
      content = content.replace(
        /(@media \(max-width: 768px\) \{[\s\S]*?\}[\s\S]*?\}[\s\S]*?)<\/style>/,
        `$1${cssAddition}  </style>`
      );

      // Fix any h2/h3 elements inside gradient or blue backgrounds
      // Find sections with blue/gradient backgrounds and add dark-bg class
      content = content.replace(
        /(<div[^>]*style="[^"]*background:\s*(?:linear-gradient\([^)]*#1e3a5f|#1e3a5f)[^"]*"[^>]*>)/gi,
        (match) => {
          if (match.includes('class="')) {
            return match.replace(/class="([^"]*)"/, 'class="$1 dark-bg"');
          } else {
            return match.replace(/<div/, '<div class="dark-bg"');
          }
        }
      );

      // Also fix any .section-inner with gradient backgrounds
      content = content.replace(
        /<div class="section-inner">\s*<div style="[^"]*background:\s*linear-gradient\([^)]*#1e3a5f[^"]*"[^>]*>/gi,
        (match) => {
          if (!match.includes('dark-bg')) {
            return match.replace(/<div style="/, '<div class="dark-bg" style="');
          }
          return match;
        }
      );

      fs.writeFileSync(filePath, content);
      processedCount++;
      console.log(`  ✓ Fixed: ${slug}.astro`);

    } catch (error) {
      console.log(`  ✗ Error fixing ${slug}: ${error.message}`);
    }
  }

  console.log(`\n✓ Successfully fixed ${processedCount} pages`);
}

fixHeadingColors();
