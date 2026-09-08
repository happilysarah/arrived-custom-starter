import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/container";
import { RETREAT_COPY } from "@/components/copy";
import { text } from "@/components/helpers";
import { Tape } from "@/components/ornament";
import { SectionHeading } from "@/components/section-heading";
import { Sticker } from "@/components/sticker";
import { getEventId, resolveEventEnv } from "@/lib/happily/config";
import { getPublicEvent, getPublicPhotos } from "@/lib/happily/queries";

/** Cycled behind each frame so a photocopied tile still colour-blocks. */
const TILE_COLORS = [
  "bg-(--jaipur-pink)",
  "bg-(--jaipur-marigold)",
  "bg-(--jaipur-emerald)",
  "bg-(--jaipur-indigo)",
  "bg-(--jaipur-terracotta)",
  "bg-(--happily-violet)",
];

export default async function PhotosPage() {
  const eventId = getEventId();
  const env = await resolveEventEnv();
  const eventData = await getPublicEvent({ eventId, env });

  if (!eventData.event.photos_toggle || !eventData.photo_gallery?.enabled) {
    notFound();
  }

  const gallery = await getPublicPhotos({ eventId, env, pageSize: 60 });
  const { event } = eventData;

  return (
    <main>
      <Container
        wrapperClassName="bg-(--event-base-bg) border-b-[4px] border-(--jaipur-ink)"
        className="max-w-7xl"
      >
        <Sticker rotate={-4}>
          {text(event.location, RETREAT_COPY.location)}
        </Sticker>
        <SectionHeading
          className="mt-6"
          eyebrow="Gallery"
          title={`${event.name} — in pictures`}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.photos.map((photo, index) =>
            photo.media ? (
              // The print is mounted on coloured stock, inset far enough for
              // the mount to show — otherwise object-cover hides it entirely.
              <figure
                key={photo.id}
                className={`brut-frame relative p-3 ${index % 2 ? "zine-tilt-a" : "zine-tilt-b"} ${TILE_COLORS[index % TILE_COLORS.length]}`}
              >
                <Tape
                  rotate={index % 2 ? 9 : -9}
                  className={`-top-3.5 z-20 h-6 w-20 ${index % 2 ? "right-6" : "left-6"}`}
                />
                <div className="zine-halftone relative aspect-4/3 w-full overflow-hidden border-[3px] border-(--jaipur-ink)">
                  <Image
                    src={photo.media.path ?? photo.media.fallback_path}
                    alt={photo.media.description ?? ""}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="zine-photocopy object-cover"
                  />
                </div>
              </figure>
            ) : null,
          )}
        </div>
      </Container>
    </main>
  );
}
