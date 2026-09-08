/**
 * Jaipur retreat — maximalist brutalist palette.
 *
 * This fork pins its palette rather than reading `event.styles` from the CMS.
 * The design leans on specific colour relationships (ink-on-plaster frames,
 * marigold/pink/indigo colour blocking, hard black shadows), and a generic
 * CMS palette — the usual `#171717` on `#ffffff` — collapses all of it into
 * greyscale. `app/(event)/layout.tsx` maps these onto the nine `--event-*`
 * custom properties.
 *
 * To hand control back to the CMS, swap the `JAIPUR_THEME` lookups in
 * `layout.tsx` back to `styleValue(styles, "<key>", JAIPUR_THEME.<key>)`.
 */
export const JAIPUR_THEME = {
  /** Jaipur pink — highest-emphasis CTAs (nav + form submit). */
  primaryBg: "#D81E5B",
  primaryText: "#FFF6E9",

  /** Sanganeri indigo — quieter surfaces (footer, inverted bands). */
  secondaryBg: "#1B2A6B",
  secondaryText: "#F7EEDD",

  /** Marigold — the loud highlight bands (hero CTA, register section). */
  accentBg: "#F5B301",
  accentText: "#150F0B",

  /** Lime-washed plaster and ink — the page's rest state. */
  baseBg: "#F7EEDD",
  baseText: "#150F0B",

  /** Brutalism has no radius. Every corner is square, on purpose. */
  borderRadius: "0px",
} as const;
