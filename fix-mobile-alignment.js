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

function fixMobileAlignment() {
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

      // Add comprehensive mobile left-alignment styles before closing </style> tag
      const mobileLeftAlignCSS = `
    /* Mobile - Force ALL text left aligned */
    @media (max-width: 767px) {
      section h1,
      section p,
      .cta-section,
      .cta-section h2,
      .cta-section p {
        text-align: left !important;
      }
    }
`;

      // Check if this CSS is already present
      if (!content.includes('/* Mobile - Force ALL text left aligned */')) {
        // Insert before the closing </style> tag
        content = content.replace(
          /(\.dark-bg p \{[\s\S]*?\}[\s\S]*?)<\/style>/,
          `$1${mobileLeftAlignCSS}  </style>`
        );
      }

      fs.writeFileSync(filePath, content);
      processedCount++;
      console.log(`  ✓ Fixed mobile alignment: ${slug}.astro`);

    } catch (error) {
      console.log(`  ✗ Error fixing ${slug}: ${error.message}`);
    }
  }

  console.log(`\n✓ Successfully fixed mobile alignment for ${processedCount} pages`);
}

fixMobileAlignment();
