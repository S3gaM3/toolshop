import { Link } from 'react-router-dom';

const reviews = [
  { text: 'Отличный магазин! Большое спасибо коллективу компании за качественную работу! Очень понравился заказанный набор инструментов, посылка пришла в срок, упаковка аккуратная. Надеюсь, что в дальнейшем будем так же сотрудничать!!!', author: 'Сергей' },
  { text: 'Не первый раз обращаюсь к данному интернет магазину и остаюсь очень доволен. Менеджер быстро и грамотно подбирает нужную модель за, что ему отдельное спасибо. Доставка была очень быстрая, как оговаривалось, ТАК ДЕРЖАТЬ, МОЛОДЦЫ!!!', author: 'Максим' },
  { text: 'Купил шлифовальные круги и остался очень доволен. Работники данного магазина все подробно объяснили и ответили на все мои вопросы. Спасибо, очень рад, что нашел этот магазин.', author: 'Александр' },
  { text: 'Трещётка хорошего качества. Увесистая. Из качественного материала. Рекомендую.', author: 'Виктор' },
];

export function ReviewsPage() {
  return (
    <main className="section" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <nav className="breadcrumb" aria-label="Хлебные крошки">
          <Link to="/">Главная</Link>
          <span className="breadcrumb__sep">/</span>
          <span>Отзывы</span>
        </nav>
        <h1>Отзывы о магазине</h1>
        <ul className="reviews-page__list">
          {reviews.map((item, i) => (
            <li key={i} className="reviews-page__item">
              <blockquote className="reviews-page__quote">{item.text}</blockquote>
              <cite className="reviews-page__author">— {item.author}</cite>
            </li>
          ))}
        </ul>
        <p><Link to="/">Вернуться на главную</Link></p>
      </div>
    </main>
  );
}
