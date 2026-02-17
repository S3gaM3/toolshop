import { pickPreferredBannerUrl } from '../utils/banner';

export function TopBanner({ variant = 'page' }: { variant?: 'page' | 'inline' }) {
  const bannerUrl = pickPreferredBannerUrl();
  if (!bannerUrl) return null;

  const content = (
    <div className="top-banner__frame">
      <img
        className="top-banner__img"
        src={bannerUrl}
        alt="Промо-баннер VERTEXTOOLS"
        loading="eager"
      />
    </div>
  );

  if (variant === 'inline') {
    return (
      <div className="top-banner top-banner--inline" aria-label="Промо-баннер">
        {content}
      </div>
    );
  }

  return (
    <section className="top-banner" aria-label="Промо-баннер">
      <div className="container">{content}</div>
    </section>
  );
}

