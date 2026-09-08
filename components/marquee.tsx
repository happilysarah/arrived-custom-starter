import { cn } from "@/lib/utils";

type MarqueeProps = {
  /** Phrases cycled through the ticker, separated by a stamp motif. */
  items: string[];
  /** Seconds for one full pass of a single track. Lower = faster. */
  durationSeconds?: number;
  className?: string;
  /** Applied to the outer full-bleed strip — use for the band colour. */
  wrapperClassName?: string;
};

/**
 * Infinite ticker strip. Two identical tracks sit side by side and the pair
 * translates by exactly one track width, so the seam never shows. The second
 * track is aria-hidden — screen readers should hear the phrases once.
 *
 * Motion is disabled under prefers-reduced-motion (see `.marquee-track` in
 * globals.css), which leaves the first track parked and legible.
 */
export function Marquee({
  items,
  durationSeconds = 30,
  className,
  wrapperClassName,
}: MarqueeProps) {
  if (!items.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden border-y-[3px] border-(--jaipur-ink) py-3",
        wrapperClassName,
      )}
      style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}
    >
      {[0, 1].map((track) => (
        <div
          key={track}
          aria-hidden={track === 1 || undefined}
          className={cn(
            "marquee-track flex shrink-0 items-center gap-8 pr-8",
            className,
          )}
        >
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="brut-display flex shrink-0 items-center gap-8 text-xl whitespace-nowrap sm:text-2xl"
            >
              {item}
              <span aria-hidden="true" className="text-base opacity-70">
                ✦
              </span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
