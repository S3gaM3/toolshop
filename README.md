# VERTEXTOOLS

Корпоративный сайт: ручной инструмент и расходные материалы.

```bash
npm install
npm run dev
```

Сборка: `npm run build`. Публикация: Settings → Pages → источник **GitHub Actions**; сайт — `https://<username>.github.io/toolshop/`.

Синхронизация каталога с vertextools.ru: `npm run fetch-catalog` (результат в `src/data/products-from-vertextools.json`). Для быстрой проверки: `LIMIT=30 npm run fetch-catalog` (первые 30 категорий).
