/** Базовый путь для GitHub Pages (например /toolshop). Используется для якорных ссылок. */
export function getBase(): string {
  const base = import.meta.env.BASE_URL;
  return base.endsWith('/') ? base.slice(0, -1) : base;
}
