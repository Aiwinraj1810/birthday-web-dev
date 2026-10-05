export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`label ${className}`}>{children}</p>;
}
