import { AddToCalendar } from "@/components/add-to-calendar";
import { ArchFrame } from "@/components/arch-frame";
import { AttendeesList } from "@/components/attendees-list";
import { Container } from "@/components/container";
import { RETREAT_COPY } from "@/components/copy";
import { EventDetails } from "@/components/event-details";
import { text } from "@/components/helpers";
import { Markdown } from "@/components/markdown";
import { SunBurst } from "@/components/ornament";
import { Sticker } from "@/components/sticker";
import type { CalendarEvent } from "@/lib/happily/calendar";
import { getEventId, resolveEventEnv } from "@/lib/happily/config";
import { getPublicAttendees, getPublicEvent } from "@/lib/happily/queries";

export default async function ConfirmationPage() {
  const eventId = getEventId();
  const env = await resolveEventEnv();
  const eventData = await getPublicEvent({ eventId, env });
  const attendees =
    eventData.event.content.displayAttendeesList === true
      ? await getPublicAttendees({
          eventId,
          env,
          pageSize: eventData.event.content.attendeesPageSize ?? 12,
        })
      : null;
  const { event } = eventData;
  const content = event.content;

  const calendarEvent: CalendarEvent | null =
    event.display_add_to_calendar && event.start_date && event.end_date
      ? {
          title: event.name,
          description: text(content.aboutDescription),
          startDate: event.start_date,
          endDate: event.end_date,
          timezone: event.timezone ?? "UTC",
          location: event.location ?? undefined,
        }
      : null;

  return (
    <main>
      <Container
        wrapperClassName="relative isolate overflow-hidden bg-(--event-accent-bg) text-(--event-accent-text) border-b-[4px] border-(--jaipur-ink)"
        className="grid max-w-4xl justify-items-center gap-10 text-center"
      >
        <SunBurst
          aria-hidden="true"
          className="pointer-events-none absolute -top-52 left-1/2 -z-10 size-[42rem] -translate-x-1/2 text-(--jaipur-ink)/8"
        />

        <section className="flex w-full flex-col items-center">
          {content.confirmationImage ? (
            <ArchFrame
              src={content.confirmationImage}
              priority
              shadow
              sizes="(min-width: 640px) 24rem, 100vw"
              className="mb-10 aspect-3/4 w-full max-w-sm"
            />
          ) : null}

          <Sticker
            rotate={-4}
            className="bg-(--jaipur-pink) text-(--jaipur-plaster)"
          >
            {text(event.location, RETREAT_COPY.location)}
          </Sticker>

          <h1 className="brut-display mt-6 text-5xl sm:text-7xl">
            {text(content.confirmationTitle, "Your room is held")}
          </h1>

          <EventDetails event={event} className="mt-8 justify-center" />

          {content.confirmationDescription ? (
            <Markdown className="mt-7 max-w-2xl text-left text-base leading-relaxed md:text-lg">
              {content.confirmationDescription}
            </Markdown>
          ) : null}

          {calendarEvent ? (
            <AddToCalendar event={calendarEvent} className="mt-10" />
          ) : null}
        </section>
      </Container>

      {attendees?.attendees.length ? (
        <Container
          wrapperClassName="pattern-stripe bg-(--event-base-bg) border-b-[4px] border-(--jaipur-ink)"
          className="max-w-5xl"
        >
          <AttendeesList
            attendees={attendees.attendees}
            title={text(content.attendeesListTitle, "Who's coming")}
          />
        </Container>
      ) : null}
    </main>
  );
}
