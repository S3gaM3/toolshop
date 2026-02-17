import vertextoolsData from './products-from-vertextools.json';

export const categories = [
  { id: 'hand-tools', name: 'Ручной инструмент', desc: 'Пассатижи, бокорезы, тонкогубцы (серии ПРОФИ), клещи, плоскогубцы' },
  { id: 'consumables', name: 'Расходные материалы', desc: 'Отрезные круги по металлу, щётки для УШМ' },
  { id: 'power-tool-accessories', name: 'Оснастка для электроинструмента', desc: 'Сверла по дереву (перовые, шнековые/Левиса), по металлу, бетону, биты, насадки' },
  { id: 'assembly', name: 'Слесарно-монтажный инструмент', desc: 'Ключи, отвёртки, головки' },
  { id: 'measuring', name: 'Измерительный инструмент', desc: 'Рулетки, уровни, угольники' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];

export interface Product {
  id: string;
  categoryId: CategoryId;
  name: string;
  sku: string;
  description: string;
  specs: string[];
  priceRetail: number;
  priceWholesale?: string;
}

interface RawProduct {
  name: string;
  sku: string;
  categoryId: string;
  folderSlug?: string;
}

const validCategoryIds = new Set(categories.map((c) => c.id));

function toProduct(raw: RawProduct, index: number): Product {
  const categoryId = validCategoryIds.has(raw.categoryId as CategoryId)
    ? (raw.categoryId as CategoryId)
    : 'hand-tools';
  const sku = (raw.sku || '').trim();
  const id = `vt-${index}`;
  return {
    id,
    categoryId,
    name: raw.name.trim(),
    sku: sku || '—',
    description: '',
    specs: [],
    priceRetail: 0,
    priceWholesale: 'по запросу',
  };
}

const rawProducts = (vertextoolsData as { products?: RawProduct[] }).products ?? [];
const defaultProductsList: Product[] =
  rawProducts.length > 0
    ? rawProducts.map(toProduct)
    : [
        {
          id: '1',
          categoryId: 'hand-tools',
          name: 'Бокорезы Vertextools ПРОФИ 160 мм',
          sku: '0036-160',
          description: 'Профессиональные бокорезы для резки проволоки и кабеля.',
          specs: ['Длина 160 мм', 'CrV-сталь', 'Двухкомпонентная рукоятка'],
          priceRetail: 890,
          priceWholesale: 'по запросу',
        },
        {
          id: '2',
          categoryId: 'hand-tools',
          name: 'Пассатижи Vertextools ПРОФИ 200 мм',
          sku: '0035-200',
          description: 'Универсальные пассатижи для монтажных работ.',
          specs: ['Длина 200 мм', 'CrV-сталь', 'Изолированные рукоятки'],
          priceRetail: 1250,
          priceWholesale: 'по запросу',
        },
        {
          id: '3',
          categoryId: 'consumables',
          name: 'Отрезной круг по металлу 125×1.2 мм',
          sku: 'ОК-125',
          description: 'Отрезные круги для УШМ по металлу.',
          specs: ['Ø 125 мм', 'Толщина 1.2 мм', 'Для углошлифовальных машин'],
          priceRetail: 45,
          priceWholesale: 'от 35 ₽',
        },
        {
          id: '4',
          categoryId: 'consumables',
          name: 'Щётка чашечная для УШМ 75 мм',
          sku: 'ЩЧ-75',
          description: 'Чашечная щётка для зачистки металла и снятия краски.',
          specs: ['Ø 75 мм', 'Стальная щетина', 'Резьба M14'],
          priceRetail: 320,
          priceWholesale: 'по запросу',
        },
        {
          id: '5',
          categoryId: 'power-tool-accessories',
          name: 'Сверло перовое по дереву 32 мм',
          sku: 'СП-32',
          description: 'Перовое сверло для дрели по дереву.',
          specs: ['Ø 32 мм', 'Хвостовик 10 мм', 'Длина 400 мм'],
          priceRetail: 280,
          priceWholesale: 'по запросу',
        },
        {
          id: '6',
          categoryId: 'power-tool-accessories',
          name: 'Сверло по металлу HSS 10 мм',
          sku: 'СМ-10',
          description: 'Спиральное сверло по металлу HSS.',
          specs: ['Ø 10 мм', 'HSS', 'Длина 133 мм'],
          priceRetail: 95,
          priceWholesale: 'от 70 ₽',
        },
      ];

export const products: Product[] = defaultProductsList;
