# Images

Drop photography here. Until a file is supplied, the site renders original generated SVG artwork,
so nothing is broken by an empty folder.

## Structure

```
public/images/
  Robinson-Franzman-Logo-...jpg   logo master from the firm — reference only, never edited
  logo/
    rf-logo.png               positive lockup — light surfaces
    rf-logo-reversed.png      knockout lockup — dark surfaces
  rfllp-lobby-hero.png            homepage hero original — reference only, never edited
  hero/
    lobby-atrium.jpg          trimmed hero actually served by the site
  team/
    todd-robinson.jpg         headshots, one per person, named for the person
    ...                       portrait orientation; framed to 4:5 in CSS
  practices/                  optional practice page imagery — 2000px wide, 21:9 or 3:2
```

## Team headshots

`team/` holds one headshot per person, named for them. The file names are referenced directly from
`src/content/attorneys.ts` — add a person there and point `portrait` at their file.

The supplied files vary in size (108 × 152 up to 267 × 382) but share a consistent portrait
orientation, so a single rule frames them all: the card and profile portrait frames are a fixed 4:5,
the image is `object-fit: cover`, and `object-position: 50% 22%` holds the crop slightly above centre
to keep faces in frame. Nothing is stretched and no per-person crop is needed.

Replacements should keep the same file name and portrait orientation. Larger is better — several of
the current files are below what the layout can render sharply on high-density screens.

## The firm logo

`Robinson-Franzman-Logo-Black-Green-500px-wide-135-tall-150dpi.jpg` is the master the firm supplied:
a 500 × 135 **CMYK** JPEG built for print. It is kept as the reference original and is **never
edited** — and it is deliberately not what the site serves. A CMYK JPEG renders inconsistently
across browsers and cannot carry transparency, so the lockup would sit on a white rectangle over
both `--paper` and `--surface-dark`.

The two PNGs in `logo/` are derived from that master by `scripts/generate-logo-assets.mjs`. Same
artwork, same resolution, same proportions — with the white printing stock converted to transparency
and the master's ~5px empty margin trimmed to the artwork's true bounds (491 × 125). In the
knockout, ink that is black in the master is rendered in `--on-dark`; the green rule keeps its
measured brand value. Flattened back onto white, the positive lockup differs from the master by at
most 5/255 on any channel, so nothing about the artwork has been reinterpreted.

Regenerate with `node scripts/generate-logo-assets.mjs`. Only needed if the firm supplies new master
artwork — the outputs are committed.

**Using it.** Never hard-code the paths; read them from `logo` in `src/content/site.ts`, which also
carries the true pixel dimensions. Size the logo on **one** axis and let the other resolve from the
intrinsic ratio, so it can never be stretched or cropped.

| Surface                        | Asset           |
| ------------------------------ | --------------- |
| `--paper` and other light fills | `logo.positive` |
| `--surface-dark`, hero, footer  | `logo.reversed` |

The header carries both and cross-fades them in CSS, because it is transparent over the homepage
hero and opaque everywhere else.

## Wiring a file up

| Image             | Set this                                                              |
| ----------------- | --------------------------------------------------------------------- |
| Homepage hero     | `hero.image` + `hero.imageAlt` in `src/content/home.ts`                |
| Attorney portrait | `portrait` + `portraitAlt` on the attorney in `src/content/attorneys.ts` |

`<Figure>` then serves an optimized, responsive, lazily loaded `next/image` automatically — AVIF and
WebP are generated at build time.

## Art direction

Use contemporary Atlanta and commercial architecture, structural and facade detail, urban
development, abstract geometry, and material close-ups. Prefer restrained, cool, architectural
photography with strong lines and generous negative space.

Do not use gavels, scales of justice, courthouse exteriors, handshakes, or generic
attorneys-reviewing-documents stock imagery.

## Licensing

Only use images the firm owns or has licensed for commercial web use. Keep the license
documentation with the firm's records.
