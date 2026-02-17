/**
 * SEO утилиты для динамического управления meta тегами
 */

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  siteName?: string;
}

const DEFAULT_SEO = {
  title: 'VERTEXTOOLS — Ручной инструмент и расходные материалы для профессионалов',
  description: 'VERTEXTOOLS — надёжный поставщик ручного строительного инструмента и расходных материалов. Опт и розница по России и СНГ с 2010 года.',
  keywords: 'ручной инструмент, строительный инструмент, расходные материалы, опт, розница, VERTEXTOOLS, инструменты для профессионалов',
  image: '/toolshop/logo-light.ico',
  url: 'https://s3gam3.github.io/toolshop/',
  type: 'website' as const,
  siteName: 'VERTEXTOOLS',
} as const;

/**
 * Обновить SEO meta теги на странице
 */
export function updateSEO(data: SEOData = {}) {
  if (typeof window === 'undefined') return;
  
  const seo = { ...DEFAULT_SEO, ...data };
  const baseUrl = 'https://s3gam3.github.io/toolshop';
  const fullUrl = seo.url || `${baseUrl}${window.location.pathname}`;
  const imageUrl = seo.image?.startsWith('http') 
    ? seo.image 
    : `${baseUrl}${seo.image || DEFAULT_SEO.image}`;

  // Основные meta теги
  if (seo.title) {
    document.title = seo.title;
  }
  const description = seo.description ?? DEFAULT_SEO.description;
  const keywords = seo.keywords ?? DEFAULT_SEO.keywords;
  const title = seo.title ?? DEFAULT_SEO.title;
  const siteName = seo.siteName ?? DEFAULT_SEO.siteName;
  const type = seo.type ?? DEFAULT_SEO.type;

  updateMetaTag('description', description, 'name');
  updateMetaTag('keywords', keywords, 'name');

  // Open Graph
  updateMetaTag('og:title', title, 'property');
  updateMetaTag('og:description', description, 'property');
  updateMetaTag('og:image', imageUrl, 'property');
  updateMetaTag('og:url', fullUrl, 'property');
  updateMetaTag('og:type', type, 'property');
  updateMetaTag('og:site_name', siteName, 'property');
  updateMetaTag('og:locale', 'ru_RU', 'property');

  // Twitter Card
  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', title, 'name');
  updateMetaTag('twitter:description', description, 'name');
  updateMetaTag('twitter:image', imageUrl, 'name');

  // Canonical URL
  updateCanonical(fullUrl);
}

/**
 * Обновить или создать meta тег
 */
function updateMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  if (typeof document === 'undefined' || !content) return;

  if (name === 'title') {
    document.title = content;
    return;
  }

  let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  
  tag.content = content;
}

/**
 * Обновить canonical URL
 */
function updateCanonical(url: string) {
  if (typeof document === 'undefined') return;
  
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  
  link.href = url;
}

/**
 * Добавить структурированные данные (JSON-LD)
 * Можно вызывать несколько раз для добавления нескольких схем
 */
export function addStructuredData(data: Record<string, unknown>) {
  if (typeof document === 'undefined') return;
  
  // Добавить новые структурированные данные (не удаляем существующие, чтобы можно было добавлять несколько)
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * Очистить все структурированные данные
 */
export function clearStructuredData() {
  if (typeof document === 'undefined') return;
  
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(script => script.remove());
}

/**
 * Структурированные данные для организации
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VERTEXTOOLS',
    legalName: 'ООО «ВЕРТЕКС ИНСТРУМЕНТ»',
    url: 'https://s3gam3.github.io/toolshop/',
    logo: 'https://s3gam3.github.io/toolshop/logo-light.ico',
    description: 'Надёжный поставщик ручного строительного инструмента и расходных материалов',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Варшавское шоссе, д.148, каб. 402',
      addressLocality: 'Москва',
      postalCode: '117519',
      addressCountry: 'RU',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+7-495-150-60-57',
      contactType: 'customer service',
      email: 'sale@vertextools.ru',
      areaServed: ['RU', 'BY', 'KZ', 'UA'],
      availableLanguage: ['Russian'],
    },
    sameAs: [
      'https://www.vseinstrumenti.ru/brand/vertex-19305/',
      'https://market.yandex.ru/business--vertextools/862751',
      'https://www.ozon.ru/brand/vertextools-84234553/',
      'https://www.wildberries.ru/seller/83476',
    ],
  };
}

/**
 * Структурированные данные для веб-сайта
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VERTEXTOOLS',
    url: 'https://s3gam3.github.io/toolshop/',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://s3gam3.github.io/toolshop/catalog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
