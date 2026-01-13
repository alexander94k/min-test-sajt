import fs from 'fs';
import path from 'path';

const pagesToUpdate = [
  'rantekonto', 'lana-pengar-utan-ranta', 'ranta-pa-blancolan', 'csn-ranta',
  'styrranta', 'marginalranta', 'reporanta', 'riksbankens-ranta',
  'rorlig-ranta', 'statslaneranta', 'bunden-fast-ranta', 'drojsmalsranta',
  'forhandla-ranta-pa-bolan', 'lana-pengar-med-lag-ranta', 'inlaningsranta',
  'diskonteringsranta', 'marknadsranta', 'riksgaldens-ranta', 'stibor-ranta',
  'statsobligationer-ranta', 'riskfri-ranta', 'referensranta', 'realranta',
  'ockerranta', 'nominell-ranta', 'rantelagen', 'rantetyper', 'vad-ar-ranta'
];

function updateContentPageTypography() {
  const pagesDir = '/Users/alexander/Desktop/min-test-sajt/src/pages';
  let processedCount = 0;

  for (const slug of pagesToUpdate) {
    try {
      const filePath = path.join(pagesDir, `${slug}.astro`);
      if (!fs.existsSync(filePath)) continue;

      let content = fs.readFileSync(filePath, 'utf-8');

      // Update base content page styles (Desktop - 1200px+)
      content = content.replace(
        /\.content-page h1 \{[^}]+\}/,
        `.content-page h1 {
      font-size: 48px;
      font-weight: 700;
      color: #0c1935;
      line-height: 1.25;
      margin-bottom: 28px;
    }`
      );

      content = content.replace(
        /\.content-page h2 \{[^}]+\}/,
        `.content-page h2 {
      font-size: 36px;
      font-weight: 700;
      color: #1f3a5e;
      margin-top: 64px;
      margin-bottom: 28px;
      line-height: 1.3;
    }`
      );

      content = content.replace(
        /\.content-page h3 \{[^}]+\}/,
        `.content-page h3 {
      font-size: 26px;
      font-weight: 600;
      color: #1f3a5e;
      margin-top: 52px;
      margin-bottom: 24px;
      line-height: 1.3;
    }`
      );

      content = content.replace(
        /\.content-page p \{[^}]+\}/,
        `.content-page p {
      font-size: 18px;
      line-height: 1.8;
      color: #444;
      margin-bottom: 32px;
    }`
      );

      // Update list styling
      content = content.replace(
        /\.content-page ul,\s*\.content-page ol \{[^}]+\}/,
        `.content-page ul,
    .content-page ol {
      font-size: 18px;
      line-height: 1.8;
      color: #444;
      margin-bottom: 32px;
      margin-top: 24px;
      padding-left: 32px;
    }`
      );

      // Find and replace the responsive section with new breakpoints
      const responsiveMatch = content.match(/@media \(max-width: 768px\) \{[\s\S]*?\n    \}\n  \}/);

      if (responsiveMatch) {
        const newResponsive = `/* Tablet (768-1199px) */
    @media (max-width: 1199px) and (min-width: 768px) {
      .content-page h1 {
        font-size: 38px;
      }

      .content-page h2 {
        font-size: 29px;
        margin-top: 52px;
      }

      .content-page h3 {
        font-size: 22px;
        margin-top: 44px;
      }

      .content-page p,
      .content-page ul,
      .content-page ol {
        font-size: 16px;
      }
    }

    /* Mobile (< 768px) */
    @media (max-width: 767px) {
      .content-page {
        text-align: left;
      }

      .content-page h1 {
        font-size: 32px;
        margin-bottom: 20px;
        text-align: left;
      }

      .content-page h2 {
        font-size: 25px;
        margin-top: 48px;
        margin-bottom: 20px;
        text-align: left;
      }

      .content-page h3 {
        font-size: 20px;
        margin-top: 36px;
        margin-bottom: 16px;
        text-align: left;
      }

      .content-page p,
      .content-page ul,
      .content-page ol {
        font-size: 16px;
        margin-bottom: 24px;
        text-align: left;
      }

      .cta-section {
        padding: 40px 24px;
        text-align: center;
      }

      .cta-section h2 {
        font-size: 28px;
        text-align: center;
      }

      .content-page table {
        font-size: 14px;
      }

      .content-page th,
      .content-page td {
        padding: 12px;
      }
    }`;

        content = content.replace(responsiveMatch[0], newResponsive + '\n  }');
      }

      fs.writeFileSync(filePath, content);
      processedCount++;
      console.log(`  ✓ Updated typography: ${slug}.astro`);

    } catch (error) {
      console.log(`  ✗ Error: ${slug} - ${error.message}`);
    }
  }

  console.log(`\n✓ Updated typography on ${processedCount} content pages`);
}

updateContentPageTypography();
