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
      .cta-section p,
      div[style*="text-align: center"],
      .section-inner > div,
      .section-inner h2,
      .section-inner p,
      .dark-bg > div,
      .dark-bg h2,
      .dark-bg p,
      .section-title-white {
        text-align: left !important;
      }

      /* Section padding reduced to 40px on mobile */
      section {
        padding: 40px 0 !important;
      }

      /* Feature icons - keep SVG centered but text left */
      .feature-icon {
        text-align: center !important;
        display: flex;
        justify-content: flex-start;
      }

      .feature-icon svg {
        margin: 0 !important;
      }

      /* Other SVG icons left aligned */
      .section-inner > div:not(.feature-icon):not(.features-grid) svg,
      .dark-bg > div:not(.feature-icon) svg {
        margin-left: 0 !important;
        margin-right: auto !important;
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
      } else {
        // Update existing mobile CSS with new selectors
        content = content.replace(
          /\/\* Mobile - Force ALL text left aligned \*\/[\s\S]*?@media \(max-width: 767px\) \{[\s\S]*?\n    \}/,
          mobileLeftAlignCSS.trim()
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
