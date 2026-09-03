/* Inline SVG icons. Decorative by default (aria-hidden); pass a title for
   standalone semantic use. Stroke inherits currentColor. */

type IconProps = {
  size?: number;
  className?: string;
};

export function ArrowRight({ size = 16, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1.5 8h12" />
      <path d="M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function ArrowUpRight({ size = 14, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3.5 10.5 10.5 3.5" />
      <path d="M4.75 3.5h5.75v5.75" />
    </svg>
  );
}

export function SearchIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="7" cy="7" r="4.75" />
      <path d="M10.5 10.5 14 14" />
    </svg>
  );
}

export function CloseIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3.5 3.5 12.5 12.5" />
      <path d="M12.5 3.5 3.5 12.5" />
    </svg>
  );
}

export function LinkedInIcon({ size = 15, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM2.75 21.5h4.46V9.5H2.75v12ZM9.7 9.5h4.28v1.64h.06c.6-1.08 2.05-2.22 4.22-2.22 4.51 0 5.34 2.83 5.34 6.5v6.08h-4.46v-5.39c0-1.29-.02-2.94-1.85-2.94-1.85 0-2.13 1.4-2.13 2.85v5.48H9.7v-12Z" />
    </svg>
  );
}
