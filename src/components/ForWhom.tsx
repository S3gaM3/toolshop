const blocks = [
  {
    title: 'Для профессионалов',
    text: 'Строительные бригады, промышленные предприятия. Инструмент, выдерживающий интенсивные нагрузки.',
    className: 'forwhom__card_pro',
  },
  {
    title: 'Для оптовых покупателей',
    text: 'Дистрибьюторы, строительные магазины. Выгодные условия сотрудничества и поддержка.',
    className: 'forwhom__card_wholesale',
  },
  {
    title: 'Для дома и быта',
    text: 'Мастера-любители, дачники. Надёжный инструмент для дома по доступной цене.',
    className: 'forwhom__card_home',
  },
];

export function ForWhom() {
  return (
    <section className="section forwhom">
      <div className="container">
        <h2 className="section-title">Для кого</h2>
        <div className="forwhom__grid">
          {blocks.map((item, i) => (
            <article key={i} className={`forwhom__card ${item.className}`}>
              <h3 className="forwhom__card-title">{item.title}</h3>
              <p className="forwhom__card-text">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
