import Image from "next/image";

import { Marquee } from "./marquee";
import { ScallopBar } from "./ornament";

type FooterProps = {
  /** Event name, set as the oversized outgoing wordmark. */
  eventName: string;
  /** Location line under the wordmark. */
  location?: string | null;
  /** Phrases for the closing ticker. */
  marqueeItems: string[];
};

export function Footer({ eventName, location, marqueeItems }: FooterProps) {
  return (
    <footer className="z-10 mt-auto">
      <Marquee
        items={marqueeItems}
        durationSeconds={38}
        wrapperClassName="bg-(--jaipur-marigold) text-(--jaipur-ink)"
      />

      <div className="relative bg-(--event-secondary-bg) text-(--event-secondary-text)">
        {/* Jharokha eave biting into the top of the indigo band. */}
        <ScallopBar
          className="absolute inset-x-0 top-0 h-3 w-full text-(--jaipur-marigold)"
          aria-hidden="true"
        />

        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 pt-16 pb-10 text-center sm:px-8">
          <p className="brut-display text-4xl break-words sm:text-6xl lg:text-7xl">
            {eventName}
          </p>
          {location ? (
            <p className="brut-label text-(--event-secondary-text)/70">
              {location}
            </p>
          ) : null}

          {/* The indigo band is a dark surface, so this takes the "dark"
              mark — the variant drawn in near-white and Happily violet. */}
          <a
            href="https://teamhappily.com/arrived?ref=starter-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-[3px] border-(--event-secondary-text) px-4 py-3"
          >
            <Image
              src="/powered-by-happily-arrived-dark.svg"
              width={292}
              height={55}
              className="h-8 w-auto object-contain"
              alt="Powered by Happily Arrived"
              draggable={false}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
