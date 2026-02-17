import { Link } from 'react-router-dom';

export function PrivacyPage() {
  return (
    <main className="section" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <nav className="breadcrumb" aria-label="Хлебные крошки">
          <Link to="/">Главная</Link>
          <span className="breadcrumb__sep">/</span>
          <span>Политика конфиденциальности</span>
        </nav>
        <h1>Политика конфиденциальности</h1>
        <p>
          ООО «ВЕРТЕКС ИНСТРУМЕНТ» соблюдает законодательство РФ в области персональных данных.
          Обработка данных, полученных через форму обратной связи и контакты сайта, осуществляется в целях связи с клиентами и предоставления коммерческих предложений.
        </p>
        <p>
          <Link to="/">Вернуться на главную</Link>
        </p>
      </div>
    </main>
  );
}
