import Image from "next/image";

import type { PublicEventData } from "@/lib/happily/types";
import { cn } from "@/lib/utils";

import { ordered } from "./helpers";

type Sponsor = PublicEventData["sponsors"][number];
type SponsorTier = NonNullable<Sponsor["tier"]>;

type SponsorsGridProps = {
  sponsors: PublicEventData["sponsors"];
};

/**
 * Logo box height by tier depth. Top tier gets the biggest cell and each step
 * down shrinks by 15%, matching the original scale — the framing is new, the
 * hierarchy isn't.
 */
function logoHeight(tierIndex: number) {
  return 72 * Math.pow(0.85, tierIndex);
}

function SponsorCard({
  sponsor,
  tierIndex = 0,
}: {
  sponsor: Sponsor;
  tierIndex?: number;
}) {
  const height = logoHeight(tierIndex);

  const inner = sponsor.logo_url ? (
    <Image
      src={sponsor.logo_url}
      alt={sponsor.name}
      width={Math.round(height * 5)}
      height={Math.round(height)}
      className="w-auto max-w-full object-contain"
      style={{ height: `${height}px` }}
    />
  ) : (
    <p className="brut-display text-center text-xl">{sponsor.name}</p>
  );

  const cell = (
    <div
      className="brut-frame flex w-full items-center justify-center bg-(--jaipur-plaster) px-5 py-5 transition-colors group-hover:bg-(--jaipur-marigold)"
      style={{ minHeight: `${height + 40}px` }}
    >
      {inner}
    </div>
  );

  if (sponsor.website) {
    return (
      <a
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        {cell}
      </a>
    );
  }

  return <div className="group">{cell}</div>;
}

function extractTiers(sponsors: Sponsor[]): SponsorTier[] {
  const seen = new Map<number, SponsorTier>();
  for (const sponsor of sponsors) {
    if (sponsor.tier && !seen.has(sponsor.tier.id)) {
      seen.set(sponsor.tier.id, sponsor.tier);
    }
  }
  return ordered([...seen.values()]);
}

function TierRow({
  label,
  sponsors,
  tierIndex = 0,
}: {
  label?: string;
  sponsors: Sponsor[];
  tierIndex?: number;
}) {
  if (!sponsors.length) return null;

  return (
    <div className="w-full">
      {label ? (
        <div className="mb-5 flex items-center gap-4">
          <span className="brut-label brut-frame-flat bg-(--jaipur-indigo) px-3 py-2 text-(--jaipur-plaster)">
            {label}
          </span>
          <span aria-hidden="true" className="h-[3px] flex-1 bg-(--jaipur-ink)" />
        </div>
      ) : null}

      <div
        className={cn(
          "grid gap-6",
          // Top tiers get fewer, larger cells; lower tiers pack tighter.
          tierIndex === 0
            ? "sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
        )}
      >
        {sponsors.map((sponsor) => (
          <SponsorCard
            key={sponsor.id}
            sponsor={sponsor}
            tierIndex={tierIndex}
          />
        ))}
      </div>
    </div>
  );
}

export function SponsorsGrid({ sponsors }: SponsorsGridProps) {
  const tiers = extractTiers(sponsors);

  if (tiers.length === 0) {
    return <TierRow sponsors={ordered(sponsors)} />;
  }

  const sponsorsByTier = new Map<number, Sponsor[]>();
  const untiered: Sponsor[] = [];

  for (const sponsor of ordered(sponsors)) {
    if (sponsor.tier_id != null) {
      const group = sponsorsByTier.get(sponsor.tier_id) ?? [];
      group.push(sponsor);
      sponsorsByTier.set(sponsor.tier_id, group);
    } else {
      untiered.push(sponsor);
    }
  }

  return (
    <div className="flex flex-col gap-12">
      {tiers.map((tier, tierIndex) => (
        <TierRow
          key={tier.id}
          label={tier.name}
          sponsors={sponsorsByTier.get(tier.id) ?? []}
          tierIndex={tierIndex}
        />
      ))}
      <TierRow sponsors={untiered} tierIndex={tiers.length} />
    </div>
  );
}
