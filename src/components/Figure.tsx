import Image from 'next/image';
import { Artwork, type ArtworkVariant } from '@/components/Artwork';

type Ratio = '3-2' | '4-5' | '1-1' | '16-9' | '21-9';

type Props = {
  /** Path under /public, e.g. "/images/team/todd-robinson.jpg". */
  src?: string;
  /** Required whenever `src` is supplied. Describe the image, not the subject's role. */
  alt?: string;
  ratio?: Ratio;
  /** Responsive sizes attribute — always set this for images above the fold. */
  sizes?: string;
  /** Set true only for the single largest image in the initial viewport. */
  priority?: boolean;
  /** Artwork used when no photograph has been supplied yet. */
  artwork?: ArtworkVariant;
  /** Corner tag shown over generated artwork. */
  artworkTag?: string;
  caption?: string;
  className?: string;
};

/**
 * The site's single image primitive.
 *
 * When `src` is supplied it renders an optimized, lazily loaded next/image with
 * a correct `sizes` attribute. When it is not, it renders generated artwork so
 * the layout is complete and intentional while photography is being sourced.
 */
export function Figure({
  src,
  alt,
  ratio = '3-2',
  sizes = '100vw',
  priority = false,
  artwork = 'facade',
  artworkTag,
  caption,
  className,
}: Props) {
  const frameClass = ['figure', `figure--ratio-${ratio}`, className]
    .filter(Boolean)
    .join(' ');

  const media = src ? (
    <Image
      src={src}
      alt={alt ?? ''}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      style={{ objectFit: 'cover' }}
    />
  ) : (
    <Artwork variant={artwork} tag={artworkTag} />
  );

  if (!caption) {
    return <div className={frameClass}>{media}</div>;
  }

  return (
    <figure>
      <div className={frameClass}>{media}</div>
      <figcaption className="figure__caption">{caption}</figcaption>
    </figure>
  );
}
