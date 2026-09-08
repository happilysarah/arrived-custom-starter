import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/container";
import { RETREAT_COPY } from "@/components/copy";
import { text } from "@/components/helpers";
import { SectionHeading } from "@/components/section-heading";
import { Sticker } from "@/components/sticker";
import { getEventId, resolveEventEnv } from "@/lib/happily/config";
import { getPublicEvent, getPublicPhotos } from "@/lib/happily/queries";

/** Cycled behind each frame so empty/slow tiles still colour-block. */
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
              <figure
                key={photo.id}
                className={`brut-frame relative aspect-4/3 overflow-hidden ${TILE_COLORS[index % TILE_COLORS.length]}`}
              >
                <Image
                  src={photo.media.path ?? photo.media.fallback_path}
                  alt={photo.media.description ?? ""}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </figure>
            ) : null,
          )}
        </div>
      </Container>
    </main>
  );
}
