import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__content">
        <h1 className="hero__title">
          VERTEXTOOLS. Ваш надёжный партнёр в мире инструментов.
        </h1>
        <p className="hero__subtitle">
          Оптовые и розничные поставки сертифицированного инструмента собственной торговой марки по всей России и СНГ.
        </p>
        <div className="hero__actions">
          <Link to="/catalog" className="btn btn-primary hero__btn">
            Перейти в каталог
          </Link>
          <Link to="/catalog#dealer" className="btn btn-secondary hero__btn">
            Стать дилером
          </Link>
        </div>
      </div>
    </section>
  );
}
