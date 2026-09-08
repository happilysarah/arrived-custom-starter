import type { HappilyEnv, PublicEventData } from "@/lib/happily/types";

import { AgendaList } from "./agenda-list";
import { Container } from "./container";
import { ContentSection } from "./content-section";
import { RETREAT_COPY } from "./copy";
import { FaqList } from "./faq-list";
import { hasText, text } from "./helpers";
import { HeroSection } from "./hero-section";
import { Markdown } from "./markdown";
import { Marquee } from "./marquee";
import { SunBurst } from "./ornament";
import { RegistrationForm } from "./registration-form";
import { SectionHeading } from "./section-heading";
import { SpeakersGrid } from "./speakers-grid";
import { SponsorsGrid } from "./sponsors-grid";
import { Sticker } from "./sticker";

type EventPageProps = {
  eventData: PublicEventData;
  eventId: string;
  env: HappilyEnv;
};

/** Every band carries a hard bottom rule — the page reads as stacked slabs. */
const BAND = "border-b-[4px] border-(--jaipur-ink)";

export function EventPage({ eventData, eventId, env }: EventPageProps) {
  const { event, form, sessions, speakers, sponsors, faqs, tracks } = eventData;
  const content = event.content;
  const { sections } = RETREAT_COPY;

  const showAbout =
    hasText(content.aboutTitle) || hasText(content.aboutDescription);
  const showHost =
    hasText(content.companyAboutTitle) ||
    hasText(content.companyAboutDescription);

  // Sections are individually gated, so the "01, 02, 03…" markers are numbered
  // over the sections that actually render — a hidden section would otherwise
  // leave a hole in the sequence. Order here must match render order below.
  const visibleSections = [
    showAbout && "about",
    sessions.length > 0 && "agenda",
    speakers.length > 0 && "speakers",
    showHost && "host",
    sponsors.length > 0 && "sponsors",
    faqs.length > 0 && "faqs",
  ].filter((key): key is string => Boolean(key));

  const sectionIndex = (key: string) => visibleSections.indexOf(key) + 1;

  return (
    <main>
      <HeroSection event={event} formActive={form?.is_active} />

      <Marquee
        items={[...RETREAT_COPY.marquee]}
        durationSeconds={32}
        wrapperClassName="bg-(--jaipur-pink) text-(--jaipur-plaster)"
      />

      {showAbout ? (
        <ContentSection
          id="about"
          index={sectionIndex("about")}
          title={text(content.aboutTitle, sections.about)}
          description={content.aboutDescription}
          image={content.aboutImage}
          arch
        />
      ) : null}

      {sessions.length ? (
        <Container
          id="agenda"
          wrapperClassName={`pattern-stripe bg-(--event-base-bg) ${BAND}`}
        >
          <SectionHeading
            index={sectionIndex("agenda")}
            title={text(content.agendaTitle, sections.agenda)}
            description={content.agendaDescription}
          />
          <div className="mt-12">
            <AgendaList
              sessions={sessions}
              speakers={speakers}
              tracks={tracks}
              event={event}
            />
          </div>
        </Container>
      ) : null}

      {speakers.length ? (
        <Container
          id="speakers"
          wrapperClassName={`bg-(--jaipur-indigo) text-(--jaipur-plaster) ${BAND}`}
        >
          <SectionHeading
            index={sectionIndex("speakers")}
            inverted
            title={text(content.speakersTitle, sections.speakers)}
            description={content.speakersDescription}
          />
          <div className="mt-12">
            <SpeakersGrid speakers={speakers} />
          </div>
        </Container>
      ) : null}

      {form ? (
        <Container
          id="register"
          wrapperClassName={`relative isolate overflow-hidden bg-(--event-accent-bg) text-(--event-accent-text) ${BAND}`}
          className="flex max-w-4xl flex-col items-center text-center"
        >
          <SunBurst
            aria-hidden="true"
            className="pointer-events-none absolute -top-56 left-1/2 -z-10 size-[44rem] -translate-x-1/2 text-(--jaipur-ink)/8"
          />

          <Sticker rotate={-5} className="bg-(--jaipur-pink) text-(--jaipur-plaster)">
            {RETREAT_COPY.sections.register}
          </Sticker>

          <h2 className="brut-display mt-6 text-4xl sm:text-6xl lg:text-7xl">
            {text(form.form_title, sections.register)}
          </h2>

          {form.form_description ? (
            <Markdown className="mt-5 max-w-2xl text-base leading-relaxed md:text-lg">
              {form.form_description}
            </Markdown>
          ) : null}

          <div className="mt-10 w-full">
            <div className="brut-frame-lg bg-(--event-base-bg) p-6 sm:p-10">
              <RegistrationForm
                eventId={eventId}
                env={env}
                form={form}
                redirectTo="/confirmation"
                buttonText={form.form_button_text}
              />
            </div>
          </div>
        </Container>
      ) : null}

      {showHost ? (
        <ContentSection
          id="host"
          index={sectionIndex("host")}
          title={text(content.companyAboutTitle, sections.host)}
          description={content.companyAboutDescription}
          image={content.companyAboutImage}
          reverse
        />
      ) : null}

      {sponsors.length ? (
        <Container
          id="sponsors"
          wrapperClassName={`pattern-checker bg-(--event-base-bg) ${BAND}`}
        >
          <SectionHeading
            index={sectionIndex("sponsors")}
            title={text(content.sponsorsTitle, sections.sponsors)}
            description={content.sponsorsDescription}
          />
          <div className="mt-12">
            <SponsorsGrid sponsors={sponsors} />
          </div>
        </Container>
      ) : null}

      {faqs.length ? (
        <Container
          id="faqs"
          wrapperClassName={`bg-(--jaipur-emerald) text-(--jaipur-plaster) ${BAND}`}
        >
          <SectionHeading
            index={sectionIndex("faqs")}
            inverted
            title={text(content.faqsTitle, sections.faqs)}
            description={content.faqsDescription}
          />
          <div className="mt-12">
            <FaqList faqs={faqs} />
          </div>
        </Container>
      ) : null}
    </main>
  );
}
