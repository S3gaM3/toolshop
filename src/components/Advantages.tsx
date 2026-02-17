const items = [
  {
    title: 'Качество',
    text: 'Продукция сертифицирована. Соответствие ГОСТ и ISO 9001.',
    icon: '✓',
    gradient: 'linear-gradient(135deg, #00B8E6 0%, #0099CC 100%)',
  },
  {
    title: 'Цена',
    text: 'Прямые поставки от производителей. Оптимальное соотношение цены и качества.',
    icon: '₽',
    gradient: 'linear-gradient(135deg, #C05621 0%, #A0451A 100%)',
  },
  {
    title: 'Ассортимент',
    text: 'Широкий выбор инструмента для профессионального и бытового применения.',
    icon: '▦',
    gradient: 'linear-gradient(135deg, #0A1F3A 0%, #050A14 100%)',
  },
  {
    title: 'Надёжность',
    text: 'Собственный склад в Москве (г. Щербинка) и отлаженная логистика по всей России.',
    icon: '◉',
    gradient: 'linear-gradient(135deg, #00B8E6 0%, #0099CC 100%)',
  },
  {
    title: 'Опыт',
    text: 'Более 10 лет успешной работы на рынке.',
    icon: '★',
    gradient: 'linear-gradient(135deg, #C05621 0%, #A0451A 100%)',
  },
];

export function Advantages() {
  return (
    <section id="advantages" className="section advantages">
      <div className="container">
        <div className="advantages__header">
          <h2 className="section-title">
            <span>Наши</span> преимущества
          </h2>
          <p className="advantages__subtitle">Почему выбирают VERTEXTOOLS</p>
        </div>
        <ul className="advantages__list">
          {items.map((item, i) => (
            <li key={i} className="advantages__item">
              <div className="advantages__icon-wrap">
                <span 
                  className="advantages__icon" 
                  aria-hidden="true"
                  style={{ background: item.gradient }}
                >
                  {item.icon}
                </span>
              </div>
              <h3 className="advantages__title">{item.title}</h3>
              <p className="advantages__text">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
