import type { ReactElement } from 'react';

/* --------------------------------------------------------------------------
   Original generated artwork

   These compositions are abstract architectural studies drawn entirely in SVG.
   They stand in for licensed photography, weigh under 3 KB each, scale to any
   viewport, and require no network request.

   To replace one with a photograph, pass an `src` to <Figure> — the artwork is
   only rendered when no image is supplied.
   -------------------------------------------------------------------------- */

export type ArtworkVariant =
  | 'facade'
  | 'tower'
  | 'grid'
  | 'aperture'
  | 'strata'
  | 'lattice'
  | 'hero'
  | 'skyline'
  | 'portrait-a'
  | 'portrait-b'
  | 'portrait-c'
  | 'portrait-d';

type Props = {
  variant?: ArtworkVariant;
  /** Rendered as a small corner tag, e.g. "Artwork — replace with photography". */
  tag?: string;
  className?: string;
};

const INK = '#101314';
const INK_2 = '#1b2022';
const INK_3 = '#262c2e';
const BRASS = '#8a6a38';
const BRASS_LIGHT = '#c19a5c';
const PAPER = '#e9e5db';

/* ---- Composition builders ------------------------------------------------ */

function Facade() {
  // Receding curtain wall: vertical mullions with a modulated window rhythm.
  const bays = Array.from({ length: 22 }, (_, i) => i);
  const floors = Array.from({ length: 16 }, (_, i) => i);

  return (
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" role="presentation">
      <defs>
        <linearGradient id="fa-sky" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#22282a" />
          <stop offset="100%" stopColor={INK} />
        </linearGradient>
        <linearGradient id="fa-light" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor={BRASS_LIGHT} stopOpacity="0.24" />
          <stop offset="55%" stopColor={BRASS} stopOpacity="0.05" />
          <stop offset="100%" stopColor={INK} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#fa-sky)" />
      <g transform="skewY(-6) translate(0 90)">
        {floors.map((f) =>
          bays.map((b) => {
            const lit = (b * 7 + f * 3) % 11 < 3;
            return (
              <rect
                key={`${f}-${b}`}
                x={b * 56 + 8}
                y={f * 46}
                width={44}
                height={34}
                fill={lit ? BRASS_LIGHT : PAPER}
                opacity={lit ? 0.16 + ((b + f) % 4) * 0.04 : 0.035 + ((b * f) % 5) * 0.008}
              />
            );
          })
        )}
      </g>
      <g stroke={PAPER} strokeOpacity="0.09" strokeWidth="1">
        {bays.map((b) => (
          <line key={b} x1={b * 56} y1="0" x2={b * 56 - 90} y2="800" />
        ))}
      </g>
      <rect width="1200" height="800" fill="url(#fa-light)" />
    </svg>
  );
}

function Tower() {
  // Overlapping vertical masses — massing study.
  const masses = [
    { x: 60, w: 190, y: 260 },
    { x: 235, w: 150, y: 150 },
    { x: 370, w: 230, y: 330 },
    { x: 585, w: 165, y: 90 },
    { x: 735, w: 205, y: 240 },
    { x: 925, w: 140, y: 180 },
    { x: 1050, w: 175, y: 300 },
  ];

  return (
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" role="presentation">
      <defs>
        <linearGradient id="tw-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#252b2d" />
          <stop offset="100%" stopColor={INK} />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#tw-bg)" />
      {masses.map((m, i) => (
        <g key={i}>
          <rect
            x={m.x}
            y={m.y}
            width={m.w}
            height={800 - m.y}
            fill={i % 2 === 0 ? INK_2 : INK_3}
            opacity={0.92}
          />
          <rect x={m.x} y={m.y} width={m.w} height="2" fill={PAPER} opacity={0.16} />
          {Array.from({ length: Math.floor((800 - m.y) / 38) }, (_, f) => (
            <line
              key={f}
              x1={m.x}
              y1={m.y + 30 + f * 38}
              x2={m.x + m.w}
              y2={m.y + 30 + f * 38}
              stroke={PAPER}
              strokeOpacity={0.06}
              strokeWidth="1"
            />
          ))}
        </g>
      ))}
      <line x1="0" y1="92" x2="1200" y2="92" stroke={BRASS} strokeOpacity="0.5" strokeWidth="1" />
    </svg>
  );
}

