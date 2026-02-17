import vseInstrumentiLogo from '../assets/icons/vse-instrumenti-icon-logo.svg';
import yandexMarketLogo from '../assets/icons/yandex-market-sign-logo.svg';
import ozonLogo from '../assets/icons/ozon-icon-logo.svg';
import wildberriesLogo from '../assets/icons/wildberries-sign-logo.svg';
import aliexpressLogo from '../assets/icons/aliexpress-russia-sign-logo.svg';
import kazanExpressLogo from '../assets/icons/Logotype_KazanExpress.svg';
import lemanaProLogo from '../assets/icons/lemana-pro-vertical-logo.svg';

const marketplaces = [
  { 
    name: 'ВсеИнструменты', 
    url: 'https://www.vseinstrumenti.ru/brand/vertex-19305/?ysclid=lbc94pz7ad899395756', 
    logo: vseInstrumentiLogo
  },
  {
    name: 'Казань Экспресс',
    url: 'https://kazanexpress.ru/vertextools',
    logo: kazanExpressLogo,
  },
  { 
    name: 'Яндекс Маркет', 
    url: 'https://market.yandex.ru/business--vertextools/862751', 
    logo: yandexMarketLogo
  },
  { 
    name: 'Озон', 
    url: 'https://www.ozon.ru/brand/vertextools-84234553/', 
    logo: ozonLogo
  },
  { 
    name: 'Wildberries', 
    url: 'https://www.wildberries.ru/seller/83476', 
    logo: wildberriesLogo
  },
  {
    name: 'AliExpress',
    url: 'https://aliexpress.ru/store/912468247?g=y&page=1&spm=a2g2w.productlist.search_results.0.1481696fAWakfD',
    logo: aliexpressLogo,
  },
  { 
    name: 'Лемана ПРО', 
    url: 'https://lemanapro.ru/search/?q=vertextools&suggest=true', 
    logo: lemanaProLogo
  },
];

export function WhereToBuy() {
  return (
    <section className="section where-to-buy">
      <div className="container">
        <h2 className="section-title">Где купить</h2>
        <p className="where-to-buy__intro">
          Нашу продукцию можно приобрести на маркетплейсах и в партнёрских магазинах по всей России.
        </p>
        <ul className="where-to-buy__list">
          {marketplaces.map((item) => (
            <li key={item.name}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="where-to-buy__link"
              >
                <span className="where-to-buy__logo">
                  <img src={item.logo} alt={`${item.name} логотип`} />
                </span>
                <span className="where-to-buy__name">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
