import { cn } from "@/lib/utils";

type RansomTextProps = {
  children: string;
  className?: string;
  /** Quieter mix for smaller headings — fewer coloured cuttings. */
  muted?: boolean;
};

/**
 * Ransom-note lettering: every character is a cutting from a different page,
 * pasted slightly askew.
 *
 * The variation is derived from the character and its position, never from
 * Math.random — a server render and the client hydration have to produce
 * byte-identical markup, and a random tilt would mismatch on every letter.
 *
 * Words stay whole (each is an inline-block) so a line break never lands in
 * the middle of one, and the whole string is exposed to assistive tech as
 * plain text via aria-label with the letters hidden.
 */

/** Paper cuttings are white, not page-coloured, and keep a cut edge — a
 *  plaster letter on the plaster ground would simply disappear. */
const PAPER = "bg-white text-(--jaipur-ink) ring-[1.5px] ring-(--jaipur-ink)/70";

const CUTS = [
  "bg-(--jaipur-ink) text-white",
  PAPER,
  "bg-(--zine-shock) text-white",
  PAPER,
  "bg-(--jaipur-marigold) text-(--jaipur-ink)",
  PAPER,
  "bg-(--jaipur-indigo) text-white",
  PAPER,
];

const MUTED_CUTS = [PAPER, "bg-(--jaipur-ink) text-white", PAPER, PAPER];

const FACES = ["font-display", "font-typewriter", "font-display", "font-sans font-black"];
const TILTS = [-3.2, 1.9, -1.1, 2.8, -2.4, 0.9, 2.2, -1.7, 3.1, -0.8];
const SHIFTS = [0, -2, 1, -1, 2, 0, -3, 1];

/** Small stable hash — same input, same cutting, every render. */
function pick(char: string, index: number, length: number) {
  return (char.charCodeAt(0) * 31 + index * 17) % length;
}

export function RansomText({ children, className, muted = false }: RansomTextProps) {
  const cuts = muted ? MUTED_CUTS : CUTS;
  const words = children.split(" ").filter(Boolean);

  return (
    <span aria-label={children} className={cn("inline", className)}>
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          aria-hidden="true"
          className="mr-[0.28em] inline-block whitespace-nowrap"
        >
          {[...word].map((char, charIndex) => {
            const seed = wordIndex * 7 + charIndex;
            return (
              <span
                key={charIndex}
                className={cn(
                  "zine-letter",
                  cuts[pick(char, seed, cuts.length)],
                  FACES[pick(char, seed + 3, FACES.length)],
                )}
                style={{
                  transform: `rotate(${TILTS[pick(char, seed + 1, TILTS.length)]}deg)`,
                  marginTop: `${SHIFTS[pick(char, seed + 2, SHIFTS.length)]}px`,
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
