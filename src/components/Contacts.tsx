import { useState } from 'react';
import type { FormEvent } from 'react';

export function Contacts() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <section id="contacts" className="section contacts">
      <div className="container">
        <h2 className="section-title">Контакты</h2>
        <div className="contacts__grid">
          <div className="contacts__info">
            <h3>Склад и офис</h3>
            <p className="contacts__address">
              Московская область, г. Щербинка, ул. Южная, д. 10
            </p>
            <p className="contacts__legal">ООО «ВЕРТЕКС ИНСТРУМЕНТ»</p>
            <p>
              <a href="tel:+74951506057">+7 (495) 150-60-57</a>
            </p>
            <p>
              <a href="mailto:info@vertextools.ru">info@vertextools.ru</a>
            </p>
            <div className="contacts__map">
              <iframe
                title="Карта: Щербинка, Южная 10"
                src="https://yandex.ru/map-widget/v1/?ll=37.5119%2C55.4997&z=15&pt=37.5119,55.4997"
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="contacts__form-wrap">
            <h3>Запрос коммерческого предложения</h3>
            {sent ? (
              <p className="contacts__success">Спасибо! Ваш запрос отправлен. Мы свяжемся с вами в ближайшее время.</p>
            ) : (
              <form className="contacts__form" onSubmit={handleSubmit}>
                <label>
                  <span>Имя / компания</span>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                  />
                </label>
                <label>
                  <span>Телефон</span>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                  />
                </label>
                <label>
                  <span>Сообщение</span>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                  />
                </label>
                <button type="submit" className="btn btn-primary">Отправить</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
