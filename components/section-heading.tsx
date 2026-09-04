import { Markdown } from "./markdown";

type SectionHeadingProps = {
  title: string;
  description?: string | null;
};

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="text-left">
      <h2 className="font-heading text-3xl font-semibold sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <div className="mt-3 text-base opacity-80 md:text-lg">
          <Markdown>{description}</Markdown>
        </div>
      ) : null}
    </div>
  );
}
