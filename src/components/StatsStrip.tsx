export function StatsStrip() {
  const items = [
    { value: 'Официальный производитель', label: 'ручного инструмента' },
    { value: '3000+', label: 'наименований в ассортименте' },
    { value: '10+ лет', label: 'на рынке ручного инструмента' },
  ];

  return (
    <section className="stats-strip" aria-label="Ключевые показатели">
      <div className="container stats-strip__inner">
        {items.map((item, i) => (
          <div key={i} className="stats-strip__item">
            <span className="stats-strip__value">{item.value}</span>
            <span className="stats-strip__label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
