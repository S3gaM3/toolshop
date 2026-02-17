import { useState } from 'react';
import type { Product } from '../data/catalog';
import { QuickOrderModal } from './QuickOrderModal';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <article className="product-card">
        <div className="product-card__image">
          <div className="product-card__placeholder" aria-hidden="true">
            <span>VT</span>
          </div>
        </div>
        <div className="product-card__body">
          <h3 className="product-card__title">{product.name}</h3>
          <p className="product-card__sku">Артикул: {product.sku}</p>
          {product.description ? <p className="product-card__desc">{product.description}</p> : null}
          {product.specs.length > 0 ? (
            <ul className="product-card__specs">
              {product.specs.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          ) : null}
          <div className="product-card__footer">
            <span className="product-card__price">
            {product.priceRetail > 0
              ? `${product.priceRetail.toLocaleString('ru-RU')} ₽`
              : 'Цена по запросу'}
          </span>
            {product.priceWholesale && (
              <span className="product-card__wholesale">Опт: {product.priceWholesale}</span>
            )}
            <button
              type="button"
              className="btn btn-primary product-card__btn"
              onClick={() => setModalOpen(true)}
            >
              Запросить
            </button>
          </div>
        </div>
      </article>
      <QuickOrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={product.name}
        productSku={product.sku}
      />
    </>
  );
}
