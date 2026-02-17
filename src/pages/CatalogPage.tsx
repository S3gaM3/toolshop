import { useState, useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { categories, products } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';

const PAGE_SIZE = 48;

type SortKey = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export function CatalogPage() {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState<SortKey>('name-asc');
  const [page, setPage] = useState(1);

  const selectedCategory = categoryId
    ? categories.find((c) => c.id === categoryId)
    : null;

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const matchCategory = !categoryId || p.categoryId === categoryId;
      const matchSearch =
        !filter ||
        p.name.toLowerCase().includes(filter.toLowerCase()) ||
        p.sku.toLowerCase().includes(filter.toLowerCase());
      return matchCategory && matchSearch;
    });
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.priceRetail - b.priceRetail);
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.priceRetail - a.priceRetail);
    else if (sort === 'name-asc') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'name-desc') list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [categoryId, filter, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const paginatedProducts = useMemo(
    () => filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredProducts, page],
  );

  useEffect(() => {
    setPage(1);
  }, [categoryId, filter, sort]);

  return (
    <main className="catalog-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Хлебные крошки">
          <Link to="/">Главная</Link>
          <span className="breadcrumb__sep">/</span>
          <Link to="/catalog">Каталог</Link>
          {selectedCategory && (
            <>
              <span className="breadcrumb__sep">/</span>
              <span>{selectedCategory.name}</span>
            </>
          )}
        </nav>

        <h1 className="catalog-page__title">
          {selectedCategory ? selectedCategory.name : 'Каталог продукции'}
        </h1>
        {selectedCategory && (
          <p className="catalog-page__desc">{selectedCategory.desc}</p>
        )}

        <div className="catalog-page__layout">
          <aside className="catalog-page__sidebar">
            <h2 className="catalog-page__sidebar-title">Категории</h2>
            <ul className="catalog-page__categories">
              <li>
                <Link
                  to="/catalog"
                  className={!categoryId ? 'catalog-page__cat-link catalog-page__cat-link_active' : 'catalog-page__cat-link'}
                >
                  Все товары
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/catalog/${cat.id}`}
                    className={categoryId === cat.id ? 'catalog-page__cat-link catalog-page__cat-link_active' : 'catalog-page__cat-link'}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div id="dealer" className="catalog-page__dealer">
              <h3>Стать дилером</h3>
              <p>Оптовые поставки и выгодные условия. Оставьте заявку в разделе Контакты.</p>
              <Link to={{ pathname: '/', hash: 'contacts' }} className="btn btn-primary">Оставить заявку</Link>
            </div>
          </aside>

          <div className="catalog-page__main">
            <div className="catalog-page__toolbar">
              <input
                type="search"
                placeholder="Поиск по названию или артикулу..."
                className="catalog-page__search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                aria-label="Поиск по каталогу"
              />
              <label className="catalog-page__sort-label">
                <span className="catalog-page__sort-text">Сортировать:</span>
                <select
                  className="catalog-page__sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  aria-label="Сортировка"
                >
                  <option value="name-asc">По названию — от А</option>
                  <option value="name-desc">По названию — от Я</option>
                  <option value="price-asc">По цене — дешевые</option>
                  <option value="price-desc">По цене — дорогие</option>
                </select>
              </label>
            </div>
            <p className="catalog-page__count">
              Найдено: {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : filteredProducts.length < 5 ? 'товара' : 'товаров'}
            </p>
            <ul className="catalog-page__list">
              {filteredProducts.length === 0 ? (
                <li className="catalog-page__empty">Товары не найдены. Измените фильтры или категорию.</li>
              ) : (
                paginatedProducts.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))
              )}
            </ul>
            {totalPages > 1 && (
              <nav className="catalog-pagination" aria-label="Страницы каталога">
                <button
                  type="button"
                  className="btn btn-secondary catalog-pagination__btn"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Назад
                </button>
                <span className="catalog-pagination__info">
                  Страница {page} из {totalPages}
                </span>
                <button
                  type="button"
                  className="btn btn-secondary catalog-pagination__btn"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Вперёд
                </button>
              </nav>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
