/** A fine line-drawn speaker. `waves` draws the sound arcs; `slash` strikes it through (muted). */
export function SoundIcon({
  size = 28,
  waves = true,
  slash = false,
  className = "",
}: {
  size?: number;
  waves?: boolean;
  slash?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M4.5 11.2h3.6L13 7v14l-4.9-4.2H4.5z" />
      {waves && !slash && (
        <>
          <path className="sound-wave sound-wave-1" d="M16.6 10.6a4.6 4.6 0 0 1 0 6.8" />
          <path className="sound-wave sound-wave-2" d="M19.6 8a8.6 8.6 0 0 1 0 12" />
        </>
      )}
      {slash && <path d="M17 10.5l6 7M23 10.5l-6 7" />}
    </svg>
  );
}
