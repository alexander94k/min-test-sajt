/**
 * Script to fix pageTitle and pageDescription references
 * These variables were removed from frontmatter but still referenced in HTML
 */

const fs = require('fs');
const path = require('path');

// SEO data from our config
const seoData = {
  '/csn-ranta': {
    title: 'CSN ränta 2025 - Aktuell studielånsränta',
    description: 'Se aktuell ränta på CSN-lån. Information om hur studielånsräntan sätts och vad du betalar i ränta.'
  },
  '/diskonteringsranta': {
    title: 'Diskonteringsränta - Nuvärdesberäkning',
    description: 'Förstå diskonteringsränta och hur den används för att beräkna nuvärden av framtida kassaflöden.'
  },
  '/drojsmalsranta': {
    title: 'Dröjsmålsränta 2025 - Aktuell nivå & regler',
    description: 'Aktuell dröjsmålsränta och hur den beräknas. Lär dig reglerna för förseningsavgifter vid sena betalningar.'
  },
  '/forhandla-ranta-pa-bolan': {
    title: 'Förhandla bolåneräntan - Så lyckas du',
    description: 'Praktiska tips för att förhandla ner din bolåneränta. Lär dig vad bankerna tittar på och hur du får bästa deal.'
  },
  '/inlaningsranta': {
    title: 'Inlåningsränta - Ränta på insättningar',
    description: 'Allt om inlåningsränta. Jämför räntor på sparkonton och se hur du får bäst avkastning på dina pengar.'
  },
  '/lana-pengar-med-lag-ranta': {
    title: 'Låna pengar med låg ränta - Bästa tipsen',
    description: 'Så hittar du lån med lägst ränta. Jämför privatlån, bolån och kreditkort för att spara tusenlappar.'
  },
  '/lana-pengar-utan-ranta': {
    title: 'Låna pengar utan ränta - Är det möjligt?',
    description: 'Går det att låna pengar helt utan ränta? Vi går igenom räntefria alternativ och vad du bör tänka på.'
  },
  '/marginalranta': {
    title: 'Marginalränta - Bankernas påslag förklarat',
    description: 'Förstå vad marginalränta är och hur bankernas påslag påverkar din totala lånekostnad.'
  },
  '/marknadsranta': {
    title: 'Marknadsränta - Hur den sätts och påverkar dig',
    description: 'Lär dig hur marknadsräntan bildas och varför den är viktig för både låntagare och sparare.'
  },
  '/ockerranta': {
    title: 'Ockerränta - Vad är ocker och gränserna',
    description: 'Förstå vad ockerränta innebär juridiskt. Se gränserna för vad som räknas som ocker i Sverige.'
  },
  '/ranta-pa-blancolan': {
    title: 'Ränta på blancolån 2025 - Jämför privatlån',
    description: 'Aktuella räntor på blancolån och privatlån. Jämför olika långivare och hitta lägsta räntan.'
  },
  '/rantekonto': {
    title: 'Räntekonto - Sparkonto med hög ränta',
    description: 'Hitta bästa räntekontot. Jämför sparkonton med hög ränta och se var du får mest för dina pengar.'
  },
  '/rantelagen': {
    title: 'Räntelagen - Regler för ränteberäkning',
    description: 'Komplett guide till räntelagen i Sverige. Förstå dina rättigheter vid ränteberäkning och dröjsmål.'
  },
  '/rantetyper': {
    title: 'Alla räntetyper förklarade - Komplett översikt',
    description: 'Förstå skillnaden mellan olika räntetyper: rörlig, bunden, nominell, effektiv och mer.'
  },
  '/realranta': {
    title: 'Realränta - Ränta justerad för inflation',
    description: 'Lär dig vad realränta är och hur inflation påverkar din faktiska avkastning.'
  },
  '/referensranta': {
    title: 'Referensränta - Beräkning och användning',
    description: 'Allt om referensräntan i Sverige. Se aktuell nivå, hur den beräknas och när den används.'
  },
  '/reporanta': {
    title: 'Reporänta - Riksbankens styrränta förklarad',
    description: 'Allt om reporäntan och hur Riksbankens beslut påverkar din ekonomi.'
  },
  '/riksbankens-ranta': {
    title: 'Riksbankens ränta 2025 - Aktuellt beslut',
    description: 'Senaste informationen om Riksbankens ränta. Se aktuell nivå, nästa möte och prognoser.'
  },
  '/riksgaldens-ranta': {
    title: 'Riksgäldens ränta - Statens upplåning',
    description: 'Information om Riksgäldens räntor och hur statens upplåning påverkar räntemarknaden.'
  },
  '/riskfri-ranta': {
    title: 'Riskfri ränta - Definition och användning',
    description: 'Vad är den riskfria räntan? Lär dig hur den används i finansiella beräkningar.'
  },
  '/rorlig-ranta': {
    title: 'Rörlig ränta - Fördelar, risker och tips',
    description: 'Allt om rörlig ränta. Lär dig hur den fungerar och när den passar bäst.'
  },
  '/styrranta': {
    title: 'Styrränta - Så påverkar den din ekonomi',
    description: 'Förstå hur Riksbankens styrränta fungerar och varför den är viktig för bolåneräntor och sparande.'
  },
  '/vad-ar-ranta': {
    title: 'Vad är ränta? Komplett guide för nybörjare',
    description: 'Lär dig grunderna om ränta på ett enkelt sätt. Vi förklarar vad ränta är och hur det fungerar.'
  }
};

function fixFile(filePath) {
  const fileName = path.basename(filePath, '.astro');
  const urlPath = '/' + fileName;
  const data = seoData[urlPath];

  if (!data) {
    console.log(`⚠️  No SEO data for: ${fileName}`);
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace {pageTitle.replace(' | Ränta.nu', '')} with actual title
    content = content.replace(
      /\{pageTitle\.replace\([^)]+\)\}/g,
      data.title
    );

    // Replace {pageTitle} with actual title
    content = content.replace(/\{pageTitle\}/g, data.title);

    // Replace {pageDescription} with actual description
    content = content.replace(/\{pageDescription\}/g, data.description);

    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${fileName}`);
  } catch (err) {
    console.error(`❌ Error fixing ${filePath}:`, err.message);
  }
}

const filesToFix = [
  'csn-ranta.astro',
  'diskonteringsranta.astro',
  'drojsmalsranta.astro',
  'forhandla-ranta-pa-bolan.astro',
  'inlaningsranta.astro',
  'lana-pengar-med-lag-ranta.astro',
  'lana-pengar-utan-ranta.astro',
  'marginalranta.astro',
  'marknadsranta.astro',
  'ockerranta.astro',
  'ranta-pa-blancolan.astro',
  'rantekonto.astro',
  'rantelagen.astro',
  'rantetyper.astro',
  'realranta.astro',
  'referensranta.astro',
  'reporanta.astro',
  'riksbankens-ranta.astro',
  'riksgaldens-ranta.astro',
  'riskfri-ranta.astro',
  'rorlig-ranta.astro',
  'styrranta.astro',
  'vad-ar-ranta.astro'
];

const pagesDir = path.join(__dirname, '..', 'src', 'pages');

console.log('🔧 Fixing pageTitle/pageDescription references...\n');

filesToFix.forEach(file => {
  const filePath = path.join(pagesDir, file);
  if (fs.existsSync(filePath)) {
    fixFile(filePath);
  }
});

console.log('\n✨ Done!');
