import Image from "next/image";

import { cn } from "@/lib/utils";

import { ArchFrame } from "./arch-frame";
import { Container } from "./container";
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
}: ContentSectionProps) {
  return (
    <Container
      id={id}
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
          <ArchFrame
            src={image}
            shadow
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={cn("aspect-3/4 w-full", reverse && "lg:order-1")}
          />
        ) : (
          <div className={cn("relative", reverse && "lg:order-1")}>
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 bg-(--jaipur-ink)"
            />
            <div className="brut-frame-flat relative aspect-4/3 w-full overflow-hidden bg-(--jaipur-indigo)">
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        )
      ) : null}
    </Container>
  );
}