function Grid() {
  const cols = 16;
  const rows = 11;
  const cells: { c: number; r: number; fill: string; op: number }[] = [];

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const seed = (c * 13 + r * 29) % 17;
      if (seed < 3) cells.push({ c, r, fill: BRASS, op: 0.4 - seed * 0.08 });
      else if (seed < 6) cells.push({ c, r, fill: PAPER, op: 0.07 });
    }
  }

  return (
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" role="presentation">
      <rect width="1200" height="800" fill={INK} />
      {cells.map((cell, i) => (
        <rect
          key={i}
          x={cell.c * 75}
          y={cell.r * 73}
          width={75}
          height={73}
          fill={cell.fill}
          opacity={cell.op}
        />
      ))}
      <g stroke={PAPER} strokeOpacity="0.1" strokeWidth="1">
        {Array.from({ length: cols + 1 }, (_, i) => (
          <line key={`v${i}`} x1={i * 75} y1="0" x2={i * 75} y2="800" />
        ))}
        {Array.from({ length: rows + 1 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 73} x2="1200" y2={i * 73} />
        ))}
      </g>
    </svg>
  );
}

function Aperture() {
  return (
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" role="presentation">
      <defs>
        <radialGradient id="ap-glow" cx="0.62" cy="0.34" r="0.62">
          <stop offset="0%" stopColor={BRASS_LIGHT} stopOpacity="0.34" />
          <stop offset="60%" stopColor={BRASS} stopOpacity="0.06" />
          <stop offset="100%" stopColor={INK} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill={INK} />
      <rect width="1200" height="800" fill="url(#ap-glow)" />
      <g fill="none" stroke={PAPER} strokeOpacity="0.16">
        {[130, 210, 290, 370, 450].map((r, i) => (
          <circle key={r} cx="744" cy="272" r={r} strokeWidth={i === 1 ? 1.5 : 1} />
        ))}
      </g>
      <g stroke={PAPER} strokeOpacity="0.1" strokeWidth="1">
        {Array.from({ length: 13 }, (_, i) => (
          <line key={i} x1="0" y1={i * 66 + 60} x2="1200" y2={i * 66 - 40} />
        ))}
      </g>
      <circle cx="744" cy="272" r="130" fill={INK} opacity="0.55" />
      <circle cx="744" cy="272" r="130" fill="none" stroke={BRASS} strokeOpacity="0.75" strokeWidth="1.5" />
    </svg>
  );
}

function Strata() {
  // Horizontal bands — a capital stack read as architecture.
  const bands = [
    { h: 168, fill: INK_3, op: 1 },
    { h: 96, fill: BRASS, op: 0.32 },
    { h: 142, fill: INK_2, op: 1 },
    { h: 58, fill: BRASS, op: 0.16 },
    { h: 122, fill: INK_3, op: 1 },
    { h: 84, fill: PAPER, op: 0.06 },
    { h: 130, fill: INK_2, op: 1 },
  ];

  let y = 0;

  return (
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" role="presentation">
      <rect width="1200" height="800" fill={INK} />
      {bands.map((band, i) => {
        const top = y;
        y += band.h;
        return (
          <g key={i}>
            <rect x="0" y={top} width="1200" height={band.h} fill={band.fill} opacity={band.op} />
            <line x1="0" y1={top} x2="1200" y2={top} stroke={PAPER} strokeOpacity="0.14" strokeWidth="1" />
          </g>
        );
      })}
      <g stroke={PAPER} strokeOpacity="0.07" strokeWidth="1">
        {Array.from({ length: 15 }, (_, i) => (
          <line key={i} x1={i * 86 + 40} y1="0" x2={i * 86 + 40} y2="800" />
        ))}
      </g>
      <line x1="0" y1="168" x2="1200" y2="168" stroke={BRASS_LIGHT} strokeOpacity="0.65" strokeWidth="1.5" />
    </svg>
  );
}

