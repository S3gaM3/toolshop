import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productSku?: string;
}

const REGIONS = [
  'Москва',
  'Санкт-Петербург',
  'Московская область',
  'Ленинградская область',
  'Новосибирская область',
  'Екатеринбург',
  'Казань',
  'Нижний Новгород',
  'Челябинск',
  'Самара',
  'Омск',
  'Ростов-на-Дону',
  'Уфа',
  'Красноярск',
  'Воронеж',
  'Пермь',
  'Волгоград',
  'Краснодар',
  'Саратов',
  'Тюмень',
  'Тольятти',
  'Ижевск',
  'Барнаул',
  'Ульяновск',
  'Иркутск',
  'Хабаровск',
  'Ярославль',
  'Владивосток',
  'Махачкала',
  'Томск',
  'Оренбург',
  'Кемерово',
  'Новокузнецк',
  'Рязань',
  'Астрахань',
  'Набережные Челны',
  'Пенза',
  'Киров',
  'Липецк',
  'Чебоксары',
  'Калининград',
  'Тула',
  'Курск',
  'Сочи',
  'Ставрополь',
  'Улан-Удэ',
  'Магнитогорск',
  'Архангельск',
  'Сургут',
  'Чита',
  'Смоленск',
  'Калуга',
  'Другой регион',
];

export function QuickOrderModal({ isOpen, onClose, productName, productSku }: QuickOrderModalProps) {
  const [status, setStatus] = useState<SendStatus>('idle');
  const [errorText, setErrorText] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', phone: '', region: '', comment: '' });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    setErrorText('');
    setStatus('sending');

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      region: formData.region.trim(),
      comment: formData.comment.trim(),
      productName: productName || '',
      productSku: productSku || '',
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
        const subject = `Купить в один клик — ${payload.productName || 'VERTEXTOOLS'}`;
        const body = [
          `Товар: ${payload.productName || '—'}`,
          `Артикул: ${payload.productSku || '—'}`,
          '',
          `Имя: ${payload.name}`,
          `Телефон: ${payload.phone}`,
          `Регион: ${payload.region}`,
          '',
          'Комментарий:',
          payload.comment || '—',
          '',
          `Страница: ${payload.pageUrl}`,
          `Время: ${payload.ts}`,
        ].join('\n');

        const mailto = `mailto:info@vertextools.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
      }

      setStatus('sent');
      setTimeout(() => {
        setFormData({ name: '', phone: '', region: '', comment: '' });
        setStatus('idle');
        onClose();
      }, 2000);
    } catch {
      setStatus('error');
      setErrorText('Не удалось отправить запрос. Попробуйте ещё раз или свяжитесь с нами по телефону.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="quick-order-modal" role="dialog" aria-modal="true" aria-labelledby="quick-order-title">
      <div className="quick-order-modal__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="quick-order-modal__content">
        <button
          type="button"
          className="quick-order-modal__close"
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>
        <h2 id="quick-order-title" className="quick-order-modal__title">Купить в один клик</h2>
        {productName && (
          <p className="quick-order-modal__product">
            <strong>{productName}</strong>
            {productSku && <span className="quick-order-modal__sku">Артикул: {productSku}</span>}
          </p>
        )}
        {status === 'sent' ? (
          <p className="quick-order-modal__success">
            Спасибо! Запрос принят. Мы свяжемся с вами в ближайшее время.
          </p>
        ) : (
          <form className="quick-order-modal__form" onSubmit={handleSubmit}>
            {status === 'error' ? <p className="quick-order-modal__error">{errorText}</p> : null}
            <label>
              <span>Имя</span>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                disabled={status === 'sending'}
              />
            </label>
            <label>
              <span>Телефон *</span>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                disabled={status === 'sending'}
                placeholder="+7 (___) ___-__-__"
              />
            </label>
            <label>
              <span>Регион: *</span>
              <select
                required
                value={formData.region}
                onChange={(e) => setFormData((d) => ({ ...d, region: e.target.value }))}
                disabled={status === 'sending'}
              >
                <option value="">не выбрано</option>
                {REGIONS.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Комментарий</span>
              <textarea
                rows={3}
                value={formData.comment}
                onChange={(e) => setFormData((d) => ({ ...d, comment: e.target.value }))}
                disabled={status === 'sending'}
                placeholder="Дополнительная информация..."
              />
            </label>
            <div className="quick-order-modal__actions">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={status === 'sending'}>
                Отмена
              </button>
              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Отправляем…' : 'Отправить'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
