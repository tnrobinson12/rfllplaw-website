import { Fragment, type ReactNode } from 'react';

/**
 * Renders text, highlighting any [bracketed] segment so unconfirmed firm
 * information is visually obvious and cannot ship by accident.
 *
 * Usage: <PlaceholderText text={attorney.title} />
 */
export function PlaceholderText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]*\])/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('[') && part.endsWith(']')) {
          return (
            <span className="placeholder" key={index} title="Placeholder — awaiting confirmed firm information">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}

/** True when a string still contains unconfirmed bracketed content. */
export function hasPlaceholder(value: string): boolean {
  return /\[[^\]]*\]/.test(value);
}

/** A framed editorial note explaining what still needs to be supplied. */
export function PlaceholderNote({
  label = 'Placeholder',
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="placeholder-note" role="note">
      <span className="placeholder-note__label">{label}</span>
      <span>{children}</span>
    </div>
  );
}
