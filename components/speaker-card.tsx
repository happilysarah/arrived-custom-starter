"use client";

import { Dialog as DialogPrimitive } from "radix-ui";
import { XIcon } from "lucide-react";
import { SocialIcon } from "react-social-icons";

import { Markdown } from "@/components/markdown";
import type { PublicEventData } from "@/lib/happily/types";
import { cn } from "@/lib/utils";

import { ArchFrame } from "./arch-frame";
import { ARCH_CLIP_ID, JharokhaArch, Tape } from "./ornament";

type SpeakerCardProps = {
  speaker: PublicEventData["speakers"][number];
  /** Position in the grid — drives the cycled portrait-panel colour. */
  index?: number;
};

/** Alternating lean, so the grid reads as separately glued cuttings. */
const TILTS = ["zine-tilt-c", "zine-tilt-b", "zine-tilt-a"];

const PANEL_COLORS = [
  "bg-(--jaipur-pink)",
  "bg-(--jaipur-marigold)",
  "bg-(--jaipur-emerald)",
  "bg-(--jaipur-indigo)",
  "bg-(--jaipur-terracotta)",
  "bg-(--happily-violet)",
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase();
}

export function SpeakerCard({ speaker, index = 0 }: SpeakerCardProps) {
  // website_url is a single string, so it has to be listed — not spread, which
  // would splat it into one entry per character.
  const links = [speaker.website_url, ...speaker.social_urls].filter(
    (url): url is string => Boolean(url),
  );
  const role = [speaker.title, speaker.company].filter(Boolean).join(", ");
  const panel = PANEL_COLORS[index % PANEL_COLORS.length];
  const tilt = TILTS[index % TILTS.length];

  return (
    <DialogPrimitive.Root>
      <article
        className={cn(
          "brut-frame relative flex h-full flex-col bg-(--event-base-bg) text-(--event-base-text)",
          tilt,
        )}
      >
        <Tape
          rotate={index % 2 ? 9 : -10}
          className={cn("-top-3.5 z-20 h-6 w-20", index % 2 ? "right-6" : "left-5")}
        />
        <div
          className={cn(
            "flex items-end justify-center border-b-[3px] border-(--jaipur-ink) px-6 pt-6",
            panel,
          )}
        >
          {speaker.image_url ? (
            <ArchFrame
              src={speaker.image_url}
              photocopy
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 80vw"
              className="aspect-3/4 w-full max-w-52"
            />
          ) : (
            <div className="relative aspect-3/4 w-full max-w-52">
              <span
                className="brut-display flex size-full items-end justify-center bg-(--jaipur-ink)/25 pb-8 text-5xl text-(--jaipur-plaster)"
                style={{ clipPath: `url(#${ARCH_CLIP_ID})` }}
              >
                {initials(speaker.name)}
              </span>
              <JharokhaArch
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 size-full text-(--jaipur-ink)"
              />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="brut-display text-2xl">{speaker.name}</h3>
          {role ? <p className="brut-label mt-2 opacity-80">{role}</p> : null}

          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <div className="flex flex-wrap items-center gap-1">
              {links.map((url) => (
                <SocialIcon
                  key={url}
                  url={url}
                  style={{ width: 34, height: 34 }}
                  bgColor="transparent"
                  fgColor="var(--jaipur-ink)"
                  target="_blank"
                  rel="noreferrer"
                />
              ))}
            </div>

            {speaker.bio ? (
              <DialogPrimitive.Trigger className="brut-label brut-frame-flat cursor-pointer bg-(--jaipur-marigold) px-3 py-2 text-(--jaipur-ink) transition-colors hover:bg-(--jaipur-pink) hover:text-(--jaipur-plaster)">
                Read bio
              </DialogPrimitive.Trigger>
            ) : null}
          </div>
        </div>
      </article>

      {/* Radix directly rather than components/ui/dialog: that skin renders its
          own blurred overlay and ghost close button with no way to restyle
          either per instance, and both read as the opposite of this design.
          Same approach mobile-menu.tsx takes. */}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-(--jaipur-ink)/70 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 z-50 grid max-h-[85vh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto border-[4px] border-(--jaipur-ink) bg-(--event-base-bg) text-(--event-base-text) shadow-[10px_10px_0_0_var(--jaipur-ink)] outline-none data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0">
        <DialogPrimitive.Description className="sr-only">
          Speaker details
        </DialogPrimitive.Description>

        <DialogPrimitive.Close
          aria-label="Close"
          className="brut-frame-flat absolute top-4 right-4 z-10 inline-flex size-9 items-center justify-center bg-(--event-base-bg) text-(--jaipur-ink) transition-colors hover:bg-(--jaipur-marigold)"
        >
          <XIcon className="size-4" strokeWidth={3} />
        </DialogPrimitive.Close>

        <div className={cn("border-b-[3px] border-(--jaipur-ink) p-6", panel)}>
          {speaker.image_url ? (
            <ArchFrame
              src={speaker.image_url}
              photocopy
              sizes="160px"
              className="mx-auto aspect-3/4 w-40"
            />
          ) : null}
          <DialogPrimitive.Title className="brut-display mt-5 text-center text-3xl text-(--jaipur-plaster) [text-shadow:2px_2px_0_var(--jaipur-ink)]">
            {speaker.name}
          </DialogPrimitive.Title>
          {role ? (
            <p className="brut-label mt-3 text-center text-(--jaipur-plaster)">
              {role}
            </p>
          ) : null}
        </div>

        <div className="space-y-5 p-6">
          {speaker.website_url ? (
            <p className="text-center">
              <a
                href={speaker.website_url}
                target="_blank"
                rel="noreferrer"
                className="brut-label border-b-[3px] border-(--jaipur-pink) pb-0.5"
              >
                {speaker.website_url.replace(/^https?:\/\//, "")}
              </a>
            </p>
          ) : null}

          {speaker.bio ? (
            <Markdown className="text-sm leading-relaxed sm:text-base">
              {speaker.bio}
            </Markdown>
          ) : null}

          {speaker.social_urls.length > 0 ? (
            <ul className="flex flex-row justify-center gap-1">
              {speaker.social_urls.map((url) => (
                <li key={url}>
                  <SocialIcon
                    style={{ width: 38, height: 38 }}
                    url={url}
                    bgColor="transparent"
                    fgColor="var(--jaipur-ink)"
                    target="_blank"
                    rel="noreferrer"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
