import { Link } from 'react-router-dom';

const reviews = [
  {
    text: 'Отличный магазин! Большое спасибо коллективу компании за качественную работу! Очень понравился заказанный набор инструментов, посылка пришла в срок, упаковка аккуратная.',
    author: 'Сергей',
  },
  {
    text: 'Не первый раз обращаюсь к данному интернет магазину и остаюсь очень доволен. Менеджер быстро и грамотно подбирает нужную модель. Доставка была очень быстрая.',
    author: 'Максим',
  },
  {
    text: 'Купил шлифовальные круги и остался очень доволен. Работники данного магазина все подробно объяснили и ответили на все мои вопросы. Спасибо.',
    author: 'Александр',
  },
];

export function Reviews() {
  return (
    <section className="section reviews">
      <div className="container">
        <h2 className="section-title">Отзывы о магазине</h2>
        <ul className="reviews__list">
          {reviews.map((item, i) => (
            <li key={i} className="reviews__item">
              <blockquote className="reviews__quote">{item.text}</blockquote>
              <cite className="reviews__author">— {item.author}</cite>
            </li>
          ))}
        </ul>
        <p className="reviews__more">
          <Link to="/reviews">Читать все отзывы</Link>
        </p>
      </div>
    </section>
  );
}
