import type { CSSProperties } from "react";

export default function Spinner({
  size = 48,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const dot = Math.max(4, Math.round(size / 6));

  return (
    <div
      role="status"
      aria-label="Chargement"
      className={`spinner ${className}`}
      style={{ width: size, height: size, "--dot": `${dot}px` } as CSSProperties}
    />
  );
}
