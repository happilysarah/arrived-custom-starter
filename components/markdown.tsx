import ReactMarkdown from "react-markdown";

type MarkdownProps = {
  children: string;
  className?: string;
};

/**
 * CMS prose. Headings inherit the display face and links get a thick pink
 * underline instead of a hairline, so authored copy still reads as part of the
 * brutalist system without the author needing to know about it.
 */
const PROSE =
  "[&_h1]:brut-display [&_h1]:text-3xl [&_h2]:brut-display [&_h2]:text-2xl [&_h3]:brut-display [&_h3]:text-xl " +
  "[&_h1]:mt-6 [&_h2]:mt-6 [&_h3]:mt-5 [&_h1:first-child]:mt-0 [&_h2:first-child]:mt-0 [&_h3:first-child]:mt-0 " +
  "[&_a]:font-semibold [&_a]:underline [&_a]:decoration-[3px] [&_a]:decoration-(--jaipur-pink) [&_a]:underline-offset-4 " +
  "[&_p+p]:mt-4 [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-5 [&_li]:mt-1.5 " +
  "[&_blockquote]:border-l-[6px] [&_blockquote]:border-(--jaipur-marigold) [&_blockquote]:pl-4 [&_blockquote]:italic " +
  "[&_strong]:font-bold [&_code]:font-mono [&_code]:text-[0.9em] [&_hr]:my-6 [&_hr]:border-t-[3px] [&_hr]:border-current [&_hr]:opacity-30";

export function Markdown({ children, className = "" }: MarkdownProps) {
  return (
    <div className={`${PROSE} ${className}`}>
      <ReactMarkdown
        components={{
          a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
