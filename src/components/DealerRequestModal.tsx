import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

interface DealerRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DealerRequestModal({ isOpen, onClose }: DealerRequestModalProps) {
  const [status, setStatus] = useState<SendStatus>('idle');
  const [errorText, setErrorText] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

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

        const mailto = `mailto:info@vertextools.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
      }

      setStatus('sent');
      setTimeout(() => {
        setFormData({ name: '', phone: '', email: '', message: '' });
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
    <div className="dealer-request-modal" role="dialog" aria-modal="true" aria-labelledby="dealer-request-title">
      <div className="dealer-request-modal__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="dealer-request-modal__content">
        <button
          type="button"
          className="dealer-request-modal__close"
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>
        <h2 id="dealer-request-title" className="dealer-request-modal__title">Запрос коммерческого предложения</h2>
        {status === 'sent' ? (
          <p className="dealer-request-modal__success">
            Спасибо! Запрос принят. Мы свяжемся с вами в ближайшее время.
          </p>
        ) : (
          <form className="dealer-request-modal__form" onSubmit={handleSubmit}>
            {status === 'error' ? <p className="dealer-request-modal__error">{errorText}</p> : null}
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
                placeholder="+7 (___) ___-__-__"
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
                placeholder="Дополнительная информация..."
              />
            </label>
            <div className="dealer-request-modal__actions">
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
