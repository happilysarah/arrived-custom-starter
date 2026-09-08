"use client";

import { Dialog as DialogPrimitive, VisuallyHidden } from "radix-ui";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import type { NavLinkItem } from "./navbar";
import { ScrollLink } from "./scroll-link";

type MobileMenuProps = {
  nav: NavLinkItem[];
  ctaText?: string;
  ctaHref?: string;
};

/**
 * Cycled behind the nav numbers so the panel colour-blocks like the page.
 * Dark tints only — the numerals are set in plaster, and marigold doesn't
 * carry light text.
 */
const SWATCHES = [
  "bg-(--jaipur-pink)",
  "bg-(--jaipur-emerald)",
  "bg-(--jaipur-indigo)",
  "bg-(--happily-violet)",
  "bg-(--jaipur-terracotta)",
];

export function MobileMenu({ nav, ctaText, ctaHref }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger
        aria-label="Open menu"
        className="brut-frame brut-lift inline-flex size-11 items-center justify-center bg-(--jaipur-marigold) text-(--jaipur-ink)"
      >
        <MenuIcon className="size-5" strokeWidth={3} />
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-(--jaipur-ink)/60 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l-[4px] border-(--jaipur-ink) bg-(--event-base-bg) text-(--event-base-text) outline-none",
            "data-open:animate-in data-open:slide-in-from-right",
            "data-closed:animate-out data-closed:slide-out-to-right",
          )}
        >
          <VisuallyHidden.Root>
            <DialogPrimitive.Title>Navigation</DialogPrimitive.Title>
          </VisuallyHidden.Root>

          <div className="flex items-center justify-between border-b-[3px] border-(--jaipur-ink) bg-(--jaipur-pink) px-4 py-3">
            <span className="brut-label text-(--jaipur-plaster)">Menu</span>
            <DialogPrimitive.Close
              aria-label="Close menu"
              className="brut-frame-flat inline-flex size-10 items-center justify-center bg-(--event-base-bg) text-(--jaipur-ink)"
            >
              <XIcon className="size-5" strokeWidth={3} />
            </DialogPrimitive.Close>
          </div>

          <nav className="flex flex-1 flex-col overflow-y-auto">
            {nav.map((link, index) => (
              <ScrollLink
                key={link.href}
                href={link.href}
                onClick={() => !link.href.includes("#") && setOpen(false)}
                onAfterScroll={() => setOpen(false)}
                className="group flex items-center gap-4 border-b-[3px] border-(--jaipur-ink) px-4 py-4 transition-colors hover:bg-(--jaipur-marigold)"
              >
                <span
                  className={cn(
                    "brut-label flex size-8 shrink-0 items-center justify-center border-[2px] border-(--jaipur-ink) text-(--jaipur-plaster)",
                    SWATCHES[index % SWATCHES.length],
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="brut-display text-2xl">{link.label}</span>
              </ScrollLink>
            ))}
          </nav>

          {ctaHref && ctaText ? (
            <div className="mt-auto p-4">
              <ScrollLink
                href={ctaHref}
                onAfterScroll={() => setOpen(false)}
                className="brut-display brut-frame brut-lift block bg-(--event-primary-bg) px-4 py-4 text-center text-xl text-(--event-primary-text)"
              >
                {ctaText}
              </ScrollLink>
            </div>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
