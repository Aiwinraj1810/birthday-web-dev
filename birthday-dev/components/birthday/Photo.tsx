import Image from "next/image";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  src: string;
  alt?: string;
  /** Static tilt in degrees (CSS `rotate`, so GSAP transforms compose on top). */
  tilt?: number;
  sizes?: string;
  priority?: boolean;
};

/**
 * A "physical" photograph. The outer element carries position, size and tilt
 * (and is what scenes animate); the inner one holds the image so it can be
 * scaled / revealed independently.
 */
export function Photo({
  src,
  alt = "",
  tilt = 0,
  sizes = "(max-width: 768px) 70vw, 30vw",
  priority,
  className = "",
  style,
  ...rest
}: Props) {
  return (
    <div
      className={`photo ${className}`}
      style={{ rotate: `${tilt}deg`, ...style }}
      {...rest}
    >
      <div data-inner className="photo-inner">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    </div>
  );
}
