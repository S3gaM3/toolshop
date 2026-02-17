import { Link } from 'react-router-dom';
import { pickPreferredBannerUrl } from '../utils/banner';

export function Hero() {
  const bannerUrl = pickPreferredBannerUrl();
  const bannerStyle = bannerUrl
    ? {
        backgroundImage: `url(${bannerUrl})`,
      }
    : undefined;

  return (
    <section className="hero">
      <div className="hero__top">
        <div className="hero__content">
          <div className="hero__panel">
            <h1 className="hero__title">Ваш надёжный партнёр в мире инструментов.</h1>
            <p className="hero__subtitle">
              Оптовые и розничные поставки сертифицированного инструмента собственной торговой марки по всей России и СНГ.
            </p>
            <div className="hero__actions">
              <Link to="/catalog" className="btn btn-primary hero__btn">
                Перейти в каталог
              </Link>
              <Link to="/catalog#dealer" className="btn btn-secondary hero__btn btn--dealer">
                Стать дилером
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__banner" aria-label="Промо-баннер VERTEXTOOLS" style={bannerStyle} />
    </section>
  );
}
