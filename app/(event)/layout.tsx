import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Archivo_Black, Open_Sans, Space_Mono } from "next/font/google";
import "../globals.css";

import { EventShell } from "@/components/event-shell";
import { OrnamentDefs } from "@/components/ornament";
import { PreviewBanner } from "@/components/preview-banner";
import { JAIPUR_THEME } from "@/components/theme";
import { isPreviewRequest, resolveEventEnv } from "@/lib/happily/config";
import { getPublicEvent } from "@/lib/happily/queries";

// First-party analytics proxy host.
const ANALYTICS_HOST = "https://hx.happily.events";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

// Display face for every heading, the marquee and the stickers. Archivo Black
// ships a single 900-ish weight, which is exactly the blunt, single-register
// voice brutalism wants — there is no lighter cut to fall back to.
const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

// Mono carries the small stuff: eyebrows, chips, agenda times, field labels.
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { event } = await getPublicEvent();
  const { metadata } = event;

  return {
    title: metadata.title || event.name,
    description: metadata.description || "",
    ...(metadata.allow_search_engine_indexing === false && {
      robots: "noindex, nofollow",
    }),
    openGraph: {
      ...(metadata.image_url && { images: [metadata.image_url] }),
    },
  };
}

export default async function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const preview = await isPreviewRequest();
  const env = await resolveEventEnv();
  const eventData = await getPublicEvent({ env });

  // Only track published-site visits: no analytics in preview or when
  // the event has no analytics configured.
  const analyticsId = env === "prod" ? eventData.event.analytics_id : null;

  // This fork pins its palette instead of reading event.styles — see the note
  // in components/theme.ts. The design is built on specific colour
  // relationships (ink frames on plaster, marigold/pink/indigo blocking), and
  // a CMS palette of #171717-on-#ffffff would flatten all of it to greyscale.
  const eventVars = {
    "--event-primary-bg": JAIPUR_THEME.primaryBg,
    "--event-primary-text": JAIPUR_THEME.primaryText,
    "--event-secondary-bg": JAIPUR_THEME.secondaryBg,
    "--event-secondary-text": JAIPUR_THEME.secondaryText,
    "--event-accent-bg": JAIPUR_THEME.accentBg,
    "--event-accent-text": JAIPUR_THEME.accentText,
    "--event-base-bg": JAIPUR_THEME.baseBg,
    "--event-base-text": JAIPUR_THEME.baseText,
    "--event-border-radius": JAIPUR_THEME.borderRadius,
  } as CSSProperties;

  return (
    <html
      lang="en"
      className={`${openSans.variable} ${archivoBlack.variable} ${spaceMono.variable} ${openSans.className} h-full antialiased`}
    >
      <body style={eventVars} className="min-h-full flex flex-col">
        <OrnamentDefs />
        {preview && <PreviewBanner />}
        {analyticsId && (
          <script
            defer
            src={`${ANALYTICS_HOST}/script.js`}
            data-host-url={ANALYTICS_HOST}
            data-website-id={analyticsId}
          />
        )}
        <EventShell eventData={eventData}>{children}</EventShell>
      </body>
    </html>
  );
}
