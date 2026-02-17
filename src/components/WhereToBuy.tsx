const marketplaces = [
  { name: 'ВсеИнструменты', url: 'https://www.vseinstrumenti.ru/' },
  { name: 'Яндекс Маркет', url: 'https://market.yandex.ru/' },
  { name: 'Озон', url: 'https://www.ozon.ru/' },
  { name: 'Wildberries', url: 'https://www.wildberries.ru/' },
  { name: 'Лемана ПРО', url: 'https://lemanapro.ru/' },
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
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
