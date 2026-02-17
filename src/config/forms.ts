/**
 * Конфигурация для форм на сайте
 * 
 * Настройки отправки данных из форм:
 * - Запрос коммерческого предложения (Contacts)
 * - Стать дилером (DealerRequestModal)
 * - Купить в один клик (QuickOrderModal)
 */

export interface FormConfig {
  /** API endpoint для отправки данных формы (приоритет 1) */
  endpoint?: string;
  
  /** Альтернативный endpoint (приоритет 2) */
  alternativeEndpoint?: string;
  
  /** Email для fallback (mailto) если endpoint не настроен */
  fallbackEmail: string;
  
  /** Таймаут запроса в миллисекундах */
  timeout?: number;
}

/**
 * Получить конфигурацию формы
 * 
 * Приоритет endpoint:
 * 1. VITE_CP_FORM_ENDPOINT (основной endpoint)
 * 2. VITE_FORMSPREE_ENDPOINT (альтернативный endpoint)
 * 3. Fallback на mailto с указанным email
 */
export function getFormConfig(): FormConfig {
  return {
    endpoint: import.meta.env.VITE_CP_FORM_ENDPOINT as string | undefined,
    alternativeEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined,
    fallbackEmail: 'sale@vertextools.ru',
    timeout: 10000, // 10 секунд
  };
}

/**
 * Получить активный endpoint для отправки формы
 * Возвращает первый доступный endpoint или null
 */
export function getFormEndpoint(): string | null {
  const config = getFormConfig();
  return config.endpoint || config.alternativeEndpoint || null;
}

/**
 * Отправить данные формы
 * 
 * @param payload - данные формы
 * @param subjectPrefix - префикс для темы письма (для fallback)
 * @returns Promise с результатом отправки
 */
export async function submitForm(
  payload: Record<string, unknown>,
  subjectPrefix: string = 'Запрос'
): Promise<{ success: boolean; error?: string }> {
  const config = getFormConfig();
  const endpoint = getFormEndpoint();

  if (endpoint) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.timeout);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Неизвестная ошибка';
      return { success: false, error: errorMessage };
    }
  } else {
    // Fallback: открыть mailto
    const subject = `${subjectPrefix} — ${(payload.name as string) || 'VERTEXTOOLS'}`;
    const body = Object.entries(payload)
      .filter(([key]) => key !== 'pageUrl' && key !== 'ts')
      .map(([key, value]) => {
        const label = getFieldLabel(key);
        return `${label}: ${value || '—'}`;
      })
      .concat(
        '',
        `Страница: ${payload.pageUrl || window.location.href}`,
        `Время: ${payload.ts || new Date().toISOString()}`
      )
      .join('\n');

    const mailto = `mailto:${config.fallbackEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    return { success: true };
  }
}

/**
 * Получить читаемое название поля для письма
 */
function getFieldLabel(key: string): string {
  const labels: Record<string, string> = {
    name: 'Имя / компания',
    phone: 'Телефон',
    email: 'Email',
    message: 'Сообщение',
    comment: 'Комментарий',
    region: 'Регион',
    productName: 'Товар',
    productSku: 'Артикул',
  };
  return labels[key] || key;
}
