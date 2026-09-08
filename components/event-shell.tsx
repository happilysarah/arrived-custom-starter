import type { ReactNode } from "react";

import type { PublicEventData } from "@/lib/happily/types";

import { RETREAT_COPY } from "./copy";
import { Footer } from "./footer";
import { Header } from "./header";
import { text } from "./helpers";
import type { NavLinkItem } from "./navbar";

type EventShellProps = {
  eventData: PublicEventData;
  children: ReactNode;
};

export function EventShell({ eventData, children }: EventShellProps) {
  const { event } = eventData;
  const { nav: navCopy } = RETREAT_COPY;

  // Short labels here; hrefs must keep matching the section ids set in
  // event-page.tsx.
  const nav: NavLinkItem[] = [
    { label: navCopy.about, href: "/#about" },
    { label: navCopy.agenda, href: "/#agenda" },
    { label: navCopy.speakers, href: "/#speakers" },
    { label: navCopy.host, href: "/#host" },
    { label: navCopy.sponsors, href: "/#sponsors" },
    { label: navCopy.faqs, href: "/#faqs" },
    ...(event.photos_toggle
      ? [{ label: navCopy.photos, href: "/photos" }]
      : []),
  ];

  const buttonLinks = event.display_settings.buttonLinks;
  const showCta =
    eventData.form?.is_active &&
    buttonLinks?.navCTA.display &&
    buttonLinks.heroCTA.text;

  const location = text(event.location, RETREAT_COPY.location);

  return (
    <div className="pattern-blockprint flex min-h-screen flex-col bg-(--event-base-bg) text-(--event-base-text)">
      <Header
        logo={event.logo_url}
        logoAlt={`${event.name} logo`}
        fallbackWordmark={event.name}
        nav={nav}
        hideNavigation={event.display_settings.hideNavigation ?? false}
        ctaText={
          showCta ? text(buttonLinks!.heroCTA.text, "Register") : undefined
        }
        ctaHref={showCta ? "/#register" : undefined}
      />
      {children}
      <Footer
        eventName={event.name}
        location={location}
        marqueeItems={[...RETREAT_COPY.marquee]}
      />
    </div>
  );
}
