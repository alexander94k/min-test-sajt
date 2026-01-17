/**
 * SEO Configuration for Ränta.nu
 * All meta titles and descriptions for every page
 */

export interface SEOData {
  title: string;
  description: string;
  type: 'website' | 'article' | 'webapp' | 'faq' | 'howto' | 'about' | 'contact';
  faqItems?: Array<{ question: string; answer: string }>;
  howToSteps?: Array<{ name: string; text: string }>;
}

export const seoConfig: Record<string, SEOData> = {
  // ============================================
  // STARTSIDA
  // ============================================
  '/': {
    title: 'Ränta.nu - Jämför sparräntor från 50+ banker',
    description: 'Hitta bästa sparräntan! Jämför sparkonton från över 50 banker i Sverige. Uppdaterade räntor dagligen. Helt gratis och opartisk jämförelse.',
    type: 'website',
  },

  // ============================================
  // HUVUDSIDOR
  // ============================================
  '/vad-ar-ranta': {
    title: 'Vad är ränta? Komplett guide för nybörjare',
    description: 'Lär dig grunderna om ränta på ett enkelt sätt. Vi förklarar vad ränta är, hur det fungerar och varför det påverkar ditt sparande och lån.',
    type: 'article',
  },
  '/rantetyper': {
    title: 'Alla räntetyper förklarade - Komplett översikt',
    description: 'Förstå skillnaden mellan olika räntetyper: rörlig, bunden, nominell, effektiv och mer. Enkel guide med tydliga förklaringar.',
    type: 'article',
  },
  '/basta-rantan': {
    title: 'Bästa räntan 2025 - Jämför alla banker',
    description: 'Hitta bästa räntan för sparande och lån. Vi jämför räntor från Sveriges alla banker så du kan göra det smartaste valet.',
    type: 'faq',
    faqItems: [
      { question: 'Vilken bank har bäst ränta?', answer: 'Det varierar beroende på typ av konto. Jämför aktuella räntor på vår sida för att se vilken bank som erbjuder bäst villkor just nu.' },
      { question: 'Hur ofta uppdateras räntorna?', answer: 'Vi uppdaterar räntorna dagligen för att säkerställa att du alltid ser aktuell information.' },
    ],
  },
  '/basta-sparrantan': {
    title: 'Bästa sparräntan 2025 - Topp 10 sparkonton',
    description: 'Jämför de bästa sparräntorna just nu. Se vilka banker som erbjuder högst ränta på sparkonto och hur du maximerar ditt sparande.',
    type: 'faq',
    faqItems: [
      { question: 'Vilket sparkonto har högst ränta?', answer: 'De bästa sparräntorna hittar du ofta hos nischbanker. Se vår uppdaterade lista för aktuella toppräntor.' },
      { question: 'Är pengarna säkra hos alla banker?', answer: 'Ja, alla banker i vår jämförelse omfattas av den statliga insättningsgarantin på upp till 1 050 000 kr.' },
    ],
  },

  // ============================================
  // RÄNTETYPER
  // ============================================
  '/rorlig-ranta': {
    title: 'Rörlig ränta - Fördelar, risker och tips',
    description: 'Allt om rörlig ränta. Lär dig hur den fungerar, när den passar bäst och hur du skyddar dig mot ränteökningar.',
    type: 'article',
  },
  '/bunden-fast-ranta': {
    title: 'Bunden ränta - Så fungerar fast ränta',
    description: 'Komplett guide om bunden ränta. Lär dig fördelar, nackdelar och när du bör välja fast ränta på ditt bolån eller sparande.',
    type: 'article',
  },
  '/nominell-ranta': {
    title: 'Nominell ränta - Definition och beräkning',
    description: 'Förstå vad nominell ränta är och hur den skiljer sig från effektiv ränta. Enkla förklaringar med räkneexempel.',
    type: 'article',
  },
  '/realranta': {
    title: 'Realränta - Ränta justerad för inflation',
    description: 'Lär dig vad realränta är och hur inflation påverkar din faktiska avkastning. Aktuell realränta i Sverige.',
    type: 'article',
  },
  '/reporanta': {
    title: 'Reporänta - Riksbankens styrränta förklarad',
    description: 'Allt om reporäntan och hur Riksbankens beslut påverkar din ekonomi. Aktuell reporänta och historik.',
    type: 'article',
  },
  '/styrranta': {
    title: 'Styrränta - Så påverkar den din ekonomi',
    description: 'Förstå hur Riksbankens styrränta fungerar och varför den är så viktig för bolåneräntor och sparande.',
    type: 'article',
  },
  '/riksbankens-ranta': {
    title: 'Riksbankens ränta 2025 - Aktuellt beslut',
    description: 'Senaste informationen om Riksbankens ränta. Se aktuell nivå, nästa möte och prognoser för framtiden.',
    type: 'article',
  },
  '/riksgaldens-ranta': {
    title: 'Riksgäldens ränta - Statens upplåning',
    description: 'Information om Riksgäldens räntor och hur statens upplåning påverkar räntemarknaden i Sverige.',
    type: 'article',
  },
  '/stibor-ranta': {
    title: 'STIBOR ränta - Interbankränta förklarad',
    description: 'Vad är STIBOR och hur påverkar den ditt bolån? Aktuella STIBOR-nivåer och förklaring av interbankräntan.',
    type: 'article',
  },
  '/referensranta': {
    title: 'Referensränta - Beräkning och användning',
    description: 'Allt om referensräntan i Sverige. Se aktuell nivå, hur den beräknas och när den används.',
    type: 'article',
  },
  '/statslaneranta': {
    title: 'Statslåneränta (SLR) - Aktuell nivå 2025',
    description: 'Aktuell statslåneränta och hur den påverkar beskattning av kapitalinkomster. Historik och prognoser.',
    type: 'article',
  },
  '/statsobligationer-ranta': {
    title: 'Statsobligationer ränta - Avkastning & risker',
    description: 'Guide till ränta på statsobligationer. Se aktuell avkastning och lär dig hur obligationsmarknaden fungerar.',
    type: 'article',
  },
  '/marginalranta': {
    title: 'Marginalränta - Bankernas påslag förklarat',
    description: 'Förstå vad marginalränta är och hur bankernas påslag påverkar din totala lånekostnad.',
    type: 'article',
  },
  '/marknadsranta': {
    title: 'Marknadsränta - Hur den sätts och påverkar dig',
    description: 'Lär dig hur marknadsräntan bildas och varför den är viktig för både låntagare och sparare.',
    type: 'article',
  },
  '/diskonteringsranta': {
    title: 'Diskonteringsränta - Nuvärdesberäkning',
    description: 'Förstå diskonteringsränta och hur den används för att beräkna nuvärden av framtida kassaflöden.',
    type: 'article',
  },
  '/inlaningsranta': {
    title: 'Inlåningsränta - Ränta på insättningar',
    description: 'Allt om inlåningsränta. Jämför räntor på sparkonton och se hur du får bäst avkastning på dina pengar.',
    type: 'article',
  },
  '/riskfri-ranta': {
    title: 'Riskfri ränta - Definition och användning',
    description: 'Vad är den riskfria räntan? Lär dig hur den används i finansiella beräkningar och investeringar.',
    type: 'article',
  },
  '/ockerranta': {
    title: 'Ockerränta - Vad är ocker och gränserna',
    description: 'Förstå vad ockerränta innebär juridiskt. Se gränserna för vad som räknas som ocker i Sverige.',
    type: 'article',
  },
  '/drojsmalsranta': {
    title: 'Dröjsmålsränta 2025 - Aktuell nivå & regler',
    description: 'Aktuell dröjsmålsränta och hur den beräknas. Lär dig reglerna för förseningsavgifter vid sena betalningar.',
    type: 'article',
  },
  '/csn-ranta': {
    title: 'CSN ränta 2025 - Aktuell studielånsränta',
    description: 'Se aktuell ränta på CSN-lån. Information om hur studielånsräntan sätts och vad du betalar i ränta.',
    type: 'article',
  },
  '/rantelagen': {
    title: 'Räntelagen - Regler för ränteberäkning',
    description: 'Komplett guide till räntelagen i Sverige. Förstå dina rättigheter vid ränteberäkning och dröjsmål.',
    type: 'article',
  },

  // ============================================
  // LÅN & SPARANDE
  // ============================================
  '/lana-pengar-med-lag-ranta': {
    title: 'Låna pengar med låg ränta - Bästa tipsen',
    description: 'Så hittar du lån med lägst ränta. Jämför privatlån, bolån och kreditkort för att spara tusenlappar.',
    type: 'article',
  },
  '/lana-pengar-utan-ranta': {
    title: 'Låna pengar utan ränta - Är det möjligt?',
    description: 'Går det att låna pengar helt utan ränta? Vi går igenom räntefria alternativ och vad du bör tänka på.',
    type: 'article',
  },
  '/ranta-pa-blancolan': {
    title: 'Ränta på blancolån 2025 - Jämför privatlån',
    description: 'Aktuella räntor på blancolån och privatlån. Jämför olika långivare och hitta lägsta räntan.',
    type: 'faq',
    faqItems: [
      { question: 'Vad är ett blancolån?', answer: 'Ett blancolån är ett lån utan säkerhet, även kallat privatlån. Du behöver inte pantsätta bostad eller annan egendom.' },
      { question: 'Vilken ränta kan jag få på blancolån?', answer: 'Räntan på blancolån varierar från cirka 4% till över 20% beroende på din ekonomi och långivare.' },
    ],
  },
  '/rantekonto': {
    title: 'Räntekonto - Sparkonto med hög ränta',
    description: 'Hitta bästa räntekontot. Jämför sparkonton med hög ränta och se var du får mest för dina pengar.',
    type: 'faq',
    faqItems: [
      { question: 'Vad är ett räntekonto?', answer: 'Ett räntekonto är ett sparkonto där dina pengar ger avkastning i form av ränta. Ju högre ränta, desto mer växer dina pengar.' },
      { question: 'Är pengarna på räntekonto säkra?', answer: 'Ja, pengar på räntekonto hos svenska banker skyddas av den statliga insättningsgarantin upp till 1 050 000 kr.' },
    ],
  },
  '/forhandla-ranta-pa-bolan': {
    title: 'Förhandla bolåneräntan - Så lyckas du',
    description: 'Praktiska tips för att förhandla ner din bolåneränta. Lär dig vad bankerna tittar på och hur du får bästa deal.',
    type: 'howto',
    howToSteps: [
      { name: 'Förbered dig', text: 'Samla information om din ekonomi, lånets storlek och aktuella marknadsräntor.' },
      { name: 'Jämför banker', text: 'Ta reda på vad andra banker erbjuder för ränta på motsvarande lån.' },
      { name: 'Kontakta banken', text: 'Ring din bank och be om ett möte för att diskutera din ränta.' },
      { name: 'Förhandla', text: 'Presentera dina argument och var beredd att byta bank om de inte möter dina krav.' },
    ],
  },

  // ============================================
  // KALKYLATORER
  // ============================================
  '/berakna': {
    title: 'Räntekalkylatorer - Räkna ut ränta',
    description: 'Använd våra gratis kalkylatorer för att beräkna räntor, avkastning och lånekostnader. Enkla verktyg för bättre beslut.',
    type: 'website',
  },
  '/berakna/ranta-pa-ranta': {
    title: 'Ränta-på-ränta kalkylator - Beräkna sammansatt ränta',
    description: 'Räkna ut ränta-på-ränta effekten för ditt sparande. Se hur ditt kapital växer över tid med sammansatt ränta.',
    type: 'webapp',
  },
  '/berakna/effektiv-ranta': {
    title: 'Effektiv ränta kalkylator',
    description: 'Beräkna den effektiva räntan på lån och krediter. Se den verkliga kostnaden inklusive alla avgifter.',
    type: 'webapp',
  },
  '/berakna/bolaneranta': {
    title: 'Bolåneränta kalkylator',
    description: 'Räkna ut din månadskostnad för bolån. Jämför olika räntor och se hur amortering påverkar totalkostnaden.',
    type: 'webapp',
  },
  '/berakna/skatt-pa-ranta': {
    title: 'Skatt på ränta kalkylator',
    description: 'Beräkna hur mycket skatt du betalar på ränteinkomster. Se netto-avkastning efter kapitalskatt.',
    type: 'webapp',
  },
  '/berakna/ranteavdrag': {
    title: 'Ränteavdrag kalkylator 2025',
    description: 'Räkna ut ditt ränteavdrag på bolån. Se hur mycket du sparar på skatten och din faktiska räntekostnad.',
    type: 'webapp',
  },
  '/berakna/leva-pa-ranta': {
    title: 'Leva på ränta kalkylator',
    description: 'Beräkna hur mycket kapital du behöver för att leva på räntan. Planera din ekonomiska frihet.',
    type: 'webapp',
  },
  '/billan-kalkylator': {
    title: 'Billån kalkylator - Räkna ut månadskostnad',
    description: 'Beräkna månadskostnad för billån. Se hur ränta och amorteringstid påverkar din totala kostnad.',
    type: 'webapp',
  },

  // ============================================
  // NYA SIDOR (från gammal sitemap)
  // ============================================
  '/ranta-kreditkort': {
    title: 'Ränta på kreditkort - Så fungerar det',
    description: 'Förstå hur kreditkortsräntan fungerar och hur du kan minimera räntekostnaderna. Jämför olika kreditkort.',
    type: 'article',
  },
  '/hitta-lagsta-laneranta-payup': {
    title: 'Hitta lägsta låneräntan - Guide',
    description: 'Lär dig hur du hittar den bästa räntan för ditt lån genom att jämföra olika långivare och förhandla.',
    type: 'article',
  },
  '/basta-billan-ranta-2025': {
    title: 'Bästa billånsräntan 2025 - Jämför och spara',
    description: 'Jämför billån från Sveriges största banker. Hitta den bästa räntan för ditt nya eller begagnade bilköp.',
    type: 'article',
  },

  // ============================================
  // ARTIKLAR PÅ ROOT-NIVÅ (gamla URLs från sitemap)
  // ============================================
  '/effektiv-ranta-lanekostnad': {
    title: 'Effektiv ränta - Räkna ut lånets verkliga kostnad',
    description: 'Lär dig beräkna effektiv ränta och förstå den totala kostnaden för ditt lån. Steg-för-steg guide.',
    type: 'article',
  },
  '/riksbanken-forsvinner-konsekvenser': {
    title: 'Vad händer om Riksbanken försvinner?',
    description: 'Tankeexperiment om vad som skulle hända med räntor och ekonomi utan Riksbanken. Intressant analys.',
    type: 'article',
  },
  '/ranta-kreditlan-kostnad-faktorer': {
    title: 'Kreditlån ränta - Hur hög är den?',
    description: 'Aktuella räntor på kreditlån i Sverige. Se vad olika långivare tar och hur du hittar bästa räntan.',
    type: 'article',
  },
  '/krypto-staking-avkastning': {
    title: 'Krypto staking ränta - Så fungerar det',
    description: 'Guide till krypto staking och vilken avkastning du kan förvänta dig. Risker och möjligheter förklarade.',
    type: 'article',
  },
  '/kontokredit-ranta-effektiv-kostnad': {
    title: 'Kontokredit ränta 2025 - Villkor & kostnader',
    description: 'Aktuella räntor på kontokredit. Jämför olika banker och se vad det kostar att använda din kredit.',
    type: 'article',
  },
  '/nyckelfardigt-hus-rantekostnader-renovering': {
    title: 'Nyckelfärdigt hus - Så påverkas räntekostnaderna',
    description: 'Förstå hur finansiering av nyckelfärdigt hus fungerar och vad det innebär för dina räntekostnader.',
    type: 'article',
  },
  '/klarna-ranta': {
    title: 'Klarna ränta - Fördelaktiga sparkonton 2025',
    description: 'Allt om Klarnas sparkonton och aktuella räntor. Jämför flexkonto och fast sparande hos Klarna.',
    type: 'article',
  },
  '/lag-ranta-ger-dig-ett-billigare-lan': {
    title: 'Låg ränta ger billigare lån - Så sparar du',
    description: 'Se hur skillnaden i ränta påverkar din totala lånekostnad. Konkreta exempel på hur du sparar tusenlappar.',
    type: 'article',
  },
  '/tips-nar-du-ska-forhandla-om-bolan': {
    title: 'Förhandla bolån - Bästa tipsen',
    description: 'Praktiska tips för att förhandla om ditt bolån och få bättre räntevillkor. Så pratar du med banken.',
    type: 'article',
  },

  // ============================================
  // ÖVRIGT
  // ============================================
  '/om-oss': {
    title: 'Om Ränta.nu - Sveriges ränteguide',
    description: 'Lär känna Ränta.nu - din oberoende guide till räntor i Sverige. Vi hjälper dig göra smarta ekonomiska val.',
    type: 'about',
  },
  '/kontakt': {
    title: 'Kontakta oss',
    description: 'Har du frågor om räntor eller vår tjänst? Kontakta oss så hjälper vi dig.',
    type: 'contact',
  },
  '/integritetspolicy': {
    title: 'Integritetspolicy',
    description: 'Läs om hur Ränta.nu hanterar dina personuppgifter och värnar om din integritet.',
    type: 'website',
  },
  '/cookiepolicy': {
    title: 'Cookiepolicy',
    description: 'Information om hur Ränta.nu använder cookies och liknande tekniker.',
    type: 'website',
  },
  '/kapitello': {
    title: 'Kapitello - Sparkonto med hög ränta',
    description: 'Information om Kapitellos sparkonton och aktuella räntor. Läs vår recension.',
    type: 'article',
  },
  '/uppkoring': {
    title: 'Uppköring',
    description: 'Information om uppköring och relaterade kostnader.',
    type: 'website',
  },
  '/ny-startsida': {
    title: 'Ny startsida',
    description: 'Ny version av startsidan för Ränta.nu.',
    type: 'website',
  },

  // ============================================
  // ARTIKLAR
  // ============================================
  '/artiklar': {
    title: 'Artiklar om räntor och ekonomi',
    description: 'Läs våra artiklar om räntor, sparande och privatekonomi. Tips och guider för smartare ekonomiska beslut.',
    type: 'website',
  },
  '/artiklar/hur-rantan-pa-kreditkort-paverkar-din-ekonomi': {
    title: 'Ränta på kreditkort - Så påverkas din ekonomi',
    description: 'Förstå hur kreditkortsräntan fungerar och hur du undviker kostsamma ränteavgifter. Tips för smartare kortanvändning.',
    type: 'article',
  },
  '/artiklar/klarna-ranta-fordelaktiga-villkor-for-dina-besparingar': {
    title: 'Klarna ränta - Fördelaktiga sparkonton 2025',
    description: 'Allt om Klarnas sparkonton och aktuella räntor. Jämför flexkonto och fast sparande hos Klarna.',
    type: 'article',
  },
  '/artiklar/effektiv-ranta-sa-raknar-du-ut-lanets-verkliga-kostnad': {
    title: 'Effektiv ränta - Räkna ut lånets verkliga kostnad',
    description: 'Lär dig beräkna effektiv ränta och förstå den totala kostnaden för ditt lån. Steg-för-steg guide.',
    type: 'article',
  },
  '/artiklar/guide-sa-hittar-du-lagsta-lanerantan-med-payup': {
    title: 'Hitta lägsta låneräntan med Payup',
    description: 'Guide till hur du hittar Sveriges lägsta låneräntor med hjälp av Payup. Jämför och spara pengar.',
    type: 'article',
  },
  '/artiklar/hur-en-lag-ranta-ger-dig-ett-billigare-lan': {
    title: 'Låg ränta ger billigare lån - Så sparar du',
    description: 'Se hur skillnaden i ränta påverkar din totala lånekostnad. Konkreta exempel på hur du sparar tusenlappar.',
    type: 'article',
  },
  '/artiklar/hur-hog-ar-rantan-pa-en-kontokredit-aktuella-villkor-och-kostnader-2025': {
    title: 'Kontokredit ränta 2025 - Villkor & kostnader',
    description: 'Aktuella räntor på kontokredit. Jämför olika banker och se vad det kostar att använda din kredit.',
    type: 'article',
  },
  '/artiklar/hur-hog-ar-rantan-pa-ett-kreditlan': {
    title: 'Kreditlån ränta - Hur hög är den?',
    description: 'Aktuella räntor på kreditlån i Sverige. Se vad olika långivare tar och hur du hittar bästa räntan.',
    type: 'article',
  },
  '/artiklar/krypto-staking-hur-det-fungerar-och-vilken-ranta-du-kan-fa': {
    title: 'Krypto staking ränta - Så fungerar det',
    description: 'Guide till krypto staking och vilken avkastning du kan förvänta dig. Risker och möjligheter förklarade.',
    type: 'article',
  },
  '/artiklar/nyckelfardigt-hus-sa-paverkas-dina-rantekostnader': {
    title: 'Nyckelfärdigt hus - Så påverkas räntekostnaderna',
    description: 'Förstå hur finansiering av nyckelfärdigt hus fungerar och vad det innebär för dina räntekostnader.',
    type: 'article',
  },
  '/artiklar/tips-nar-du-ska-forhandla-om-bolan': {
    title: 'Förhandla bolån - Bästa tipsen',
    description: 'Praktiska tips för att förhandla om ditt bolån och få bättre räntevillkor. Så pratar du med banken.',
    type: 'article',
  },
  '/artiklar/vad-hander-om-riksbanken-forsvinner-imorgon': {
    title: 'Vad händer om Riksbanken försvinner?',
    description: 'Tankeexperiment om vad som skulle hända med räntor och ekonomi utan Riksbanken. Intressant analys.',
    type: 'article',
  },
  '/artiklar/vilken-ranta-kan-man-forvanta-sig-pa-ett-billan-2025': {
    title: 'Billån ränta 2025 - Vad kan du förvänta dig?',
    description: 'Aktuella räntor på billån och vad som avgör vilken ränta du erbjuds. Jämför olika finansieringsalternativ.',
    type: 'article',
  },
};

/**
 * Get SEO data for a specific path
 */
export function getSEOData(path: string): SEOData {
  // Normalize path
  const normalizedPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;

  return seoConfig[normalizedPath] || {
    title: 'Ränta.nu',
    description: 'Sveriges guide till räntor - jämför sparräntor och lån.',
    type: 'website',
  };
}
