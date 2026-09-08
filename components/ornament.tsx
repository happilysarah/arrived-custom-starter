/**
 * Jaipur motifs, drawn as inline SVG so they scale, inherit `currentColor`,
 * and cost no extra requests (the starter runs next/image unoptimized, so
 * raster ornament would be dead weight).
 *
 * Server components — none of these are interactive.
 */

/** Shared id for the arch clip path defined by <OrnamentDefs>. */
export const ARCH_CLIP_ID = "jaipur-arch-clip";

/**
 * Normalised (0–1) cusped-arch outline: flat base, straight jambs, and a
 * softly pointed apex. Used both as the visible <JharokhaArch> stroke and as
 * the objectBoundingBox clip path, so framed images and their outlines agree.
 */
const ARCH_PATH = "M0,1 L0,0.44 C0,0.24 0.2,0.07 0.5,0 C0.8,0.07 1,0.24 1,0.44 L1,1 Z";

/**
 * Renders once per document (from the event layout). Everything that clips to
 * an arch references ARCH_CLIP_ID rather than repeating the path.
 */
export function OrnamentDefs() {
  return (
    <svg aria-hidden="true" className="absolute size-0" focusable="false">
      <defs>
        <clipPath id={ARCH_CLIP_ID} clipPathUnits="objectBoundingBox">
          <path d={ARCH_PATH} />
        </clipPath>
      </defs>
    </svg>
  );
}

/** Outline of the arch above — sits behind or around framed media. */
export function JharokhaArch({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      className={className}
    >
      {/* non-scaling-stroke keeps the outline 3px at every size, matching the
          border weight used by the brut-frame utilities. */}
      <path
        d={ARCH_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Eight-petal rosette — the block-print stamp used as a section marker. */
export function BlockPrintStamp({ className }: { className?: string }) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
    >
      {petals.map((angle) => (
        <ellipse
          key={angle}
          cx="50"
          cy="24"
          rx="9"
          ry="20"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="11" />
    </svg>
  );
}

/** Radiating sunburst — the loud filler behind hero and register bands. */
export function SunBurst({ className }: { className?: string }) {
  const rays = Array.from({ length: 24 }, (_, i) => i * 15);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className={className}
      fill="currentColor"
    >
      {rays.map((angle) => (
        <polygon
          key={angle}
          points="100,0 108,100 92,100"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
    </svg>
  );
}

/**
 * Repeating scalloped strip — a jharokha eave, used as a section divider.
 * Tiles horizontally at any width via preserveAspectRatio="none".
 */
export function ScallopBar({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 96 12"
      preserveAspectRatio="none"
      className={className}
      fill="currentColor"
    >
      {[0, 24, 48, 72].map((x) => (
        <path key={x} d={`M${x},0 h24 v0 a12,12 0 0 1 -24,0 z`} />
      ))}
    </svg>
  );
}
