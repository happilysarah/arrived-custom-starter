"use client";

import { Tabs as TabsPrimitive } from "radix-ui";
import { useMemo } from "react";

import type { PublicEventData } from "@/lib/happily/types";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { eventTimeRange, formatEventDate } from "./helpers";
import { Markdown } from "./markdown";

type AgendaListProps = {
  sessions: PublicEventData["sessions"];
  speakers: PublicEventData["speakers"];
  tracks: PublicEventData["tracks"];
  event: PublicEventData["event"];
};

type Speaker = PublicEventData["speakers"][number];
type Session = PublicEventData["sessions"][number];
type Track = PublicEventData["tracks"][number];

function groupByDay(sessions: Session[], timezone: string | null) {
  const groups: [string, Session[]][] = [];
  const map = new Map<string, Session[]>();

  for (const session of sessions) {
    const key = session.start_time
      ? (formatEventDate(session.start_time, timezone, {
          weekday: "long",
          month: "long",
          day: "numeric",
        }) ?? "TBD")
      : "TBD";

    let group = map.get(key);
    if (!group) {
      group = [];
      map.set(key, group);
      groups.push([key, group]);
    }
    group.push(session);
  }

  return groups;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="brut-label brut-frame-flat inline-block bg-(--jaipur-marigold) px-2.5 py-1.5 text-(--jaipur-ink)">
      {children}
    </span>
  );
}

function SpeakersList({
  speakers,
  divider,
}: {
  speakers: Speaker[];
  /** Only rule off from a description — otherwise it doubles the panel's own
      dashed top border. */
  divider: boolean;
}) {
  return (
    <div
      className={cn(
        "mt-6 md:col-span-7 md:col-start-4",
        divider && "border-t-[3px] border-dashed border-(--jaipur-ink)/30 pt-5",
      )}
    >
      <p className="brut-label mb-4 opacity-70">Led by</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {speakers.map((speaker) => (
          <div key={speaker.id} className="flex items-center gap-3">
            <Avatar className="size-12 shrink-0 rounded-none border-[3px] border-(--jaipur-ink)">
              <AvatarImage
                src={speaker.image_url ?? undefined}
                alt=""
                className="rounded-none object-cover"
              />
              <AvatarFallback className="brut-label rounded-none bg-(--jaipur-indigo) text-(--jaipur-plaster)">
                {initials(speaker.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="brut-display text-base">{speaker.name}</p>
              <p className="brut-label mt-1 truncate opacity-70">
                {[speaker.title, speaker.company].filter(Boolean).join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SessionAccordion({
  sessions,
  speakerMap,
  trackMap,
  event,
}: {
  sessions: Session[];
  speakerMap: Map<string, Speaker>;
  trackMap: Map<number, Track>;
  event: PublicEventData["event"];
}) {
  return (
    <Accordion type="single" collapsible className="grid gap-5">
      {sessions.map((session, index) => {
        const timeLabel = eventTimeRange({
          ...event,
          start_date: session.start_time,
          end_date: session.end_time,
        });

        const track =
          session.track_id != null
            ? (trackMap.get(session.track_id) ?? null)
            : null;

        const sessionSpeakers = session.speakers
          .map((ss) => speakerMap.get(ss.speaker_id))
          .filter((s): s is Speaker => s != null);

        const hasContent = Boolean(
          session.description ||
            sessionSpeakers.length ||
            track ||
            session.location,
        );

        return (
          <AccordionItem
            value={session.id}
            key={session.id}
            className="brut-frame border-b-[3px] bg-(--event-base-bg) px-5 last:border-b-[3px]"
          >
            <AccordionTrigger
              disabled={!hasContent}
              className="w-full gap-4 py-5 no-underline hover:no-underline disabled:opacity-100 [&>svg]:size-6 [&>svg]:stroke-[3]"
            >
              {/* One wrapper rather than two trigger children: the trigger is a
                  <button>, so the row must stay phrasing content, and stacking
                  it directly would push the chevron below the title on mobile. */}
              <span className="flex w-full flex-col gap-3 md:grid md:grid-cols-10 md:items-center md:gap-x-8 md:gap-y-0">
                <span className="flex items-center gap-3 md:col-span-3">
                  <span className="brut-label bg-(--jaipur-pink) px-2 py-1.5 text-(--jaipur-plaster)">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="brut-label text-sm tracking-[0.08em]">
                    {timeLabel}
                  </span>
                </span>
                <span className="brut-display text-left text-xl md:col-span-6 md:text-2xl">
                  {session.name}
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent className="border-t-[3px] border-dashed border-(--jaipur-ink)/30 pt-5 pb-6 md:grid md:grid-cols-10 md:gap-x-8">
              {track || session.location ? (
                <div className="flex flex-wrap items-start gap-2 md:col-span-3">
                  {track ? <Chip>{track.name}</Chip> : null}
                  {session.location ? <Chip>{session.location}</Chip> : null}
                </div>
              ) : null}

              {session.description ? (
                <div className="col-span-7 col-start-4 pt-4 text-base leading-relaxed md:pt-0">
                  <Markdown>{session.description}</Markdown>
                </div>
              ) : null}

              {sessionSpeakers.length > 0 ? (
                <SpeakersList
                  speakers={sessionSpeakers}
                  divider={Boolean(session.description)}
                />
              ) : null}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export function AgendaList({
  sessions,
  speakers,
  tracks,
  event,
}: AgendaListProps) {
  const sorted = useMemo(
    () =>
      [...sessions].sort((a, b) =>
        String(a.start_time ?? "").localeCompare(String(b.start_time ?? "")),
      ),
    [sessions],
  );

  const speakerMap = useMemo(
    () => new Map(speakers.map((s) => [s.id, s])),
    [speakers],
  );
  const trackMap = useMemo(
    () => new Map(tracks.map((t) => [t.id, t])),
    [tracks],
  );

  const days = useMemo(
    () => groupByDay(sorted, event.timezone),
    [sorted, event.timezone],
  );

  if (days.length <= 1) {
    return (
      <SessionAccordion
        sessions={sorted}
        speakerMap={speakerMap}
        trackMap={trackMap}
        event={event}
      />
    );
  }

  return (
    // Radix directly rather than components/ui/tabs: that skin's active-state
    // rules are group-scoped (`group-data-[variant=…]/tabs-list:data-active:`)
    // and out-specify anything passed through className, so the day chips
    // silently kept the default look. Same approach mobile-menu.tsx takes with
    // the Dialog primitive.
    <TabsPrimitive.Root defaultValue={days[0][0]}>
      <TabsPrimitive.List className="mb-10 flex flex-wrap gap-3">
        {days.map(([dayLabel], index) => (
          <TabsPrimitive.Trigger
            key={dayLabel}
            value={dayLabel}
            className="brut-label brut-frame-flat cursor-pointer bg-(--event-base-bg) px-4 py-3 text-(--event-base-text) transition-colors hover:bg-(--jaipur-marigold) data-[state=active]:bg-(--jaipur-indigo) data-[state=active]:text-(--jaipur-plaster) data-[state=active]:shadow-[5px_5px_0_0_var(--jaipur-ink)]"
          >
            <span className="mr-2 opacity-60">
              Day {String(index + 1).padStart(2, "0")}
            </span>
            {dayLabel}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {days.map(([dayLabel, daySessions]) => (
        <TabsPrimitive.Content key={dayLabel} value={dayLabel}>
          <SessionAccordion
            sessions={daySessions}
            speakerMap={speakerMap}
            trackMap={trackMap}
            event={event}
          />
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
