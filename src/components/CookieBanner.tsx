import { useState, useEffect } from 'react';

const STORAGE_KEY = 'vertextools_cookie_accept';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Уведомление о cookie">
      <p className="cookie-banner__text">
        Этот сайт использует cookie-файлы для улучшения работы. Продолжая, вы соглашаетесь с их использованием. Отключить cookie можно в настройках браузера.
      </p>
      <button type="button" className="btn btn-primary cookie-banner__btn" onClick={accept}>
        Принимаю
      </button>
    </div>
  );
}
