import Image from "next/image";

import { cn } from "@/lib/utils";

import { ARCH_CLIP_ID, JharokhaArch } from "./ornament";

type ArchFrameProps = {
  src: string;
  alt?: string;
  /** Passed straight to next/image. */
  sizes: string;
  priority?: boolean;
  /** Adds the offset ink slab behind the arch — the clipped drop shadow. */
  shadow?: boolean;
  /** Applied to the outer wrapper; set the width and aspect ratio here. */
  className?: string;
};

/**
 * An image clipped to the jharokha arch, with a hard ink outline on top and an
 * optional offset slab behind.
 *
 * A clipped element can't take a border or a box-shadow — both get clipped away
 * with everything else — so the outline is a stroked SVG laid over the image
 * and the "shadow" is a second copy of the shape sitting behind it. Without the
 * outline, a photo whose edge colour matches the panel behind it loses the arch
 * shape entirely.
 */
export function ArchFrame({
  src,
  alt = "",
  sizes,
  priority = false,
  shadow = false,
  className,
}: ArchFrameProps) {
  const clip = { clipPath: `url(#${ARCH_CLIP_ID})` };

  return (
    <div className={cn("relative", className)}>
      {shadow ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-3 translate-y-3 bg-(--jaipur-ink)"
          style={clip}
        />
      ) : null}

      <div
        className="relative size-full overflow-hidden bg-(--jaipur-indigo)"
        style={clip}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>

      <JharokhaArch
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full text-(--jaipur-ink)"
      />
    </div>
  );
}
