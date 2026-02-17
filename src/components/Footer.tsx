import { Link } from 'react-router-dom';
import logoUrl from '../assets/logo_310.webp';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="VERTEXTOOLS">
              <img className="footer__logo-img" src={logoUrl} alt="VERTEXTOOLS" />
            </Link>
            <p className="footer__tagline">Ручной инструмент и расходные материалы для профессионалов</p>
            <p className="footer__about">
              Поставляем продукцию надёжного качества по разумной цене. Сотрудничаем с Лемана ПРО, Озон, Wildberries, ВсеИнструменты, Яндекс Маркет и другими партнёрами по России.
            </p>
          </div>
          <nav className="footer__nav">
            <div className="footer__col">
              <h4>Каталог</h4>
              <Link to="/catalog/hand-tools">Ручной инструмент</Link>
              <Link to="/catalog/consumables">Расходные материалы</Link>
              <Link to="/catalog/power-tool-accessories">Оснастка для электроинструмента</Link>
              <Link to="/catalog/assembly">Слесарно-монтажный</Link>
              <Link to="/catalog/measuring">Измерительный инструмент</Link>
            </div>
            <div className="footer__col">
              <h4>Компания</h4>
              <Link to={{ pathname: '/', hash: 'about' }}>О нас</Link>
              <Link to={{ pathname: '/', hash: 'advantages' }}>Преимущества</Link>
              <Link to="/reviews">Отзывы</Link>
              <Link to={{ pathname: '/', hash: 'contacts' }}>Контакты</Link>
            </div>
          </nav>
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">
            © {currentYear} ООО «ВЕРТЕКС ИНСТРУМЕНТ». Все права защищены.
          </p>
          <Link to="/privacy" className="footer__link">Политика конфиденциальности</Link>
        </div>
      </div>
    </footer>
  );
}
