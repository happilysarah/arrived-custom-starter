/**
 * Retreat-voice fallbacks.
 *
 * Every string here is a *fallback* — whatever the CMS supplies on
 * `event.content` always wins. They live in one file so the retreat's tone can
 * be rewritten without touching layout code, and so an event that hasn't had
 * its copy filled in still reads like this retreat rather than like a generic
 * conference ("About", "Speakers", "FAQs").
 */
export const RETREAT_COPY = {
  /** Shown above the hero title when `content.companyName` is empty. */
  eyebrow: "A Slow Retreat",
  /** Shown under the hero title when `content.heroText` is empty. */
  heroText:
    "Seven days inside the Pink City — courtyard mornings, block-print afternoons, and rooftop dinners under the Aravalli haze.",
  /** Used for the hero location chip and marquee when the CMS has no location. */
  location: "Jaipur · Rajasthan",

  /** Section headings — the long, editorial form. */
  sections: {
    about: "The Retreat",
    agenda: "The Itinerary",
    speakers: "Your Hosts",
    host: "Who's Behind It",
    sponsors: "In Good Company",
    faqs: "Good To Know",
    register: "Claim Your Room",
  },

  /**
   * Nav labels — short forms of the same sections. The header sets them in
   * mono at a wide tracking, so the editorial headings above wrap to two lines
   * and crowd the CTA off the bar.
   */
  nav: {
    about: "Retreat",
    agenda: "Itinerary",
    speakers: "Hosts",
    host: "Studio",
    sponsors: "Partners",
    faqs: "FAQ",
    photos: "Gallery",
  },

  /** Ticker phrases for the marquee strips. */
  marquee: [
    "JAIPUR",
    "PINK CITY",
    "SEVEN DAYS",
    "BLOCK PRINT",
    "ROOFTOP DINNERS",
    "AMBER FORT",
    "SLOW MORNINGS",
    "LIMITED ROOMS",
  ],
} as const;
