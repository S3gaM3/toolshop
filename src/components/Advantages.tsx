const items = [
  {
    title: 'Качество',
    text: 'Продукция сертифицирована. Соответствие ГОСТ и ISO 9001.',
    icon: '✓',
  },
  {
    title: 'Цена',
    text: 'Прямые поставки от производителей. Оптимальное соотношение цены и качества.',
    icon: '₽',
  },
  {
    title: 'Ассортимент',
    text: 'Широкий выбор инструмента для профессионального и бытового применения.',
    icon: '▦',
  },
  {
    title: 'Надёжность',
    text: 'Собственный склад в Москве (г. Щербинка) и отлаженная логистика по всей России.',
    icon: '◉',
  },
  {
    title: 'Опыт',
    text: 'Более 10 лет успешной работы на рынке.',
    icon: '★',
  },
];

export function Advantages() {
  return (
    <section id="advantages" className="section advantages">
      <div className="container">
        <h2 className="section-title">Наши преимущества</h2>
        <ul className="advantages__list">
          {items.map((item, i) => (
            <li key={i} className="advantages__item">
              <span className="advantages__icon" aria-hidden="true">{item.icon}</span>
              <h3 className="advantages__title">{item.title}</h3>
              <p className="advantages__text">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
