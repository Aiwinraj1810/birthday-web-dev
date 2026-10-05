import type { ElementType } from "react";

/** "a *b* c" → a <em>b</em> c */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith("*") ? (
          <em key={i} className="italic">
            {part.slice(1, -1)}
          </em>
        ) : (
          part
        ),
      )}
    </>
  );
}

/**
 * One block element per line, each wrapping a [data-line] span the
 * animations can target. `mask` clips the line so it can rise from below.
 */
export function Lines({
  lines,
  as: Tag = "div",
  mask = false,
  className = "",
}: {
  lines: string[];
  as?: ElementType;
  mask?: boolean;
  className?: string;
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={mask ? "block overflow-hidden pb-[0.14em] -mb-[0.14em]" : "block"}
        >
          <span data-line className="block will-change-transform">
            <Rich text={line} />
          </span>
        </span>
      ))}
    </Tag>
  );
}
