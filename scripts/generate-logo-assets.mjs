/* --------------------------------------------------------------------------
   Derive the web display assets from the firm's logo master.

   The master supplied by the firm is a 500 x 135 CMYK JPEG built for print:

     public/images/Robinson-Franzman-Logo-Black-Green-500px-wide-135-tall-150dpi.jpg

   That file is never modified. A CMYK JPEG cannot carry transparency and is
   rendered inconsistently across browsers, so this script produces two sRGB
   PNG lockups that the site actually ships:

     public/images/logo/rf-logo.png            positive — for paper surfaces
     public/images/logo/rf-logo-reversed.png   knockout — for dark surfaces

   Nothing about the artwork is redrawn. Both outputs are pixel-for-pixel the
   master, at the master's own resolution and aspect ratio, with two changes:

     1. The white printing stock is converted to transparency, so the lockup
        sits on --paper / --surface-dark instead of on a white rectangle, and
        the ~5px of empty margin is trimmed to the artwork's true bounds.
     2. In the knockout, ink that is black in the master is rendered in
        --on-dark (#f3f1ec). The green rule keeps its measured brand value.

   Run with:  node scripts/generate-logo-assets.mjs

   `sharp` arrives with Next's image optimizer; it is not a direct dependency.
   The generated PNGs are committed, so this only needs re-running if the firm
   supplies new master artwork.
   -------------------------------------------------------------------------- */

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(
  root,
  'public/images/Robinson-Franzman-Logo-Black-Green-500px-wide-135-tall-150dpi.jpg'
);
const OUT_DIR = path.join(root, 'public/images/logo');

/* Measured off the master, not guessed. See the script's commit message. */
const BRAND_GREEN = [40, 166, 73]; // solid core of the vertical rule
const ON_DARK = [243, 241, 236]; // --on-dark
/** Ink coverage of the solid green core: 1 - 40/255. Used to normalise the
 *  rule back to full opacity so it stays vivid on a dark surface. */
const GREEN_COVERAGE = 1 - Math.min(...BRAND_GREEN) / 255;
/** Below this, a pixel is JPEG ringing around a stroke, not artwork. */
const ALPHA_FLOOR = 6;

/**
 * Undo the master's white paper.
 *
 * Every pixel in the master is ink laid over white: s = c·a + 255·(1 - a).
 * Coverage `a` is recoverable as 1 - min(r,g,b)/255, and unpremultiplying by it
 * returns the ink's own colour `c`. Unpremultiplying first matters: it makes the
 * hue stable regardless of coverage, so a 40%-covered antialiased edge of the
 * green rule classifies as green just as reliably as its solid core does.
 */
function separate(r, g, b) {
  const a = 1 - Math.min(r, g, b) / 255;
  if (a <= 0) return null;
  const base = 255 * (1 - a);
  return {
    a,
    c: [(r - base) / a, (g - base) / a, (b - base) / a],
  };
}

const isGreen = ([r, g, b]) => g - r > 60 && g - b > 60;

async function build() {
  const { data, info } = await sharp(SRC)
    .toColorspace('srgb')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: W, height: H, channels: C } = info;
  const positive = Buffer.alloc(W * H * 4);
  const reversed = Buffer.alloc(W * H * 4);

  // Artwork bounds, so the master's empty margin can be trimmed exactly.
  let minX = W, minY = H, maxX = -1, maxY = -1;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * C;
      const o = (y * W + x) * 4;
      const sep = separate(data[i], data[i + 1], data[i + 2]);
      if (!sep) continue;

      const alpha = Math.round(sep.a * 255);
      if (alpha < ALPHA_FLOOR) continue;

      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;

      // Positive: the master's own ink, straight, over transparency. Composited
      // on any light surface this reproduces the master exactly.
      positive[o] = Math.round(Math.min(255, Math.max(0, sep.c[0])));
      positive[o + 1] = Math.round(Math.min(255, Math.max(0, sep.c[1])));
      positive[o + 2] = Math.round(Math.min(255, Math.max(0, sep.c[2])));
      positive[o + 3] = alpha;

      // Knockout: black ink becomes --on-dark; the rule keeps its brand green,
      // renormalised to full opacity at the core so it does not dim on dark.
      if (isGreen(sep.c)) {
        reversed[o] = BRAND_GREEN[0];
        reversed[o + 1] = BRAND_GREEN[1];
        reversed[o + 2] = BRAND_GREEN[2];
        reversed[o + 3] = Math.round(Math.min(1, sep.a / GREEN_COVERAGE) * 255);
      } else {
        reversed[o] = ON_DARK[0];
        reversed[o + 1] = ON_DARK[1];
        reversed[o + 2] = ON_DARK[2];
        reversed[o + 3] = alpha;
      }
    }
  }

  const box = {
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };

  await mkdir(OUT_DIR, { recursive: true });

  const write = (buf, file) =>
    sharp(buf, { raw: { width: W, height: H, channels: 4 } })
      .extract(box)
      .png({ compressionLevel: 9, palette: false })
      .toFile(path.join(OUT_DIR, file));

  await write(positive, 'rf-logo.png');
  await write(reversed, 'rf-logo-reversed.png');

  const ratio = (box.width / box.height).toFixed(4);
  console.log(`master     ${W} x ${H}`);
  console.log(`trimmed to ${box.width} x ${box.height} at (${box.left}, ${box.top})`);
  console.log(`aspect     ${ratio}:1`);
  console.log('wrote      public/images/logo/rf-logo.png');
  console.log('wrote      public/images/logo/rf-logo-reversed.png');
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
