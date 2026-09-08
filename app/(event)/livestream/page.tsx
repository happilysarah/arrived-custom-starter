import { notFound } from "next/navigation";

import { Container } from "@/components/container";
import { RETREAT_COPY } from "@/components/copy";
import { EventDetails } from "@/components/event-details";
import { text } from "@/components/helpers";
import { LivestreamGate } from "@/components/livestream-gate";
import { SectionHeading } from "@/components/section-heading";
import { Sticker } from "@/components/sticker";
import { getEventId, resolveEventEnv } from "@/lib/happily/config";
import { getPublicEvent } from "@/lib/happily/queries";

export default async function LivestreamPage() {
  const eventId = getEventId();
  const env = await resolveEventEnv();
  const eventData = await getPublicEvent({ eventId, env });
  const livestream = eventData.livestream;

  if (!eventData.event.live_toggle || !livestream?.enabled) {
    notFound();
  }

  const { event } = eventData;

  return (
    <LivestreamGate
      eventId={eventId}
      env={env}
      form={livestream.form ?? null}
      formActive={!!livestream.form?.is_active}
    >
      <main>
        <Container
          wrapperClassName="bg-(--event-base-bg) border-b-[4px] border-(--jaipur-ink)"
          className="grid max-w-7xl gap-10"
        >
          <div>
            <Sticker rotate={-4} className="bg-(--jaipur-pink) text-(--jaipur-plaster)">
              Live now · {text(event.location, RETREAT_COPY.location)}
            </Sticker>
            <SectionHeading
              className="mt-6"
              eyebrow="Livestream"
              title={event.name}
            />
            <EventDetails event={event} className="mt-8" />
          </div>

          {livestream.stream_url ? (
            <div className="brut-frame-lg aspect-video overflow-hidden bg-(--jaipur-ink)">
              <iframe
                src={livestream.stream_url}
                title={`${event.name} livestream`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="size-full"
              />
            </div>
          ) : (
            <p className="brut-display brut-frame bg-(--jaipur-marigold) px-6 py-5 text-xl text-(--jaipur-ink)">
              The stream hasn&apos;t gone live yet — check back shortly.
            </p>
          )}

          {livestream.chat_url ? (
            <a
              href={livestream.chat_url}
              target="_blank"
              rel="noreferrer"
              className="brut-display brut-frame brut-lift justify-self-start bg-(--event-primary-bg) px-6 py-4 text-lg text-(--event-primary-text)"
            >
              Open chat →
            </a>
          ) : null}
        </Container>
      </main>
    </LivestreamGate>
  );
}
