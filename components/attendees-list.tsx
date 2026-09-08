import type { PublicAttendeesData } from "@/lib/happily/types";

import { SectionHeading } from "./section-heading";

type AttendeesListProps = {
  attendees: NonNullable<PublicAttendeesData>["attendees"];
  title?: string;
};

export function AttendeesList({
  attendees,
  title = "Who's coming",
}: AttendeesListProps) {
  if (!attendees.length) {
    return null;
  }

  return (
    <section className="brut-frame-lg bg-(--event-base-bg) p-6 text-left text-(--event-base-text) sm:p-10">
      <SectionHeading title={title} />

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {attendees.map((attendee) => {
          const name = [attendee.first_name, attendee.last_name]
            .filter(Boolean)
            .join(" ");
          const role = [attendee.job_title, attendee.company]
            .filter(Boolean)
            .join(", ");

          return (
            <li
              key={attendee.id}
              className="brut-frame-flat bg-(--jaipur-plaster) p-4"
            >
              <p className="brut-display text-lg">{name}</p>
              {role ? (
                <p className="brut-label mt-2 opacity-70">{role}</p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
