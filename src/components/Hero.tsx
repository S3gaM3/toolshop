import { useState } from 'react';
import { Link } from 'react-router-dom';
import { pickPreferredBannerUrl } from '../utils/banner';
import { DealerRequestModal } from './DealerRequestModal';

export function Hero() {
  const [dealerModalOpen, setDealerModalOpen] = useState(false);
  const bannerUrl = pickPreferredBannerUrl();
  const bannerStyle = bannerUrl
    ? {
        backgroundImage: `url(${bannerUrl})`,
      }
    : undefined;

  return (
    <>
      <section className="hero">
        <div className="hero__banner" aria-label="Промо-баннер VERTEXTOOLS" style={bannerStyle} />
        
        <div className="hero__bottom">
          <div className="container hero__content">
            <div className="hero__panel">
              <h1 className="hero__title">Ваш надёжный партнёр в мире инструментов.</h1>
              <p className="hero__subtitle">
                Оптовые и розничные поставки сертифицированного инструмента собственной торговой марки по всей России и СНГ.
              </p>
              <div className="hero__actions">
                <Link to="/catalog" className="btn btn-primary hero__btn">
                  Перейти в каталог
                </Link>
                <button
                  type="button"
                  className="btn btn-secondary hero__btn btn--dealer"
                  onClick={() => setDealerModalOpen(true)}
                >
                  Стать дилером
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DealerRequestModal isOpen={dealerModalOpen} onClose={() => setDealerModalOpen(false)} />
    </>
  );
}
