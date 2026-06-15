import type { ComponentType } from "react";

interface IconBadgeProps {
  icon: ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  color: string;
  size?: number;
  iconSize?: number;
  strokeWidth?: number;
  className?: string;
}

// Apple-style "app icon" badge — solid-color continuous-corner square
// with a white monoline glyph, as seen throughout Settings/Health/share sheets.
export default function IconBadge({ icon: Icon, color, size = 36, iconSize, strokeWidth = 2, className = "" }: IconBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.32),
        background: color,
        boxShadow: "0 2px 8px rgba(0,0,0,0.14)",
      }}
    >
      <Icon size={iconSize ?? Math.round(size * 0.46)} strokeWidth={strokeWidth} color="#FFFFFF" />
    </span>
  );
}
