import { Link } from 'react-router-dom';

export function CtaBlock() {
  return (
    <section className="cta-block">
      <div className="container cta-block__inner">
        <h2 className="cta-block__title">Остались вопросы?</h2>
        <p className="cta-block__text">Свяжитесь с нами — ответим на все вопросы по продукции и условиям сотрудничества.</p>
        <Link to={{ pathname: '/', hash: 'contacts' }} className="btn btn-primary cta-block__btn">
          Контакты
        </Link>
      </div>
    </section>
  );
}
