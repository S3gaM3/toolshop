import { Link } from 'react-router-dom';
import toolCaseIcon from '../assets/icons/tool-case.svg';
import fishingLineIcon from '../assets/icons/fishing-line.svg';
import drillBitsIcon from '../assets/icons/drill-bits.svg';
import crownIcon from '../assets/icons/crown.svg';
import tapeMeasureIcon from '../assets/icons/tape-measure.svg';

const categories = [
  { id: 'hand-tools', name: 'Ручной инструмент', desc: 'Пассатижи, бокорезы, клещи, плоскогубцы', path: '/catalog/hand-tools', icon: toolCaseIcon },
  { id: 'consumables', name: 'Расходные материалы', desc: 'Отрезные круги по металлу, щётки для УШМ', path: '/catalog/consumables', icon: fishingLineIcon },
  { id: 'power-tool-accessories', name: 'Оснастка для электроинструмента', desc: 'Сверла по дереву, металлу, бетону, биты', path: '/catalog/power-tool-accessories', icon: drillBitsIcon },
  { id: 'assembly', name: 'Слесарно-монтажный инструмент', desc: 'Ключи, отвёртки, головки', path: '/catalog/assembly', icon: crownIcon },
  { id: 'measuring', name: 'Измерительный инструмент', desc: 'Рулетки, уровни, угольники', path: '/catalog/measuring', icon: tapeMeasureIcon },
];

export function CatalogSection() {
  return (
    <section id="catalog" className="section catalog-preview">
      <div className="container">
        <h2 className="section-title">Каталог продукции</h2>
        <p className="catalog-preview__intro">
          Структурированный ассортимент для профессионалов и бытового применения.
        </p>
        <ul className="catalog-preview__grid">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link to={cat.path} className="catalog-preview__card">
                <span className="catalog-preview__card-icon" aria-hidden="true">
                  <img src={cat.icon} alt="" width="48" height="48" />
                </span>
                <h3 className="catalog-preview__card-title">{cat.name}</h3>
                <p className="catalog-preview__card-desc">{cat.desc}</p>
                <span className="catalog-preview__card-link">Смотреть каталог →</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="catalog-preview__more">
          <Link to="/catalog" className="btn btn-primary">Перейти в каталог</Link>
        </div>
      </div>
    </section>
  );
}
