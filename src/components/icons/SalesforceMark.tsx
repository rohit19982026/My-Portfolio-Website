export default function SalesforceMark({
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
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}
