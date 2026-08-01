export default function GleanMark({
  className,
  style,
  size,
  color,
}: {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      className={className}
      style={{ ...style, color }}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10.5" cy="12.5" r="7" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="17" cy="6" r="2.6" fill="currentColor" />
    </svg>
  );
}
