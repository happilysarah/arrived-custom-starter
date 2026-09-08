"use client";

import { ScrollLink } from "./scroll-link";

export type NavLinkItem = {
  label: string;
  href: string;
};

type NavbarProps = {
  nav: NavLinkItem[];
  ctaText?: string;
  ctaHref?: string;
};

export function Navbar({ nav, ctaText, ctaHref }: NavbarProps) {
  return (
    <nav className="hidden items-center gap-2 lg:flex">
      {nav.map((link) => (
        <ScrollLink
          key={link.href}
          href={link.href}
          className="brut-label border-[2px] border-transparent px-2.5 py-2 whitespace-nowrap text-(--event-base-text) transition-colors hover:border-(--jaipur-ink) hover:bg-(--jaipur-marigold)"
        >
          {link.label}
        </ScrollLink>
      ))}

      {ctaHref && ctaText ? (
        <ScrollLink
          href={ctaHref}
          className="brut-label brut-frame brut-lift ml-2 bg-(--event-primary-bg) px-4 py-2.5 whitespace-nowrap text-(--event-primary-text)"
        >
          {ctaText}
        </ScrollLink>
      ) : null}
    </nav>
  );
}
