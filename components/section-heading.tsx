import { cn } from "@/lib/utils";

import { BlockPrintStamp } from "./ornament";
import { Markdown } from "./markdown";

type SectionHeadingProps = {
  title: string;
  description?: string | null;
  /** Two-digit index printed in the marker chip, e.g. 1 → "01". */
  index?: number;
  /** Optional kicker above the title, in mono. */
  eyebrow?: string;
  /** Set on inverted bands so the rule and stamp stop assuming ink-on-plaster. */
  inverted?: boolean;
  className?: string;
};

export function SectionHeading({
  title,
  description,
  index,
  eyebrow,
  inverted = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("text-left", className)}>
      <div className="flex items-center gap-4">
        {index != null ? (
          <span
            className={cn(
              "brut-label border-[3px] px-2.5 py-2",
              inverted
                ? "border-current bg-transparent"
                : "border-(--jaipur-ink) bg-(--jaipur-pink) text-(--jaipur-plaster)",
            )}
          >
            {String(index).padStart(2, "0")}
          </span>
        ) : null}

        {eyebrow ? <span className="brut-label">{eyebrow}</span> : null}

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

      <h2 className="brut-display mt-5 text-4xl sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      {description ? (
        <div className="mt-5 max-w-3xl text-base leading-relaxed md:text-lg">
          <Markdown>{description}</Markdown>
        </div>
      ) : null}
    </div>
  );
}