function Lattice() {
  return (
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" role="presentation">
      <rect width="1200" height="800" fill={INK} />
      <g stroke={PAPER} strokeOpacity="0.13" strokeWidth="1">
        {Array.from({ length: 26 }, (_, i) => (
          <line key={`a${i}`} x1={i * 96 - 800} y1="0" x2={i * 96} y2="800" />
        ))}
        {Array.from({ length: 26 }, (_, i) => (
          <line key={`b${i}`} x1={i * 96} y1="0" x2={i * 96 - 800} y2="800" />
        ))}
      </g>
      <g stroke={BRASS} strokeOpacity="0.55" strokeWidth="1.5">
        <line x1="180" y1="0" x2="980" y2="800" />
        <line x1="1020" y1="0" x2="220" y2="800" />
      </g>
      <g fill={PAPER} fillOpacity="0.08">
        <rect x="384" y="248" width="96" height="304" />
        <rect x="672" y="152" width="96" height="400" />
      </g>
    </svg>
  );
}

function Hero() {
  const bays = Array.from({ length: 14 }, (_, i) => i);

  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" role="presentation">
      <defs>
        <linearGradient id="hr-sky" x1="0.1" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#2c3336" />
          <stop offset="45%" stopColor="#1b2123" />
          <stop offset="100%" stopColor="#0c0e0f" />
        </linearGradient>
        <linearGradient id="hr-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={BRASS_LIGHT} stopOpacity="0.2" />
          <stop offset="48%" stopColor={PAPER} stopOpacity="0.05" />
          <stop offset="100%" stopColor={INK} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hr-mass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#171c1e" />
          <stop offset="100%" stopColor="#0d1011" />
        </linearGradient>
      </defs>

      <rect width="1600" height="1000" fill="url(#hr-sky)" />

      {/* Distant massing */}
      <g opacity="0.55">
        <rect x="40" y="470" width="210" height="530" fill="#161b1d" />
        <rect x="270" y="392" width="150" height="608" fill="#121718" />
        <rect x="1180" y="430" width="190" height="570" fill="#141a1b" />
        <rect x="1390" y="510" width="180" height="490" fill="#111516" />
      </g>

      {/* Primary tower — receding curtain wall */}
      <g transform="translate(430 0)">
        <path d="M0 236 L520 118 L520 1000 L0 1000 Z" fill="url(#hr-mass)" />
        {Array.from({ length: 20 }, (_, f) => (
          <path
            key={f}
            d={`M0 ${268 + f * 38} L520 ${150 + f * 38}`}
            stroke={PAPER}
            strokeOpacity="0.075"
            strokeWidth="1"
            fill="none"
          />
        ))}
        {bays.map((b) => (
          <path
            key={b}
            d={`M${b * 40} ${236 + b * 9} L${b * 40} 1000`}
            stroke={PAPER}
            strokeOpacity="0.06"
            strokeWidth="1"
            fill="none"
          />
        ))}
        {Array.from({ length: 18 }, (_, f) =>
          bays.map((b) => {
            const lit = (b * 5 + f * 7) % 13 < 3;
            if (!lit) return null;
            return (
              <rect
                key={`${f}-${b}`}
                x={b * 40 + 4}
                y={252 + f * 38 - b * 8.2}
                width={32}
                height={26}
                fill={BRASS_LIGHT}
                opacity={0.1 + ((b + f) % 4) * 0.045}
              />
            );
          })
        )}
        <path d="M0 236 L520 118" stroke={PAPER} strokeOpacity="0.28" strokeWidth="1.5" fill="none" />
      </g>

      {/* Foreground edge — a nearer facade cropping the frame */}
      <g>
        <path d="M1080 0 L1600 0 L1600 1000 L1180 1000 Z" fill="#0a0c0d" opacity="0.94" />
        {Array.from({ length: 24 }, (_, f) => (
          <path
            key={f}
            d={`M${1080 + f * 2} ${f * 44} L1600 ${f * 44 - 60}`}
            stroke={PAPER}
            strokeOpacity="0.045"
            strokeWidth="1"
            fill="none"
          />
        ))}
        <path d="M1080 0 L1180 1000" stroke={BRASS} strokeOpacity="0.42" strokeWidth="1.5" fill="none" />
      </g>

      <rect width="1600" height="1000" fill="url(#hr-glass)" />
    </svg>
  );
}

