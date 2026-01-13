import fs from 'fs';
import path from 'path';

// Pages to rebuild with new design
const pagesToRebuild = [
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

// Generate modern content page template
function generateContentPage(slug, title, description, existingContent) {
  return `---
import '../styles/global.css';
import Footer from '../components/Footer.astro';

const pageTitle = "${title}";
const pageDescription = "${description}";
---

<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription}>
  <link rel="preconnect" href="https://fonts.googleapis.com/">
  <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700&display=swap" rel="stylesheet">
  <style is:global>
    /* Reset default margins */
    .content-page * {
      box-sizing: border-box;
    }

    .content-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      font-family: 'Inter', sans-serif;
    }

    /* Content styling with proper spacing */
    .content-page h1 {
      font-size: 44px;
      font-weight: 700;
      color: #0c1935;
      line-height: 1.25;
      margin-bottom: 28px;
    }

    .content-page h2 {
      font-size: 32px;
      font-weight: 700;
      color: #1f3a5e;
      margin-top: 64px;
      margin-bottom: 28px;
      line-height: 1.3;
    }

    .content-page h2:first-of-type {
      margin-top: 48px;
    }

    .content-page h3 {
      font-size: 24px;
      font-weight: 600;
      color: #1f3a5e;
      margin-top: 52px;
      margin-bottom: 24px;
      line-height: 1.3;
    }

    .content-page p {
      font-size: 17px;
      line-height: 1.8;
      color: #444;
      margin-bottom: 32px;
    }

    .content-page ul,
    .content-page ol {
      font-size: 17px;
      line-height: 1.8;
      color: #444;
      margin-bottom: 32px;
      margin-top: 24px;
      padding-left: 32px;
    }

    .content-page li {
      margin-bottom: 16px;
    }

    .content-page a {
      color: #1e3a5f;
      text-decoration: underline;
      transition: color 0.2s;
    }

    .content-page a:hover {
      color: #2d5a8f;
    }

    .content-page table {
      width: 100%;
      border-collapse: collapse;
      margin: 40px 0;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .content-page thead {
      background: #f8f9fa;
      border-bottom: 2px solid #e5e5e5;
    }

    .content-page th {
      padding: 16px;
      text-align: left;
      font-weight: 600;
      color: #1e3a5f;
    }

    .content-page td {
      padding: 20px;
      border-bottom: 1px solid #f0f0f0;
      color: #555;
    }

    .content-page tbody tr:last-child td {
      border-bottom: none;
    }

    /* Info boxes */
    .info-box {
      background: #f0f5f7;
      border-left: 4px solid #1e3a5f;
      padding: 28px 32px;
      margin: 48px 0;
      border-radius: 8px;
    }

    .info-box h3 {
      margin-top: 0;
      color: #1e3a5f;
    }

    /* CTA Section */
    .cta-section {
      background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8f 100%);
      padding: 60px 40px;
      border-radius: 16px;
      text-align: center;
      margin: 80px 0;
      color: white;
    }

    .cta-section h2 {
      color: white;
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 36px;
    }

    .cta-section p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 18px;
      margin-bottom: 32px;
    }

    .btn-cta {
      display: inline-block;
      background: white;
      color: #1e3a5f;
      padding: 16px 40px;
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

    /* Responsive */
    @media (max-width: 768px) {
      .content-page h1 {
        font-size: 32px;
        margin-bottom: 20px;
      }

      .content-page h2 {
        font-size: 26px;
        margin-top: 48px;
        margin-bottom: 24px;
      }

      .content-page h3 {
        font-size: 20px;
        margin-top: 40px;
        margin-bottom: 20px;
      }

      .content-page p,
      .content-page ul,
      .content-page ol {
        font-size: 16px;
        margin-bottom: 28px;
      }

      .cta-section {
        padding: 40px 24px;
      }

      .cta-section h2 {
        font-size: 28px;
      }

      .content-page table {
        font-size: 14px;
      }

      .content-page th,
      .content-page td {
        padding: 12px;
      }
    }
  </style>
</head>
<body>
<header class="header">
  <div class="header-inner">
    <a href="/" class="logo">
      <div class="logo-icon">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <rect width="512" height="512" rx="110" fill="#1e3a5f"></rect>
          <circle cx="200" cy="180" r="45" fill="#FFFFFF"></circle>
          <circle cx="312" cy="332" r="45" fill="#FFFFFF"></circle>
          <rect x="225" y="195" width="70" height="120" rx="8" transform="rotate(35 260 255)" fill="#FFFFFF"></rect>
        </svg>
      </div>
      <span class="logo-text">Ränta.nu</span>
    </a>

    <nav class="header-nav">
      <a href="/">Hem</a>
      <a href="/basta-rantan">Bästa räntan</a>
      <a href="/berakna">Beräkna ränta</a>
      <a href="/artiklar">Artiklar</a>
      <a href="/kontakt">Kontakt</a>
    </nav>

    <a href="/kalkylatorer" class="btn-login">Kalkylatorer</a>
  </div>
</header>

<!-- Breadcrumb -->
<div style="background: #f8f9fa; padding: 16px 0; border-bottom: 1px solid #e5e5e5;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 24px;">
    <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: #666;">
      <a href="/" style="color: #666; text-decoration: none;">Hem</a>
      <span>/</span>
      <span style="color: #1e3a5f; font-weight: 500;">${title}</span>
    </div>
  </div>
</div>

<!-- Hero Section -->
<section style="padding: 80px 0 40px; background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);">
  <div style="max-width: 1200px; margin: 0 auto; padding: 0 24px;">
    <div style="display: inline-block; background: #1e3a5f; color: white; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; margin-bottom: 28px; letter-spacing: 0.5px;">
      Guide
    </div>
    <h1 style="font-size: 48px; font-weight: 700; color: #0c1935; line-height: 1.2; margin-bottom: 24px; max-width: 900px;">
      {pageTitle.replace(' | Ränta.nu', '')}
    </h1>
    <p style="font-size: 20px; color: #555; line-height: 1.6; max-width: 800px;">
      {pageDescription}
    </p>
  </div>
</section>

<!-- Main Content -->
<article class="content-page" style="padding: 60px 24px 80px;">
${existingContent}
</article>

<!-- CTA Section -->
<div style="max-width: 1200px; margin: 0 auto; padding: 0 24px;">
  <div class="cta-section">
    <h2>Redo att hitta den bästa räntan?</h2>
    <p>Jämför räntor från över 50 svenska banker och hitta det bästa sparalternativet för dig.</p>
    <a href="/basta-rantan" class="btn-cta">Jämför räntor nu</a>
  </div>
</div>

<!-- Footer -->
<Footer />

</body>
</html>
`;
}

// Extract content from existing page
function extractContent(fileContent) {
  // Try to find the main content between hero and footer
  let content = '';

  // Find sections between header and footer
  const bodyMatch = fileContent.match(/<body>([\s\S]*)<\/body>/);
  if (!bodyMatch) return '';

  const bodyContent = bodyMatch[1];

  // Remove header
  let cleaned = bodyContent.replace(/<header[\s\S]*?<\/header>/i, '');

  // Remove footer
  cleaned = cleaned.replace(/<Footer[\s\S]*?\/>/i, '');
  cleaned = cleaned.replace(/<footer[\s\S]*?<\/footer>/i, '');

  // Find the main content sections
  const sections = cleaned.match(/<section[\s\S]*?<\/section>/gi) || [];

  if (sections.length > 0) {
    // Take sections after hero (usually index 1 onwards)
    content = sections.slice(1).join('\n\n');
  }

  return content.trim();
}

async function rebuildPages() {
  const pagesDir = '/Users/alexander/Desktop/min-test-sajt/src/pages';
  let processedCount = 0;
  let skippedCount = 0;

  for (const slug of pagesToRebuild) {
    try {
      const filePath = path.join(pagesDir, `${slug}.astro`);

      if (!fs.existsSync(filePath)) {
        console.log(`  ⚠ File not found: ${slug}.astro`);
        skippedCount++;
        continue;
      }

      // Read existing file
      const existingContent = fs.readFileSync(filePath, 'utf-8');

      // Extract page title and description from frontmatter
      const titleMatch = existingContent.match(/pageTitle\s*=\s*["']([^"']+)["']/);
      const descMatch = existingContent.match(/pageDescription\s*=\s*["']([^"']+)["']/);

      const title = titleMatch ? titleMatch[1] : `${slug} | Ränta.nu`;
      const description = descMatch ? descMatch[1] : '';

      // Extract main content sections
      const contentSections = extractContent(existingContent);

      if (!contentSections) {
        console.log(`  ⚠ No content found in: ${slug}.astro`);
        skippedCount++;
        continue;
      }

      // Generate new page with preserved content
      const newContent = generateContentPage(slug, title, description, contentSections);

      // Write new file
      fs.writeFileSync(filePath, newContent);
      processedCount++;
      console.log(`  ✓ Rebuilt: ${slug}.astro`);

    } catch (error) {
      console.log(`  ✗ Error rebuilding ${slug}: ${error.message}`);
      skippedCount++;
    }
  }

  console.log(`\n✓ Successfully rebuilt ${processedCount} pages`);
  console.log(`⚠ Skipped ${skippedCount} pages`);
}

rebuildPages().catch(console.error);
