import Image from "next/image";

import { cn } from "@/lib/utils";

import { ArchFrame } from "./arch-frame";
import { Container } from "./container";
import { Tape } from "./ornament";
import { SectionHeading } from "./section-heading";

type ContentSectionProps = {
  id: string;
  title: string;
  description?: string | null;
  image?: string | null;
  index?: number;
  /** Flips the image to the left so stacked content sections alternate. */
  reverse?: boolean;
  /** Full-bleed band colour, applied to the outer <section>. */
  wrapperClassName?: string;
  /** Arch-clips the image instead of framing it square. */
  arch?: boolean;
  /** Colour class for the torn edge overhanging this band. */
  tornEdge?: string;
};

export function ContentSection({
  id,
  title,
  description,
  image,
  index,
  reverse = false,
  wrapperClassName,
  arch = false,
  tornEdge,
}: ContentSectionProps) {
  return (
    <Container
      id={id}
      tornEdge={tornEdge}
      wrapperClassName={cn(
        "border-b-[4px] border-(--jaipur-ink)",
        wrapperClassName,
      )}
      className={cn(
        "grid max-w-7xl gap-10",
        image && "lg:grid-cols-2 lg:items-center lg:gap-14",
      )}
    >
      <div className={cn(reverse && "lg:order-2")}>
        <SectionHeading title={title} description={description} index={index} />
      </div>

      {image ? (
        arch ? (
          <div className={cn("zine-tilt-b relative", reverse && "lg:order-1")}>
            <Tape rotate={-9} className="-top-4 left-8 z-20" />
            <ArchFrame
              src={image}
              shadow
              photocopy
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-3/4 w-full"
            />
          </div>
        ) : (
          <div className={cn("zine-tilt-a relative", reverse && "lg:order-1")}>
            <Tape rotate={8} className="-top-4 right-10 z-20" />
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 bg-(--jaipur-ink)"
            />
            <div className="brut-frame-flat zine-halftone relative aspect-4/3 w-full overflow-hidden bg-(--jaipur-plaster)">
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="zine-photocopy object-cover"
              />
            </div>
          </div>
        )
      ) : null}
    </Container>
  );
}