function Skyline() {
  const blocks = [
    [0, 560, 120],
    [126, 430, 90],
    [222, 620, 140],
    [368, 340, 110],
    [484, 500, 130],
    [620, 260, 96],
    [722, 470, 150],
    [878, 380, 104],
    [988, 560, 128],
    [1122, 440, 78],
  ] as const;

  return (
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" role="presentation">
      <defs>
        <linearGradient id="sk-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a3134" />
          <stop offset="100%" stopColor={INK} />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#sk-bg)" />
      <line x1="0" y1="240" x2="1200" y2="240" stroke={BRASS} strokeOpacity="0.35" strokeWidth="1" />
      {blocks.map(([x, y, w], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={800 - y} fill={i % 2 ? INK_2 : INK_3} />
          <rect x={x} y={y} width={w} height="1.5" fill={PAPER} opacity="0.18" />
        </g>
      ))}
    </svg>
  );
}

function PortraitPlaceholder({ variant }: { variant: string }) {
  const tone = { 'portrait-a': 0, 'portrait-b': 1, 'portrait-c': 2, 'portrait-d': 3 }[variant] ?? 0;
  const bg = ['#e6e2d8', '#dfdbd0', '#e9e5db', '#dcd8cd'][tone];
  const fg = ['#c3bcac', '#bab3a2', '#cac3b3', '#b6af9e'][tone];

  return (
    <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" role="presentation">
      <rect width="800" height="1000" fill={bg} />
      <g stroke={fg} strokeOpacity="0.55" strokeWidth="1" fill="none">
        {Array.from({ length: 20 }, (_, i) => (
          <line key={i} x1="0" y1={i * 52 + 26} x2="800" y2={i * 52 + 26} />
        ))}
      </g>
      {/* Abstract figure mass — deliberately non-representational */}
      <path d="M400 300 c 96 0 132 74 132 146 0 58 -34 106 -70 128 l 0 26 c 96 26 178 92 178 200 l -480 0 c 0 -108 82 -174 178 -200 l 0 -26 c -36 -22 -70 -70 -70 -128 0 -72 36 -146 132 -146 z"
        fill={fg}
        fillOpacity="0.75"
      />
      <rect x="0" y="0" width="800" height="1000" fill={BRASS} opacity="0.03" />
    </svg>
  );
}

/* ---- Dispatcher ---------------------------------------------------------- */

export function Artwork({ variant = 'facade', tag, className }: Props) {
  let composition: ReactElement;

  switch (variant) {
    case 'tower':
      composition = <Tower />;
      break;
    case 'grid':
      composition = <Grid />;
      break;
    case 'aperture':
      composition = <Aperture />;
      break;
    case 'strata':
      composition = <Strata />;
      break;
    case 'lattice':
      composition = <Lattice />;
      break;
    case 'hero':
      composition = <Hero />;
      break;
    case 'skyline':
      composition = <Skyline />;
      break;
    case 'portrait-a':
    case 'portrait-b':
    case 'portrait-c':
    case 'portrait-d':
      composition = <PortraitPlaceholder variant={variant} />;
      break;
    default:
      composition = <Facade />;
  }

  return (
    <div className={['artwork', className].filter(Boolean).join(' ')} aria-hidden="true">
      {composition}
      {tag ? <span className="artwork__tag">{tag}</span> : null}
    </div>
  );
}
