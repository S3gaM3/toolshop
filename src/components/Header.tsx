import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo" onClick={() => setMenuOpen(false)}>
          VERTEXTOOLS
        </Link>
        <button
          type="button"
          className="header__burger"
          aria-label="Меню"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`header__nav ${menuOpen ? 'header__nav_open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Главная</Link>
          <Link to="/catalog" onClick={() => setMenuOpen(false)}>Каталог</Link>
          <Link to={{ pathname: '/', hash: 'about' }} onClick={() => setMenuOpen(false)}>О компании</Link>
          <Link to={{ pathname: '/', hash: 'advantages' }} onClick={() => setMenuOpen(false)}>Преимущества</Link>
          <Link to={{ pathname: '/', hash: 'contacts' }} onClick={() => setMenuOpen(false)}>Контакты</Link>
          <Link to="/catalog" className="btn btn-primary header__cta" onClick={() => setMenuOpen(false)}>
            Стать дилером
          </Link>
        </nav>
      </div>
    </header>
  );
}
