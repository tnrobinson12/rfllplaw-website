import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { site, logo } from '@/content/site';

export const alt = `${site.name} — Atlanta business, real estate and finance counsel`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* The card is drawn on --surface-dark, so it carries the knockout lockup.
   Satori has no network access, so the PNG is inlined at build time. */
const LOGO_SCALE = 1.2;
const LOGO_W = Math.round(logo.width * LOGO_SCALE);
const LOGO_H = Math.round(logo.height * LOGO_SCALE);

async function inlineLogo() {
  const file = await readFile(path.join(process.cwd(), 'public', logo.reversed));
  return `data:image/png;base64,${file.toString('base64')}`;
}

/**
 * Default social card, generated at build time. Individual routes can override
 * this by adding their own opengraph-image file.
 */
export default async function OpenGraphImage() {
  const logoSrc = await inlineLogo();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#101314',
          color: '#f3f1ec',
          padding: '72px 80px',
          fontFamily: 'serif',
        }}
      >
        {/* Rule + eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 56, height: 1, background: '#c19a5c' }} />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#c19a5c',
              fontFamily: 'sans-serif',
            }}
          >
            Atlanta, Georgia
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={LOGO_W} height={LOGO_H} alt={site.name} />
          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              lineHeight: 1.35,
              color: '#a7ada9',
              maxWidth: 880,
              fontFamily: 'sans-serif',
            }}
          >
            Counsel for complex transactions, investments and disputes.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(243,241,236,0.2)',
            paddingTop: 26,
            fontSize: 22,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: '#a7ada9',
            fontFamily: 'sans-serif',
          }}
        >
          <div style={{ display: 'flex' }}>Real Estate · Capital · Finance · Disputes</div>
          <div style={{ display: 'flex' }}>{site.domain}</div>
        </div>
      </div>
    ),
    size
  );
}
