import fs from 'fs';
import path from 'path';

// Pages that need the responsive layout applied
const pagesToUpdate = [
  'index.astro',
  'basta-rantan.astro',
  'basta-sparrantan.astro',
  'kontakt.astro',
  'artiklar.astro',
  'artiklar/[...slug].astro',
  'berakna/index.astro',
  'berakna/bolaneranta.astro',
  'berakna/effektiv-ranta.astro',
  'berakna/leva-pa-ranta.astro',
  'berakna/ranta-pa-ranta.astro',
  'berakna/ranteavdrag.astro',
  'berakna/skatt-pa-ranta.astro',
  'billan-kalkylator.astro',
  'cookiepolicy.astro',
  'integritetspolicy.astro',
  '[...slug].astro'
];

// The approved CSS from om-oss.astro
const approvedCSS = `    /* ========================================
       BASE STYLES & CONTAINER STRUCTURE
       ======================================== */

    body {
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
    }

    /* Main container - max 1200px, centrerad */
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 100px;
    }

    /* Text content container - max 720px för läsbarhet */
    .text-container {
      max-width: 720px;
      margin: 0 auto;
    }

    /* ========================================
       TYPOGRAPHY - DESKTOP (>768px)
       ======================================== */

    h1 {
      font-size: 48px;
      font-weight: 700;
      color: #0c1935;
      line-height: 1.2;
      margin: 0 0 24px 0;
      text-align: center;
    }

    h2 {
      font-size: 32px;
      font-weight: 700;
      color: #1f3a5e;
      line-height: 1.3;
      margin: 0 0 24px 0;
      text-align: center;
    }

    h3 {
      font-size: 24px;
      font-weight: 600;
      color: #1f3a5e;
      line-height: 1.3;
      margin: 0 0 16px 0;
    }

    p {
      font-size: 16px;
      line-height: 1.5;
      color: #444;
      margin: 0 0 20px 0;
    }

    /* ========================================
       SECTIONS - DESKTOP
       ======================================== */

    section {
      padding: 80px 0;
    }

    /* Card/Box styling */
    .card {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .info-box {
      background: #f0f5f7;
      border-left: 4px solid #1e3a5f;
      padding: 32px;
      border-radius: 8px;
    }

    /* Dark background boxes */
    .dark-box {
      background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
      border-radius: 20px;
      padding: 60px 40px;
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
    }

    .dark-box h2 {
      color: white;
      margin-bottom: 16px;
    }

    .dark-box p {
      color: rgba(255,255,255,0.9);
    }

    .dark-box .big-number {
      font-size: 64px;
      font-weight: 700;
      color: white;
      margin-bottom: 16px;
    }

    /* Features grid - 2 kolumner x 2 rader */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 40px;
      margin-top: 48px;
    }

    .feature-item {
      text-align: center;
    }

    .feature-icon {
      width: 56px;
      height: 56px;
      margin: 0 auto 20px;
      color: #1e3a5f;
    }

    .feature-icon svg {
      width: 100%;
      height: 100%;
    }

    /* CTA Section */
    .cta-section {
      background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8f 100%);
      padding: 60px 40px;
      border-radius: 16px;
      text-align: center;
      color: white;
    }

    .cta-section h2 {
      color: white;
      margin-bottom: 20px;
    }

    .cta-section p {
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 32px;
    }

    .btn-cta {
      display: inline-block;
      background: white;
      color: #1e3a5f;
      padding: 16px 40px;
      min-height: 44px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 17px;
      text-decoration: none;
      transition: all 0.3s;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .btn-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.2);
    }

    /* ========================================
       MOBILE STYLES (<768px)
       ======================================== */

    @media (max-width: 768px) {
      /* Container padding */
      .page-container {
        padding: 0 16px;
      }

      /* Section padding */
      section {
        padding: 48px 0;
      }

      /* Typography - mobile */
      h1 {
        font-size: 32px;
        text-align: left;
      }

      h2 {
        font-size: 24px;
        text-align: left;
      }

      h3 {
        font-size: 20px;
        text-align: left;
      }

      p {
        font-size: 16px;
        text-align: left;
      }

      /* Cards and boxes - mobile */
      .card {
        padding: 20px;
      }

      .info-box {
        padding: 20px;
      }

      .dark-box {
        padding: 32px 20px;
        text-align: left;
      }

      .dark-box h2 {
        text-align: left;
      }

      .dark-box p {
        text-align: left;
      }

      .dark-box .big-number {
        font-size: 48px;
        text-align: left;
      }

      /* Features - mobile */
      .features-grid {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .feature-item {
        text-align: left;
      }

      .feature-icon {
        margin: 0 0 16px 0;
      }

      /* CTA - mobile */
      .cta-section {
        padding: 40px 20px;
      }

      .btn-cta {
        width: 100%;
        min-height: 44px;
        display: block;
        text-align: center;
      }
    }

    /* ========================================
       UTILITY CLASSES
       ======================================== */

    .text-center {
      text-align: center;
    }

    .mt-48 {
      margin-top: 48px;
    }

    .mb-48 {
      margin-bottom: 48px;
    }

    .gray-bg {
      background: #f8f9fa;
    }`;

