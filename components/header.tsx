"use client";

import Image from "next/image";
import Link from "next/link";

import { MobileMenu } from "./mobile-menu";
import type { NavLinkItem } from "./navbar";
import { Navbar } from "./navbar";

type HeaderProps = {
  logo?: string | null;
  logoAlt?: string;
  nav: NavLinkItem[];
  ctaText?: string;
  ctaHref?: string;
  hideNavigation?: boolean;
  /** Wordmark shown when the event has no logo — brutalism abhors a gap. */
  fallbackWordmark?: string;
};

export function Header({
  logo,
  logoAlt = "Logo",
  nav,
  ctaText,
  ctaHref,
  hideNavigation = false,
  fallbackWordmark,
}: HeaderProps) {
  if (hideNavigation) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-(--jaipur-ink) bg-(--event-base-bg)">
      {/* Colour-block rule: four hard bands instead of a hairline border. */}
      <div aria-hidden="true" className="flex h-1.5">
        <span className="flex-1 bg-(--jaipur-pink)" />
        <span className="flex-1 bg-(--jaipur-marigold)" />
        <span className="flex-1 bg-(--jaipur-emerald)" />
        <span className="flex-1 bg-(--happily-violet)" />
        <span className="flex-1 bg-(--jaipur-indigo)" />
      </div>

      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <div className="relative z-60 flex items-center">
          <Link href="/" className="inline-flex items-center">
            {logo ? (
              <Image
                src={logo}
                alt={logoAlt}
                width={250}
                height={100}
                className="relative z-60 max-h-11 w-auto max-w-40 object-contain object-left sm:max-w-52"
                draggable={false}
              />
            ) : (
              <span className="brut-display brut-frame-flat bg-(--jaipur-pink) px-3 py-1.5 text-lg text-(--jaipur-plaster) sm:text-xl">
                {fallbackWordmark}
              </span>
            )}
          </Link>
        </div>

        <Navbar nav={nav} ctaText={ctaText} ctaHref={ctaHref} />
        <div className="lg:hidden">
          <MobileMenu nav={nav} ctaText={ctaText} ctaHref={ctaHref} />
        </div>
      </div>
    </header>
  );
}
