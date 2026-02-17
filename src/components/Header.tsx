import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../assets/logo_310.webp';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return window.localStorage.getItem('vt-theme') === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem('vt-theme', next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <Link
          to="/"
          className="header__logo"
          aria-label="VERTEXTOOLS"
          onClick={() => setMenuOpen(false)}
        >
          <img className="header__logo-img" src={logoUrl} alt="VERTEXTOOLS" />
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
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
          >
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <Link to="/catalog" className="btn btn-primary header__cta btn--dealer" onClick={() => setMenuOpen(false)}>
            Стать дилером
          </Link>
        </nav>
      </div>
    </header>
  );
}
