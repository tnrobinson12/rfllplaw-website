'use client';

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

/** Kept to a fixed set of block-level tags so the element type stays checkable. */
type RevealTag = 'div' | 'section' | 'article' | 'ul' | 'ol' | 'dl' | 'li' | 'figure';

type Props = {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  /** 'up' translates and fades; 'fade' only fades; 'mask' wipes upward. */
  variant?: 'up' | 'fade' | 'mask';
  as?: RevealTag;
  className?: string;
};

/**
 * Scroll-triggered entrance. One IntersectionObserver per element, disconnected
 * after firing, so there is no scroll listener and no layout thrash. Motion is
 * fully suppressed by the prefers-reduced-motion rules in layout.css.
 */
export function Reveal({
  children,
  delay = 0,
  variant = 'up',
  as = 'div',
  className,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const classes = [
    'reveal',
    variant === 'fade' ? 'reveal--fade' : '',
    variant === 'mask' ? 'reveal--mask' : '',
    visible ? 'is-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = delay
    ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties)
    : undefined;

  return createElement(as, { ref, className: classes, style }, children);
}
