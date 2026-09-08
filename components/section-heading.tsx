import { cn } from "@/lib/utils";

import { BlockPrintStamp } from "./ornament";
import { Markdown } from "./markdown";
import { RansomText } from "./ransom-text";

type SectionHeadingProps = {
  title: string;
  description?: string | null;
  /** Two-digit index printed in the marker chip, e.g. 1 → "01". */
  index?: number;
  /** Optional kicker above the title, set in the handwritten voice. */
  eyebrow?: string;
  /** Set on inverted bands so the rule and stamp stop assuming ink-on-plaster. */
  inverted?: boolean;
  /** Cut headings out of other pages; off for smaller, quieter headings. */
  ransom?: boolean;
  className?: string;
};

export function SectionHeading({
  title,
  description,
  index,
  eyebrow,
  inverted = false,
  ransom = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("text-left", className)}>
      <div className="flex items-center gap-4">
        {index != null ? (
          <span
            className={cn(
              "brut-label zine-tilt-a border-[3px] px-2.5 py-1.5",
              inverted
                ? "border-current bg-transparent"
                : "border-(--jaipur-ink) bg-(--zine-shock) text-(--jaipur-plaster)",
            )}
          >
            {String(index).padStart(2, "0")}
          </span>
        ) : null}

        {eyebrow ? (
          <span className="zine-hand zine-tilt-b text-xl">{eyebrow}</span>
        ) : null}

        <span
          aria-hidden="true"
          className={cn(
            "h-[3px] flex-1",
            inverted ? "bg-current opacity-40" : "bg-(--jaipur-ink)",
          )}
        />

        <BlockPrintStamp
          aria-hidden="true"
          className={cn(
            "size-6 shrink-0",
            inverted ? "text-current opacity-70" : "text-(--jaipur-marigold)",
          )}
        />
      </div>

      {ransom ? (
        // Ransom letters carry their own paper, so they read on any band.
        <h2 className="mt-6 text-3xl leading-[1.5] sm:text-4xl lg:text-5xl">
          <RansomText>{title}</RansomText>
        </h2>
      ) : (
        <h2 className="brut-display mt-5 text-4xl sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      )}

      {description ? (
        <div className="mt-6 max-w-3xl text-base leading-relaxed md:text-lg">
          <Markdown>{description}</Markdown>
        </div>
      ) : null}
    </div>
  );
}
