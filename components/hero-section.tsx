import type { PublicEventData } from "@/lib/happily/types";

import { ArchFrame } from "./arch-frame";
import { Container } from "./container";
import { RETREAT_COPY } from "./copy";
import { EventDetails } from "./event-details";
import { eventDateRange, hasText, heroImage, text } from "./helpers";
import { BlockPrintStamp, JaggedBurst, SunBurst, Tape } from "./ornament";
import { RansomText } from "./ransom-text";
import { ScrollLink } from "./scroll-link";
import { Sticker } from "./sticker";

type HeroSectionProps = {
  event: PublicEventData["event"];
  formActive?: boolean;
};

export function HeroSection({ event, formActive }: HeroSectionProps) {
  const content = event.content;
  const heroSectionType = content.heroSection ?? "image";
  const image = heroImage(content);

  // Video stays a full-bleed background (that's what it's authored for), but a
  // still image is better used as the arch-framed panel beside the title —
  // brutalism wants the photo *inside* a frame, not washed out behind text.
  const showVideo = heroSectionType === "video" && Boolean(content.heroVideo);
  const panelImage = heroSectionType === "image" ? image : null;

  const dateRange = eventDateRange(event);
  const location = text(event.location, RETREAT_COPY.location);

  const heroCta = event.display_settings.buttonLinks?.heroCTA;
  const showCta = formActive && heroCta?.display && hasText(heroCta.text);

  return (
    <section className="relative isolate overflow-hidden border-b-[4px] border-(--jaipur-ink) bg-(--event-base-bg)">
      {showVideo && (
        <>
          <video
            key={content.heroVideo!}
            className="absolute inset-0 -z-20 size-full object-cover"
            loop
            muted
            autoPlay
            playsInline
          >
            <source src={content.heroVideo!} type="video/mp4" />
          </video>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-(--jaipur-ink)/55"
          />
        </>
      )}

      {/* Decorative fill for the no-media case — and harmless behind media. */}
      <SunBurst
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[26rem] text-(--jaipur-marigold)/35 sm:size-[36rem]"
      />
      <JaggedBurst
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-28 -z-10 size-64 text-(--jaipur-marigold) sm:size-80"
      />

      <Container
        id="hero"
        className="grid max-w-7xl items-center gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14"
      >
        <div
          className={
            // Over video the copy needs its own opaque surface; on plaster it
            // sits directly on the page.
            showVideo
              ? "brut-frame-lg bg-(--event-base-bg) p-6 sm:p-8 lg:col-span-7"
              : "lg:col-span-7"
          }
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="brut-label brut-frame-flat bg-(--jaipur-indigo) px-3 py-2 text-(--jaipur-plaster)">
              {location}
            </span>
            <span className="zine-hand zine-tilt-b text-2xl text-(--zine-shock)">
              {text(content.companyName, event.type ?? RETREAT_COPY.eyebrow)}
            </span>
          </div>

          <h1 className="mt-7 text-5xl leading-[1.45] sm:text-6xl lg:text-7xl">
            <RansomText>{event.name}</RansomText>
          </h1>

          <EventDetails event={event} className="mt-7" />

          {hasText(content.heroText) || !panelImage ? (
            <p className="mt-7 max-w-xl border-l-[6px] border-(--jaipur-pink) pl-4 text-base leading-relaxed sm:text-lg">
              {text(content.heroText, RETREAT_COPY.heroText)}
            </p>
          ) : null}

          {showCta ? (
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ScrollLink
                href="#register"
                className="brut-display brut-frame brut-lift inline-block bg-(--event-primary-bg) px-7 py-4 text-xl text-(--event-primary-text) sm:text-2xl"
              >
                {text(heroCta!.text, "Register")}
              </ScrollLink>
              <ScrollLink
                href="#agenda"
                className="brut-label border-b-[3px] border-(--jaipur-ink) pb-1 hover:border-(--jaipur-pink)"
              >
                See the itinerary ↓
              </ScrollLink>
            </div>
          ) : null}
        </div>

        {panelImage ? (
          <div className="zine-tilt-c relative lg:col-span-5">
            <Tape rotate={-11} className="-top-3 left-1/2 z-20 -translate-x-1/2" />
            <Tape rotate={7} className="bottom-4 -left-8 z-20" />
            <Tape rotate={-6} className="bottom-16 -right-9 z-20" />
            <ArchFrame
              src={panelImage}
              priority
              shadow
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-3/4 w-full"
            />

            {dateRange ? (
              // Anchored to the panel's left edge and clamped to its width, so
              // a long range can't run off the side of the section.
              <Sticker
                rotate={-6}
                className="absolute -bottom-5 left-0 max-w-full text-center text-[0.625rem] sm:text-xs"
              >
                {dateRange}
              </Sticker>
            ) : null}

            <BlockPrintStamp
              aria-hidden="true"
              className="absolute -top-6 -right-4 size-16 text-(--jaipur-pink) sm:size-20"
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
