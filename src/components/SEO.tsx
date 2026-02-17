import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateSEO, addStructuredData, getOrganizationSchema, getWebSiteSchema } from '../utils/seo';
import { categories } from '../data/catalog';

const BASE_URL = 'https://yourusername.github.io/toolshop';

const PAGE_SEO: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'VERTEXTOOLS — Ручной инструмент и расходные материалы для профессионалов',
    description: 'VERTEXTOOLS — надёжный поставщик ручного строительного инструмента и расходных материалов. Опт и розница по России и СНГ с 2010 года. Более 3000 наименований в ассортименте.',
  },
  '/catalog': {
    title: 'Каталог инструментов VERTEXTOOLS — Более 3000 товаров',
    description: 'Каталог ручного строительного инструмента и расходных материалов VERTEXTOOLS. Ручной инструмент, расходные материалы, оснастка для электроинструмента, слесарно-монтажный и измерительный инструмент.',
  },
  '/privacy': {
    title: 'Политика конфиденциальности — VERTEXTOOLS',
    description: 'Политика конфиденциальности и обработки персональных данных VERTEXTOOLS.',
  },
  '/reviews': {
    title: 'Отзывы клиентов — VERTEXTOOLS',
    description: 'Отзывы клиентов о продукции и услугах VERTEXTOOLS. Реальные мнения профессионалов о качестве инструментов.',
  },
};

export function SEO() {
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    // Определить SEO данные для текущей страницы
    let seoData: { title?: string; description?: string; url?: string } = {};

    // Основные страницы
    if (PAGE_SEO[pathname]) {
      seoData = PAGE_SEO[pathname];
    }
    // Категории каталога
    else if (pathname.startsWith('/catalog/')) {
      const categoryId = pathname.split('/catalog/')[1];
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        seoData = {
          title: `${category.name} — Каталог VERTEXTOOLS`,
          description: `Купить ${category.name.toLowerCase()} в интернет-магазине VERTEXTOOLS. Широкий ассортимент, выгодные цены, доставка по России и СНГ.`,
        };
      }
    }

    // Обновить SEO meta теги
    updateSEO({
      ...seoData,
      url: `${BASE_URL}${pathname}`,
    });

    // Добавить структурированные данные для организации (на всех страницах)
    addStructuredData(getOrganizationSchema());

    // Добавить структурированные данные для веб-сайта (только на главной)
    if (pathname === '/') {
      addStructuredData(getWebSiteSchema());
    }
  }, [pathname]);

  return null;
}
