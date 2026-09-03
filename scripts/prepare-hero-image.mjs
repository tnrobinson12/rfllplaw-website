/* --------------------------------------------------------------------------
   Prepare the homepage hero photograph for the web.

   The original supplied by the firm is kept untouched at:

     public/images/rfllp-lobby-hero.png      809 x 829, PNG, ~1.6 MB

   It carries four non-photographic border artifacts from however it was
   exported — a flat light band across the top and bottom, and a near-black
   vertical bar down each side. Because the hero uses `object-fit: cover`, at
   least two of those bars survive any given crop and read as thin seams
   against --paper. This script trims them and nothing else.

   No retouching, no colour correction, no upscaling: the photograph itself is
   passed through as-is. Output is JPEG because the source is photography, and
   next/image derives AVIF and WebP from it at build time regardless.

   Run with:  node scripts/prepare-hero-image.mjs

   `sharp` arrives with Next's image optimizer; it is not a direct dependency.
   The output is committed, so this only needs re-running if the firm supplies
   a new original.
   -------------------------------------------------------------------------- */

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'public/images/rfllp-lobby-hero.png');
const OUT_DIR = path.join(root, 'public/images/hero');
const OUT = path.join(OUT_DIR, 'lobby-atrium.jpg');

/** Max channel spread along a row for it to count as a flat border band.
 *  The top band measures 0 and the bottom band 20; every row of the photograph
 *  itself spans at least 158, so the two populations are far apart. */
const FLAT_TOLERANCE = 30;
/** A side bar is near-black for most of its height, then stops abruptly. */
const DARK = (r, g, b) => r < 55 && g < 50 && b < 50;
const DARK_BAR_MIN = 0.55;

async function prepare() {
  const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const px = (x, y) => {
    const o = (y * W + x) * C;
    return [data[o], data[o + 1], data[o + 2]];
  };

  // Side bars first. A flat-row test that started at x=0 would run straight into
  // the dark bar and never see the light band behind it, so the vertical edges
  // have to be found before the horizontal ones.
  const darkFrac = (x) => {
    let n = 0;
    for (let y = 0; y < H; y++) if (DARK(...px(x, y))) n++;
    return n / H;
  };

  let left = 0;
  while (left < W && darkFrac(left) > DARK_BAR_MIN) left++;
  let right = W - 1;
  while (right > left && darkFrac(right) > DARK_BAR_MIN) right--;

  // Now the light bands, scanned only across the photograph's own width.
  const rowSpread = (y) => {
    const mn = [255, 255, 255];
    const mx = [0, 0, 0];
    for (let x = left; x <= right; x++) {
      const p = px(x, y);
      for (let i = 0; i < 3; i++) {
        if (p[i] < mn[i]) mn[i] = p[i];
        if (p[i] > mx[i]) mx[i] = p[i];
      }
    }
    return Math.max(mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2]);
  };
  const flatRow = (y) => rowSpread(y) <= FLAT_TOLERANCE;

  let top = 0;
  while (top < H && flatRow(top)) top++;
  let bottom = H - 1;
  while (bottom > top && flatRow(bottom)) bottom--;

  // A genuine dark wall would fade; these bars stop dead. Prove the edge is a
  // discontinuity before trusting it, so real photograph is never cut away.
  const step = (x, dir) => Math.abs(darkFrac(x) - darkFrac(x + dir));
  console.log('border detection');
  console.log(`  top band      ${top} px    first photo row spread: ${rowSpread(top)}`);
  console.log(`  bottom band   ${H - 1 - bottom} px    last photo row spread: ${rowSpread(bottom)}`);
  console.log(`  left bar      ${left} px   discontinuity at edge: ${step(left - 1, 1).toFixed(2)}`);
  console.log(`  right bar     ${W - 1 - right} px   discontinuity at edge: ${step(right + 1, -1).toFixed(2)}`);

  const box = { left, top, width: right - left + 1, height: bottom - top + 1 };

  await mkdir(OUT_DIR, { recursive: true });
  await sharp(SRC)
    .extract(box)
    .jpeg({ quality: 94, chromaSubsampling: '4:4:4', mozjpeg: true })
    .toFile(OUT);

  const out = await sharp(OUT).metadata();
  console.log(`\noriginal   ${W} x ${H}`);
  console.log(`trimmed    ${box.width} x ${box.height} at (${box.left}, ${box.top})`);
  console.log(`aspect     ${(box.width / box.height).toFixed(4)} (portrait-ish, near square)`);
  console.log(`wrote      public/images/hero/lobby-atrium.jpg  ${out.width} x ${out.height}`);
}

prepare().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
