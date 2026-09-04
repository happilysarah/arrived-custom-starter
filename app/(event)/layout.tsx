import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import "../globals.css";

import { EventShell } from "@/components/event-shell";
import { styleValue } from "@/components/helpers";
import { PreviewBanner } from "@/components/preview-banner";
import { isPreviewRequest, resolveEventEnv } from "@/lib/happily/config";
import { getPublicEvent } from "@/lib/happily/queries";

// First-party analytics proxy host.
const ANALYTICS_HOST = "https://hx.happily.events";

// Warm, organic pairing: a soft-edged display serif for headings, a
// humanist grotesque for body copy.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
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
  const styles = eventData.event.styles;

  // Only track published-site visits: no analytics in preview or when
  // the event has no analytics configured.
  const analyticsId = env === "prod" ? eventData.event.analytics_id : null;

  // Warm organic fallback palette: espresso, terracotta, and sage over a
  // linen base. Used only when the event record doesn't set its own styles.
  const eventVars = {
    "--event-primary-bg": styleValue(styles, "primaryBg", "#3A2E22"),
    "--event-primary-text": styleValue(styles, "primaryText", "#FBF3E7"),
    "--event-secondary-bg": styleValue(styles, "secondaryBg", "#6B7A5E"),
    "--event-secondary-text": styleValue(styles, "secondaryText", "#FBF3E7"),
    "--event-accent-bg": styleValue(styles, "accentBg", "#C1592E"),
    "--event-accent-text": styleValue(styles, "accentText", "#FBF3E7"),
    "--event-base-bg": styleValue(styles, "baseBg", "#FBF3E7"),
    "--event-base-text": styleValue(styles, "baseText", "#33261C"),
    "--event-border-radius": styleValue(styles, "borderRadius", "22px"),
  } as CSSProperties;

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${karla.variable} ${karla.className} h-full antialiased`}
    >
      <body style={eventVars} className="min-h-full flex flex-col">
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
