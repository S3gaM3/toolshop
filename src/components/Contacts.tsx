import { useState } from 'react';
import type { FormEvent } from 'react';

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

export function Contacts() {
  const [status, setStatus] = useState<SendStatus>('idle');
  const [errorText, setErrorText] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const officeAddressDisplay = '117519, г. Москва, Варшавское шоссе, д.148, каб. 402';
  // Coords are used to put an explicit pin on the building.
  // Source: open web directory listings for "Варшавское шоссе, 148" (may need уточнение под строение/корпус).
  const officeCoords = { lat: 55.60102, lon: 37.602526 };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    setErrorText('');
    setStatus('sending');

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      pageUrl: window.location.href,
      ts: new Date().toISOString(),
    };

    const endpoint =
      (import.meta.env.VITE_CP_FORM_ENDPOINT as string | undefined) ||
      (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined) ||
      '';

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      } else {
        // Static-site fallback: open prepared email
        const subject = `Запрос КП — ${payload.name || 'VERTEXTOOLS'}`;
        const body = [
          `Имя / компания: ${payload.name}`,
          `Телефон: ${payload.phone}`,
          `Email: ${payload.email}`,
          '',
          'Сообщение:',
          payload.message || '—',
          '',
          `Страница: ${payload.pageUrl}`,
          `Время: ${payload.ts}`,
        ].join('\n');

        const mailto = `mailto:sale@vertextools.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
      }

      setStatus('sent');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch {
      setStatus('error');
      setErrorText('Не удалось отправить запрос. Попробуйте ещё раз или свяжитесь с нами по телефону.');
    }
  };

  return (
    <section id="contacts" className="section contacts">
      <div className="container">
        <h2 className="section-title">Контакты</h2>
        <div className="contacts__grid">
          <div className="contacts__info">
            <h3>Офис</h3>
            <p className="contacts__address">
              {officeAddressDisplay}
            </p>
            <p className="contacts__legal">ООО «ВЕРТЕКС ИНСТРУМЕНТ»</p>
            <p>
              <a href="tel:+74951506057">+7 (495) 150-60-57</a>
            </p>
            <p>
              <a href="mailto:sale@vertextools.ru">sale@vertextools.ru</a>
            </p>
            <div className="contacts__map">
              <iframe
                title={`Карта: ${officeAddressDisplay}`}
                src={`https://yandex.ru/map-widget/v1/?ll=${officeCoords.lon},${officeCoords.lat}&z=16&pt=${officeCoords.lon},${officeCoords.lat},pm2rdm&l=map`}
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="contacts__map-link">
              <a
                href={`https://yandex.ru/maps/?ll=${officeCoords.lon},${officeCoords.lat}&z=16&pt=${officeCoords.lon},${officeCoords.lat}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Открыть в Яндекс Картах →
              </a>
            </p>
          </div>
          <div className="contacts__form-wrap">
            <h3>Запрос коммерческого предложения</h3>
            {status === 'sent' ? (
              <p className="contacts__success">
                Спасибо! Запрос принят. Мы свяжемся с вами в ближайшее время.
              </p>
            ) : (
              <form className="contacts__form" onSubmit={handleSubmit}>
                {status === 'error' ? <p className="contacts__error">{errorText}</p> : null}
                <label>
                  <span>Имя / компания</span>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                    disabled={status === 'sending'}
                  />
                </label>
                <label>
                  <span>Телефон</span>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                    disabled={status === 'sending'}
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                    disabled={status === 'sending'}
                  />
                </label>
                <label>
                  <span>Сообщение</span>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                    disabled={status === 'sending'}
                  />
                </label>
                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Отправляем…' : 'Отправить'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
