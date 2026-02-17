/**
 * Структура данных контента сайта для CMS
 */

export interface HeroContent {
  title: string;
  subtitle: string;
  buttonCatalog: string;
  buttonDealer: string;
}

export interface AboutContent {
  paragraphs: string[];
  facts: Array<{ value: string; label: string }>;
}

export interface AdvantageItem {
  title: string;
  text: string;
  icon: string;
  gradient: string;
}

export interface AdvantagesContent {
  title: string;
  subtitle: string;
  items: AdvantageItem[];
}

export interface ForWhomItem {
  title: string;
  text: string;
  className: string;
}

export interface ForWhomContent {
  title: string;
  items: ForWhomItem[];
}

export interface Review {
  quote: string;
  author: string;
}

export interface ReviewsContent {
  title: string;
  items: Review[];
}

export interface CtaContent {
  title: string;
  text: string;
  buttonText: string;
}

export interface FooterContent {
  tagline: string;
  about: string;
  columns: Array<{
    title: string;
    links: Array<{ text: string; url: string }>;
  }>;
  copyright: string;
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  advantages: AdvantagesContent;
  forWhom: ForWhomContent;
  reviews: ReviewsContent;
  cta: CtaContent;
  footer: FooterContent;
}

/**
 * Дефолтный контент сайта
 */
export const defaultContent: SiteContent = {
  hero: {
    title: 'Ваш надёжный партнёр в мире инструментов.',
    subtitle: 'Оптовые и розничные поставки сертифицированного инструмента собственной торговой марки по всей России и СНГ.',
    buttonCatalog: 'Перейти в каталог',
    buttonDealer: 'Стать дилером',
  },
  about: {
    paragraphs: [
      'Компания «VERTEXTOOLS» работает на рынке с <strong>2010 года</strong>. Основное направление — оптовая и розничная торговля ручным строительным инструментом и расходными материалами.',
      'За годы работы мы завоевали доверие покупателей и зарекомендовали себя как надёжный поставщик импортного инструмента для профессионального и бытового применения. Товар импортируется от прямых производителей; торговля ведётся на рынках России и стран Таможенного союза.',
      'Качество продукции соответствует российским требованиям <strong>ГОСТ</strong>; предприятия-производители прошли сертификацию <strong>ISO 9001 и ISO 9002</strong>. Каждое изделие под торговой маркой VERTEXTOOLS проходит контроль качества. Цена продукции конкурентоспособна и выгодна для покупателей. Ассортимент ежегодно обновляется; на складе постоянное наполнение, товар категории «А» — 95%.',
      'Доставка осуществляется по Москве и МО, а также до транспортной компании по выбору клиента. Оформить заказ можно на сайте или через менеджера; специалисты оперативно консультируют по наличию и условиям.',
    ],
    facts: [
      { value: '12+', label: 'лет на рынке' },
      { value: 'Собственная ТМ', label: 'зарегистрирована в 2023 году' },
      { value: 'ГОСТ и ISO 9001', label: 'сертификация продукции' },
      { value: 'РФ и СНГ', label: 'сеть дистрибуции' },
      { value: '15+', label: 'товарных знаков в портфеле' },
    ],
  },
  advantages: {
    title: 'Наши преимущества',
    subtitle: 'Почему выбирают VERTEXTOOLS',
    items: [
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
    ],
  },
  forWhom: {
    title: 'Для кого',
    items: [
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
    ],
  },
  reviews: {
    title: 'Отзывы',
    items: [
      {
        quote: 'Отличное качество инструмента, работаем с VERTEXTOOLS уже несколько лет. Никаких нареканий.',
        author: 'Иван Петров, прораб',
      },
      {
        quote: 'Быстрая доставка, хорошие цены. Рекомендую для оптовых закупок.',
        author: 'Мария Сидорова, директор магазина',
      },
      {
        quote: 'Качественный инструмент по разумной цене. Заказываю регулярно для домашних работ.',
        author: 'Алексей Козлов',
      },
    ],
  },
  cta: {
    title: 'Готовы начать сотрудничество?',
    text: 'Свяжитесь с нами для получения коммерческого предложения и консультации.',
    buttonText: 'Оставить заявку',
  },
  footer: {
    tagline: 'Надёжный инструмент для профессионалов',
    about: 'VERTEXTOOLS — поставщик качественного ручного инструмента и расходных материалов с 2010 года.',
    columns: [
      {
        title: 'Каталог',
        links: [
          { text: 'Ручной инструмент', url: '/catalog/hand-tools' },
          { text: 'Расходные материалы', url: '/catalog/consumables' },
          { text: 'Оснастка', url: '/catalog/power-tool-accessories' },
        ],
      },
      {
        title: 'Компания',
        links: [
          { text: 'О компании', url: '/#about' },
          { text: 'Преимущества', url: '/#advantages' },
          { text: 'Контакты', url: '/#contacts' },
        ],
      },
      {
        title: 'Информация',
        links: [
          { text: 'Отзывы', url: '/reviews' },
          { text: 'Политика конфиденциальности', url: '/privacy' },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} VERTEXTOOLS. Все права защищены.`,
  },
};
