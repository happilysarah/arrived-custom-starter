import type { PublicEventData } from "@/lib/happily/types";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ordered } from "./helpers";
import { Markdown } from "./markdown";

type FaqListProps = {
  faqs: PublicEventData["faqs"];
};

export function FaqList({ faqs }: FaqListProps) {
  return (
    <Accordion type="multiple" className="grid gap-5">
      {ordered(faqs).map((faq, index) => (
        <AccordionItem
          key={faq.id}
          value={String(faq.id)}
          className="brut-frame border-b-[3px] bg-(--event-base-bg) px-5 text-(--event-base-text) last:border-b-[3px]"
        >
          <AccordionTrigger className="brut-display gap-4 py-5 text-left text-xl hover:no-underline sm:text-2xl [&>svg]:size-6 [&>svg]:stroke-[3]">
            <span className="flex items-baseline gap-4">
              <span className="brut-label shrink-0 text-(--jaipur-pink)">
                {String(index + 1).padStart(2, "0")}
              </span>
              {faq.question}
            </span>
          </AccordionTrigger>
          <AccordionContent className="border-t-[3px] border-dashed border-(--jaipur-ink)/30 pt-4 pb-5 text-base leading-relaxed">
            <Markdown>{faq.answer}</Markdown>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
