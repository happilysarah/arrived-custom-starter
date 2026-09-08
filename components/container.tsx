import { cn } from "@/lib/utils";

import { TornEdge } from "./ornament";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  /**
   * Colour class for a torn paper edge overhanging the bottom of this band,
   * e.g. "text-(--jaipur-indigo)". Fill it with the band's *own* colour: the
   * sheet then tears over the section below, the way a paste-up overlaps.
   */
  tornEdge?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function Container({
  children,
  className,
  wrapperClassName,
  tornEdge,
  ...props
}: ContainerProps) {
  return (
    <section
      className={cn(
        "relative w-full px-4 py-20 sm:px-8 sm:py-24",
        wrapperClassName,
      )}
    >
      <div className={cn("mx-auto max-w-7xl", className)} {...props}>
        {children}
      </div>
      {tornEdge ? (
        <TornEdge
          className={cn(
            "pointer-events-none absolute -bottom-4 left-0 z-10 h-5 w-full",
            tornEdge,
          )}
        />
      ) : null}
    </section>
  );
}
