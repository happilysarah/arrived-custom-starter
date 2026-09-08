import type { PublicEventData } from "@/lib/happily/types";

import { ordered } from "./helpers";
import { SpeakerCard } from "./speaker-card";

type SpeakersGridProps = {
  speakers: PublicEventData["speakers"];
};

export function SpeakersGrid({ speakers }: SpeakersGridProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {ordered(speakers).map((speaker, index) => (
        <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
      ))}
    </div>
  );
}