function applyResponsiveLayoutToPage(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Check if page already has <style is:global>
  if (content.includes('<style is:global>')) {
    console.log(`  ⚠ ${path.basename(filePath)} already has <style is:global>, replacing...`);

    // Replace existing style block
    const styleRegex = /<style is:global>[\s\S]*?<\/style>/;
    if (styleRegex.test(content)) {
      const newStyleSection = `<style is:global>\n${approvedCSS}\n  </style>`;
      content = content.replace(styleRegex, newStyleSection);
      fs.writeFileSync(filePath, content);
      return 'updated';
    }
  } else {
    // Add new style block before </head>
    const headEndRegex = /(\s*)<\/head>/;
    if (headEndRegex.test(content)) {
      const newStyleSection = `  <style is:global>\n${approvedCSS}\n  </style>\n</head>`;
      content = content.replace(headEndRegex, newStyleSection);
      fs.writeFileSync(filePath, content);
      return 'added';
    } else {
      return 'no-head';
    }
  }
  return 'failed';
}

function applyToAllPages() {
  const pagesDir = '/Users/alexander/Desktop/min-test-sajt/src/pages';
  let updated = 0;
  let added = 0;
  let errors = [];

  console.log('\n🚀 Applying responsive layout to all remaining pages...\n');

  for (const pageFile of pagesToUpdate) {
    try {
      const filePath = path.join(pagesDir, pageFile);

      if (!fs.existsSync(filePath)) {
        console.log(`  ⚠ File not found: ${pageFile}`);
        errors.push(`${pageFile}: File not found`);
        continue;
      }

      const result = applyResponsiveLayoutToPage(filePath);

      if (result === 'updated') {
        updated++;
        console.log(`  ✓ Updated CSS in: ${pageFile}`);
      } else if (result === 'added') {
        added++;
        console.log(`  ✓ Added CSS to: ${pageFile}`);
      } else if (result === 'no-head') {
        errors.push(`${pageFile}: No </head> tag found`);
        console.log(`  ✗ No </head> tag found in: ${pageFile}`);
      } else {
        errors.push(`${pageFile}: Failed to process`);
        console.log(`  ✗ Failed to process: ${pageFile}`);
      }

    } catch (error) {
      console.log(`  ✗ Error processing ${pageFile}: ${error.message}`);
      errors.push(`${pageFile}: ${error.message}`);
    }
  }

  console.log(`\n✅ Successfully processed ${updated + added} of ${pagesToUpdate.length} pages`);
  console.log(`   • Updated existing CSS: ${updated}`);
  console.log(`   • Added new CSS: ${added}`);

  if (errors.length > 0) {
    console.log(`\n⚠️  Encountered ${errors.length} errors:`);
    errors.forEach(err => console.log(`   - ${err}`));
  }

  console.log('\n📝 Summary:');
  console.log(`   • Total pages: ${pagesToUpdate.length}`);
  console.log(`   • Successfully processed: ${updated + added}`);
  console.log(`   • Errors: ${errors.length}`);
}

applyToAllPages();
