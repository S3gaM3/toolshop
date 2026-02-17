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

const DEFAULT_SEO: SEOData = {
  title: 'VERTEXTOOLS — Ручной инструмент и расходные материалы для профессионалов',
  description: 'VERTEXTOOLS — надёжный поставщик ручного строительного инструмента и расходных материалов. Опт и розница по России и СНГ с 2010 года.',
  keywords: 'ручной инструмент, строительный инструмент, расходные материалы, опт, розница, VERTEXTOOLS, инструменты для профессионалов',
  image: '/toolshop/logo-light.ico',
  url: 'https://yourusername.github.io/toolshop/',
  type: 'website',
  siteName: 'VERTEXTOOLS',
};

/**
 * Обновить SEO meta теги на странице
 */
export function updateSEO(data: SEOData = {}) {
  const seo = { ...DEFAULT_SEO, ...data };
  const baseUrl = 'https://yourusername.github.io/toolshop';
  const fullUrl = seo.url || `${baseUrl}${window.location.pathname}`;
  const imageUrl = seo.image?.startsWith('http') 
    ? seo.image 
    : `${baseUrl}${seo.image || DEFAULT_SEO.image}`;

  // Основные meta теги
  if (seo.title) {
    document.title = seo.title;
  }
  updateMetaTag('description', seo.description || DEFAULT_SEO.description, 'name');
  updateMetaTag('keywords', seo.keywords || DEFAULT_SEO.keywords, 'name');

  // Open Graph
  updateMetaTag('og:title', seo.title || DEFAULT_SEO.title, 'property');
  updateMetaTag('og:description', seo.description || DEFAULT_SEO.description, 'property');
  updateMetaTag('og:image', imageUrl, 'property');
  updateMetaTag('og:url', fullUrl, 'property');
  updateMetaTag('og:type', seo.type || 'website', 'property');
  updateMetaTag('og:site_name', seo.siteName || DEFAULT_SEO.siteName, 'property');
  updateMetaTag('og:locale', 'ru_RU', 'property');

  // Twitter Card
  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', seo.title || DEFAULT_SEO.title, 'name');
  updateMetaTag('twitter:description', seo.description || DEFAULT_SEO.description, 'name');
  updateMetaTag('twitter:image', imageUrl, 'name');

  // Canonical URL
  updateCanonical(fullUrl);
}

/**
 * Обновить или создать meta тег
 */
function updateMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  if (!content) return;

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
 */
export function addStructuredData(data: Record<string, unknown>) {
  // Удалить существующие JSON-LD скрипты
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(script => script.remove());

  // Добавить новые структурированные данные
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
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
    url: 'https://yourusername.github.io/toolshop/',
    logo: 'https://yourusername.github.io/toolshop/logo-light.ico',
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
    url: 'https://yourusername.github.io/toolshop/',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://yourusername.github.io/toolshop/catalog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
