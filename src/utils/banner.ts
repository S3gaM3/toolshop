const bannerModules = import.meta.glob('../assets/banners/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const PREFERRED_BANNER_FILENAME = 'баннеры_1920х400_сайт_4.webp';

export function pickPreferredBannerUrl(): string | null {
  const entries = Object.entries(bannerModules).filter(([, url]) => Boolean(url));

  const preferred = entries.find(([key]) => key.includes(PREFERRED_BANNER_FILENAME));
  if (preferred) return preferred[1];

  // Stable fallback: pick first by filename
  entries.sort(([a], [b]) => a.localeCompare(b, 'ru'));
  return entries.length > 0 ? entries[0][1] : null;
}

