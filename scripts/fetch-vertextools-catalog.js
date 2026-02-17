/**
 * Сбор товаров с vertextools.ru по списку категорий.
 * Запуск: node scripts/fetch-vertextools-catalog.js
 * Результат: src/data/products-from-vertextools.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE = 'https://vertextools.ru/magazin/folder';
const OUT_PATH = path.join(__dirname, '../src/data/products-from-vertextools.json');
const DELAY_MS = 600;

// Маппинг slug папки vertextools → наш categoryId (hand-tools, consumables, power-tool-accessories, assembly, measuring)
const FOLDER_TO_CATEGORY = {
  'bokorezy': 'hand-tools',
  'passatizhi': 'hand-tools',
  'tonkogubcy': 'hand-tools',
  'ploskogubci-kleshi': 'hand-tools',
  'zazhimy-ruchnye': 'hand-tools',
  'kleshchi-perestavnye': 'hand-tools',
  'molotki': 'hand-tools',
  'molotki-slesarnye': 'hand-tools',
  's-derevyannoj-rukoyadkoj': 'hand-tools',
  's-fiberglassovoj-rukoyadkoj': 'hand-tools',
  'nojovki': 'hand-tools',
  'nozhovki-po-metallu': 'hand-tools',
  'nozhovki-po-penobetonu': 'hand-tools',
  'nozhovka-po-derevu': 'hand-tools',
  'steplery': 'hand-tools',
  'steplery-mebelnye': 'hand-tools',
  'skoby-dlya-mebelnyh-steplerov': 'hand-tools',
  'sekatory': 'hand-tools',
  'doloto-stamestki-ploskie': 'hand-tools',
  'noznici-po-metally': 'hand-tools',
  'noznici-po-polipropileny': 'hand-tools',
  'stroitel': 'hand-tools',
  'stroitel-otdel-instrument': 'hand-tools',
  'krugi-zachistnye': 'consumables',
  'krugi-lepestkovye': 'consumables',
  'krugi-zachistnye-po-metally': 'consumables',
  'rashodnie-materialy': 'consumables',
  'bity-golovki': 'consumables',
  'udliniteli-dlya-bit': 'consumables',
  'bity-magnitnye': 'consumables',
  'nabory-bit': 'consumables',
  'abrazivniy-material': 'consumables',
  'shlifovalnie-krugi': 'consumables',
  'krugi-abrazivnye-pod-lipuchku': 'consumables',
  'krugi-shlifovalnye': 'consumables',
  'chashi-almaznye': 'consumables',
  'cherepashki-dlya-mramora': 'consumables',
  'cherepashki-dlya-mramora-suhoe-shlifovanie': 'consumables',
  'sverlilnyj-instrument': 'power-tool-accessories',
  'koronki': 'power-tool-accessories',
  'koronki-s-tehnicheskim-voskom': 'power-tool-accessories',
  'nabory-kolcevyh-pil-po-derevu': 'power-tool-accessories',
  'nabory-koronok-po-keramicheskoj-plitke': 'power-tool-accessories',
  'koronki-po-metallu': 'power-tool-accessories',
  'koronki-po-betonu': 'power-tool-accessories',
  'koronki-po-steklu-i-keramike-s-centruyushchim-sverlom': 'power-tool-accessories',
  'koronki-po-steklu': 'power-tool-accessories',
  'koronki-dlya-ushm': 'power-tool-accessories',
  'sverla': 'power-tool-accessories',
  'udlinitel-dlya-pervyh-sverl': 'power-tool-accessories',
  'perovye-sverla': 'power-tool-accessories',
  'sverla-po-derevu': 'power-tool-accessories',
  'sverla-po-metallu': 'power-tool-accessories',
  'kobalt': 'power-tool-accessories',
  'titan-kobalt': 'power-tool-accessories',
  'tverdosplavnye': 'power-tool-accessories',
  'hss': 'power-tool-accessories',
  'udlinennye-hss': 'power-tool-accessories',
  'rezyshiy-indtrument': 'power-tool-accessories',
  'pilnie-diski': 'power-tool-accessories',
  'cepnye-diski-dlya-ushm': 'power-tool-accessories',
  'diski-po-cvetnym-metallam': 'power-tool-accessories',
  'pilnye-diski-po-derevu': 'power-tool-accessories',
  'nasadki': 'power-tool-accessories',
  'mikser': 'power-tool-accessories',
  'nasadki-dlya-ushm-s-lipuchkoj-1': 'power-tool-accessories',
  'nasadki-dlya-ushm-s-lipuchkoj': 'power-tool-accessories',
  'nasadki-dlya-shlifovalnoj-mashinki': 'power-tool-accessories',
  'nasadki-dlya-ushm-s-perehodnikom': 'power-tool-accessories',
  'shlifovalnye-nasadki': 'power-tool-accessories',
  'pilnye-nasadki': 'power-tool-accessories',
  'shchetka-nejlonovaya-dlya-ushm': 'power-tool-accessories',
  'shchetka-dlya-ushm': 'power-tool-accessories',
  'shchetka-ploskaya-dlya-ushm': 'power-tool-accessories',
  'shchetka-po-metallu-plastikovaya': 'power-tool-accessories',
  'nabor-kluchey': 'assembly',
  'klyuchi-gaechnye-universalnye': 'assembly',
  'klyuchi-razvodnye': 'assembly',
  'klyuchi-universalnye-dlya-ushm': 'assembly',
  'pryamye-trubnye-klyuchi': 'assembly',
  'klyuchi-kombinirovannye': 'assembly',
  'klyuchi-kombinirovannye-treshchotochnye': 'assembly',
  'nabory-zvezdochek': 'assembly',
  'nabory-instrumentov': 'assembly',
  'nabory-klyuchej-imbusovyh': 'assembly',
  'nabory-shestigrannikov': 'assembly',
  'treshchetki-dlya-torcevyh-golovok': 'assembly',
  'slesarniy-instrument': 'hand-tools',
  'osnastka': 'assembly',
  'zubila': 'assembly',
  'shtrobniki-1': 'assembly',
  'izmeritelnye-sistemy': 'measuring',
  'lineyki-shablony': 'measuring',
  'transportiry': 'measuring',
  'linejki-izmeritelnye': 'measuring',
  'mernye-lenty': 'measuring',
  'ugolniki': 'measuring',
  'malyarniy-instrument': 'hand-tools',
  'shpateli': 'hand-tools',
  'kelmy': 'hand-tools',
  'shpateli-1': 'hand-tools',
  'svarochnoe-oborudovanie': 'hand-tools',
  'gorelki': 'hand-tools',
  'gorelka-krovelnaya': 'hand-tools',
  'gorelka-gazovaya': 'hand-tools',
  'sadoviy-instrument': 'hand-tools',
  'leski-trimmer': 'hand-tools',
  'vitoj-kvadrat': 'hand-tools',
  'zvezda': 'hand-tools',
  'krug-s-serdechnikom': 'hand-tools',
  'zashita': 'hand-tools',
  'ochki-gazosvarshika': 'hand-tools',
  'zashitnye-ochki': 'hand-tools',
  'nakolenniki': 'hand-tools',
  'prochie-tovary': 'hand-tools',
  'drugie-tovary': 'hand-tools',
  'zamki': 'hand-tools',
  'steklodomkraty': 'hand-tools',
  'homuty-styajki': 'hand-tools',
  'braslety': 'hand-tools',
  'payalnie-lampy': 'hand-tools',
  'multituly': 'hand-tools',
};

// Все slug папок с товарами (листья дерева каталога на vertextools.ru)
const FOLDER_SLUGS = [
  'koronki-s-tehnicheskim-voskom', 'nabory-kolcevyh-pil-po-derevu', 'nabory-koronok-po-keramicheskoj-plitke',
  'koronki-po-metallu', 'koronki-po-betonu', 'koronki-po-steklu-i-keramike-s-centruyushchim-sverlom',
  'koronki-po-steklu', 'koronki-dlya-ushm', 'koronki',
  'udlinitel-dlya-pervyh-sverl', 'perovye-sverla', 'sverla-po-derevu',
  'kobalt', 'titan-kobalt', 'tverdosplavnye', 'hss', 'udlinennye-hss', 'sverla-po-metallu',
  'sekatory', 'noznici-po-polipropileny', 'noznici-po-metally', 'doloto-stamestki-ploskie', 'stroitel-otdel-instrument',
  'cepnye-diski-dlya-ushm', 'diski-po-cvetnym-metallam', 'pilnye-diski-po-derevu', 'pilnie-diski',
  'krugi-zachistnye', 'krugi-lepestkovye', 'krugi-zachistnye-po-metally',
  'steplery-mebelnye', 'skoby-dlya-mebelnyh-steplerov', 'steplery',
  'klyuchi-gaechnye-universalnye', 'klyuchi-razvodnye', 'klyuchi-universalnye-dlya-ushm', 'pryamye-trubnye-klyuchi',
  'klyuchi-kombinirovannye', 'klyuchi-kombinirovannye-treshchotochnye', 'nabory-zvezdochek', 'nabory-instrumentov',
  'nabory-klyuchej-imbusovyh', 'nabory-shestigrannikov', 'treshchetki-dlya-torcevyh-golovok', 'nabor-kluchey',
  'kelmy', 'shpateli-1', 'shpateli',
  'mikser', 'nasadki-dlya-ushm-s-lipuchkoj-1', 'nasadki-dlya-ushm-s-lipuchkoj', 'nasadki-dlya-shlifovalnoj-mashinki',
  'nasadki-dlya-ushm-s-perehodnikom', 'shlifovalnye-nasadki', 'pilnye-nasadki', 'shchetka-nejlonovaya-dlya-ushm',
  'shchetka-dlya-ushm', 'shchetka-ploskaya-dlya-ushm', 'shchetka-po-metallu-plastikovaya', 'nasadki',
  'bokorezy', 'zazhimy-ruchnye', 'kleshchi-perestavnye', 'passatizhi', 'tonkogubcy', 'ploskogubci-kleshi',
  's-derevyannoj-rukoyadkoj', 's-fiberglassovoj-rukoyadkoj', 'molotki-slesarnye', 'molotki',
  'gorelka-krovelnaya', 'gorelka-gazovaya', 'gorelki',
  'transportiry', 'linejki-izmeritelnye', 'lineyki-shablony', 'mernye-lenty', 'ugolniki',
  'udliniteli-dlya-bit', 'bity-magnitnye', 'nabory-bit', 'bity-golovki',
  'shtrobniki-1', 'zubila',
  'krugi-abrazivnye-pod-lipuchku', 'krugi-shlifovalnye', 'chashi-almaznye', 'cherepashki-dlya-mramora',
  'cherepashki-dlya-mramora-suhoe-shlifovanie', 'shlifovalnie-krugi',
  'vitoj-kvadrat', 'zvezda', 'krug-s-serdechnikom', 'leski-trimmer',
  'nozhovki-po-metallu', 'nozhovki-po-penobetonu', 'nozhovka-po-derevu', 'nojovki',
  'ochki-gazosvarshika', 'zashitnye-ochki', 'nakolenniki', 'zashita',
  'drugie-tovary', 'zamki', 'steklodomkraty', 'homuty-styajki', 'braslety', 'payalnie-lampy', 'multituly', 'prochie-tovary',
  'sverlilnyj-instrument', 'sverla', 'rashodnie-materialy', 'osnastka', 'abrazivniy-material', 'sadoviy-instrument',
  'izmeritelnye-sistemy', 'slesarniy-instrument', 'ruchnoj-instrument', 'malyarniy-instrument', 'svarochnoe-oborudovanie',
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseProductsFromHtml(html, folderSlug) {
  const categoryId = FOLDER_TO_CATEGORY[folderSlug] || 'hand-tools';
  const products = [];
  const nameRe = /<div class="gr-product-name">\s*<a[^>]*>([^<]+)<\/a>/g;
  const skuRe = /<div class="product-article"><span>Артикул:<\/span>\s*([^<]+)/g;
  let nameMatch;
  let skuMatch;
  const names = [];
  const skus = [];
  while ((nameMatch = nameRe.exec(html)) !== null) names.push(nameMatch[1].trim());
  while ((skuMatch = skuRe.exec(html)) !== null) skus.push(skuMatch[1].trim());
  const len = Math.min(names.length, skus.length);
  for (let i = 0; i < len; i++) {
    products.push({
      name: names[i],
      sku: skus[i],
      categoryId,
      folderSlug,
    });
  }
  if (names.length !== skus.length && names.length > 0) {
    for (let i = len; i < names.length; i++) {
      products.push({ name: names[i], sku: '', categoryId, folderSlug });
    }
  }
  return products;
}

function getMaxPage(html, folderSlug) {
  const escaped = folderSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`/magazin/folder/${escaped}/p/(\\d+)`, 'g');
  let max = 0;
  let m;
  while ((m = re.exec(html)) !== null) {
    const n = parseInt(m[1], 10);
    if (n > max) max = n;
  }
  return max;
}

async function fetchFolder(folderSlug, page = 1) {
  const url = page <= 1 ? `${BASE}/${folderSlug}` : `${BASE}/${folderSlug}/p/${page}`;
  const res = await fetch(url, { headers: { 'Accept': 'text/html', 'User-Agent': 'Mozilla/5.0 (compatible; VertextoolsCatalog/1)' } });
  if (!res.ok) return { html: '', maxPage: 0 };
  const html = await res.text();
  const maxPage = getMaxPage(html, folderSlug);
  return { html, maxPage };
}

async function main() {
  const limit = process.env.LIMIT ? parseInt(process.env.LIMIT, 10) : 0;
  const slugs = limit > 0 ? FOLDER_SLUGS.slice(0, limit) : FOLDER_SLUGS;
  if (limit > 0) console.log(`Режим: первые ${limit} категорий\n`);
  const allProducts = [];
  const seen = new Set();
  for (const folderSlug of slugs) {
    let page = 1;
    try {
      do {
        const { html, maxPage } = await fetchFolder(folderSlug, page);
        const list = parseProductsFromHtml(html, folderSlug);
        for (const p of list) {
          const key = `${p.sku || p.name}`;
          if (!seen.has(key)) {
            seen.add(key);
            allProducts.push(p);
          }
        }
        if (page < maxPage && maxPage > 0) {
          page++;
          await sleep(DELAY_MS);
        } else {
          break;
        }
      } while (true);
      process.stdout.write('.');
    } catch (e) {
      console.error(`\n${folderSlug}: ${e.message}`);
    }
    await sleep(DELAY_MS);
  }
  const out = {
    source: 'https://vertextools.ru',
    fetchedAt: new Date().toISOString(),
    count: allProducts.length,
    products: allProducts,
  };
  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2), 'utf8');
  console.log(`\nГотово: ${allProducts.length} товаров → ${OUT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
