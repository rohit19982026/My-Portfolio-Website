export default function SlackMark({
  className,
  style,
  size,
}: {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  color?: string;
}) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <g transform="rotate(0 12 12)">
        <rect x="9.3" y="2" width="2.4" height="8" rx="1.2" fill="#36C5F0" />
        <rect x="11.7" y="7.6" width="2.4" height="2.4" rx="1.2" fill="#36C5F0" />
      </g>
      <g transform="rotate(90 12 12)">
        <rect x="9.3" y="2" width="2.4" height="8" rx="1.2" fill="#2EB67D" />
        <rect x="11.7" y="7.6" width="2.4" height="2.4" rx="1.2" fill="#2EB67D" />
      </g>
      <g transform="rotate(180 12 12)">
        <rect x="9.3" y="2" width="2.4" height="8" rx="1.2" fill="#ECB22E" />
        <rect x="11.7" y="7.6" width="2.4" height="2.4" rx="1.2" fill="#ECB22E" />
      </g>
      <g transform="rotate(270 12 12)">
        <rect x="9.3" y="2" width="2.4" height="8" rx="1.2" fill="#E01E5A" />
        <rect x="11.7" y="7.6" width="2.4" height="2.4" rx="1.2" fill="#E01E5A" />
      </g>
    </svg>
  );
}
