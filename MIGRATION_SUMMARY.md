# WordPress till Astro Migration - Sammanfattning

## Genomfört arbete

### 1. Astro Content Collections struktur
Skapade följande mappstruktur:
- `/Users/alexander/Desktop/min-test-sajt/src/content/artiklar/` - För blogginlägg
- `/Users/alexander/Desktop/min-test-sajt/src/content/sidor/` - För statiska sidor  
- `/Users/alexander/Desktop/min-test-sajt/public/images/` - För featured images
- `/Users/alexander/Desktop/min-test-sajt/src/content/config.ts` - Schema-definition

### 2. Migrerat innehåll från ränta.nu

#### Artiklar (5 st):
1. **effektiv-ranta-lanekostnad** (2025-12-29)
   - Titel: "Effektiv ränta: Så räknar du ut lånets verkliga kostnad"
   - Featured image: effektiv-ranta-lanekostnad.jpg (967 KB)

2. **riksbanken-forsvinner-konsekvenser** (2025-12-06)
   - Titel: "Vad händer om Riksbanken försvinner imorgon?"
   - Featured image: riksbanken-forsvinner-konsekvenser.jpg (762 KB)

3. **ranta-kreditlan-kostnad-faktorer** (2025-12-04)
   - Titel: "Hur högt är räntan på ett kreditlån?"
   - Featured image: ranta-kreditlan-kostnad-faktorer.jpg (462 KB)

4. **krypto-staking-avkastning** (2025-12-02)
   - Titel: "Krypto staking: Hur det fungerar och vilken ränta du kan få"
   - Featured image: krypto-staking-avkastning.jpg (945 KB)

5. **ranta-kreditkort** (2025-11-27)
   - Titel: "Hur räntan på kreditkort påverkar din ekonomi"
   - Featured image: ranta-kreditkort.jpg (1.0 MB)

#### Sidor (3 st):
1. **uppköring**
   - Titel: "Uppköring"
   - Om Uppköring24 trafikskola

2. **kapitello**
   - Titel: "Kapitello"
   - Om Kapitello företagsfinansiering

3. **ny-startsida**
   - Titel: "Ny startsida"
   - Ränta.nu sparräntekalkylator

### 3. Konvertering
- Alla WordPress HTML-artiklar konverterade till ren Markdown
- Alla HTML-taggar borttagna, struktur bibehållen
- Svenska tecken (å, ä, ö) korrekt hanterade i filnamn
- Frontmatter med metadata (title, description, publishDate, featuredImage, slug)

### 4. Featured Images
- 5 bilder nedladdade från WordPress (totalt ~4.1 MB)
- Sparade med artikelns slug som filnamn
- Format: .jpg (ursprungligen .png från WordPress)
- Placerade i `/public/images/`

### 5. Dynamiska Routes
Skapade två route-filer:
- `/src/pages/artiklar/[...slug].astro` - För artiklar
- `/src/pages/[...slug].astro` - För sidor

### 6. Build-resultat
Bygget lyckades och genererade 9 statiska sidor:
- 5 artikelsidor under `/artiklar/`
- 3 statiska sidor i rotkatalogen
- 1 index-sida

## URL-struktur

### Artiklar:
- /artiklar/effektiv-ranta-lanekostnad/
- /artiklar/riksbanken-forsvinner-konsekvenser/
- /artiklar/ranta-kreditlan-kostnad-faktorer/
- /artiklar/krypto-staking-avkastning/
- /artiklar/ranta-kreditkort/

### Sidor:
- /uppköring/
- /kapitello/
- /ny-startsida/

## Tekniska detaljer

### Content Collections Schema
```typescript
const artiklar = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.coerce.date(),
    featuredImage: z.string().optional(),
    slug: z.string().optional(),
  }),
});

const sidor = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    slug: z.string().optional(),
  }),
});
```

### Markdown Frontmatter exempel
```yaml
---
title: "Effektiv ränta: Så räknar du ut lånets verkliga kostnad"
description: "Effektiv ränta är lånets totala kostnad uttryckt som årsränta..."
publishDate: 2025-12-29T18:01:55Z
featuredImage: "/images/effektiv-ranta-lanekostnad.jpg"
slug: "effektiv-ranta-lanekostnad"
---
```

## Nästa steg för fullständig migration

För att migrera HELA sajten behöver du:

1. **Hämta alla artiklar** - Ändra `per_page=5` till `per_page=100` eller högre
2. **Hantera paginering** - Om fler än 100 artiklar, loopa genom flera sidor
3. **Lägg till styling** - Skapa CSS/komponenter för artikelsidorna
4. **Skapa översiktssidor** - Lista alla artiklar (blogg-index)
5. **Hantera taxonomier** - Kategorier och taggar från WordPress
6. **SEO-optimering** - Sitemap, robots.txt, OpenGraph-metadata
7. **Redirects** - Sätt upp 301-redirects från gamla WordPress-URLs

## Kommandon

### Utvecklingsserver
```bash
cd /Users/alexander/Desktop/min-test-sajt
npm run dev
```

### Bygga sajten
```bash
cd /Users/alexander/Desktop/min-test-sajt
npm run build
```

### Förhandsgranska
```bash
cd /Users/alexander/Desktop/min-test-sajt
npm run preview
```

## WordPress REST API endpoints använda

- `https://ränta.nu/wp-json/wp/v2/posts?per_page=5` - Artiklar
- `https://ränta.nu/wp-json/wp/v2/pages?per_page=100` - Sidor
- `https://ränta.nu/wp-json/wp/v2/media/{id}` - Featured images

## Filstruktur

```
/Users/alexander/Desktop/min-test-sajt/
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   ├── artiklar/
│   │   │   ├── effektiv-ranta-lanekostnad.md
│   │   │   ├── riksbanken-forsvinner-konsekvenser.md
│   │   │   ├── ranta-kreditlan-kostnad-faktorer.md
│   │   │   ├── krypto-staking-avkastning.md
│   │   │   └── ranta-kreditkort.md
│   │   └── sidor/
│   │       ├── uppköring.md
│   │       ├── kapitello.md
│   │       └── ny-startsida.md
│   └── pages/
│       ├── index.astro
│       ├── [...slug].astro
│       └── artiklar/
│           └── [...slug].astro
├── public/
│   └── images/
│       ├── effektiv-ranta-lanekostnad.jpg
│       ├── riksbanken-forsvinner-konsekvenser.jpg
│       ├── ranta-kreditlan-kostnad-faktorer.jpg
│       ├── krypto-staking-avkastning.jpg
│       └── ranta-kreditkort.jpg
└── dist/ (genererad vid build)
    ├── index.html
    ├── uppköring/index.html
    ├── kapitello/index.html
    ├── ny-startsida/index.html
    └── artiklar/
        ├── effektiv-ranta-lanekostnad/index.html
        ├── riksbanken-forsvinner-konsekvenser/index.html
        ├── ranta-kreditlan-kostnad-faktorer/index.html
        ├── krypto-staking-avkastning/index.html
        └── ranta-kreditkort/index.html
```

## Status: Klar ✓

Migration av första 5 artiklarna och 3 sidorna från ränta.nu till Astro är komplett och testad.
