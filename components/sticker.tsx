import { cn } from "@/lib/utils";

type StickerProps = {
  children: React.ReactNode;
  /** Rotation in degrees. Small odd angles read as "stuck on by hand". */
  rotate?: number;
  className?: string;
};

/**
 * A rotated, hard-framed label — the pasted-on flyer element that carries the
 * maximalist half of the design. Deliberately decorative in placement but not
 * in content: stickers hold real event data (dates, capacity, location).
 */
export function Sticker({ children, rotate = -4, className }: StickerProps) {
  return (
    <span
      style={{ transform: `rotate(${rotate}deg)` }}
      className={cn(
        "brut-label brut-frame inline-block bg-(--jaipur-marigold) px-3 py-2 text-(--jaipur-ink)",
        className,
      )}
    >
      {children}
    </span>
  );
}
