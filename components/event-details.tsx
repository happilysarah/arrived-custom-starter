import { CalendarDaysIcon, ClockIcon, MapPinIcon } from "lucide-react";

import type { PublicEvent } from "@/lib/happily/types";
import { cn } from "@/lib/utils";

import { eventDateRange, eventTimeRange } from "./helpers";

type EventDetailsProps = {
  event: PublicEvent;
  includeLocation?: boolean;
  className?: string;
};

/**
 * Where / when, as hard-framed chips rather than a bullet-separated line.
 * The per-field `display_settings` gates are sub-features of this strip, so
 * they stay here rather than moving up to the composition layer.
 */
export function EventDetails({
  event,
  includeLocation = true,
  className,
}: EventDetailsProps) {
  const date = eventDateRange(event);
  const time = eventTimeRange(event);
  const ds = event.display_settings;

  const items = [
    includeLocation && (ds.displayLocation ?? true) && event.location
      ? { icon: MapPinIcon, value: event.location }
      : null,
    (ds.displayDate ?? true) && date ? { icon: CalendarDaysIcon, value: date } : null,
    (ds.displayTime ?? true) && time ? { icon: ClockIcon, value: time } : null,
  ].filter((item) => item !== null);

  if (items.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-3", className)}>
      {items.map(({ icon: Icon, value }) => (
        <li
          key={value}
          className="brut-label brut-frame-flat flex items-center gap-2 bg-(--event-base-bg) px-3 py-2 text-(--event-base-text)"
        >
          <Icon aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={3} />
          {value}
        </li>
      ))}
    </ul>
  );
}
