/** Renders text as hidden per-character spans ([data-char]) that a timeline can "type" in. */
export function TypedText({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i}>
          <span className="inline-block whitespace-nowrap">
            {[...word].map((ch, j) => (
              <span key={j} data-char className="opacity-0">
                {ch}
              </span>
            ))}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
