/**
 * Renders a JSON-LD script tag. Content is serialized server-side and the
 * closing-tag sequence is escaped so schema data can never break out of the
 * script element.
 */
export function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
