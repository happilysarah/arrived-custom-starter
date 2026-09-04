import type { HappilyEnv, PublicEventData } from "@/lib/happily/types";

type EventPageProps = {
  eventData: PublicEventData;
  eventId: string;
  env: HappilyEnv;
};

const program = [
  ["14:00", "Doors + Medellín street lunch", "eat first"],
  ["15:00", "The anti-conference opening", "15 min"],
  ["15:20", "How culture gets built now", "live conversation"],
  ["16:00", "360° demos from the floor", "no stage"],
  ["17:00", "Medellín field sessions", "city breakouts"],
  ["19:30", "Family meal", "long tables"],
  ["21:30", "ARRIVED LIVE", "phones up"],
  ["00:00", "Keep going", "you decide"],
];

const people = [
  ["FOUNDERS", "building new rituals"],
  ["ARTISTS", "who understand crowds"],
  ["PRODUCERS", "who make impossible happen"],
  ["DESIGNERS", "obsessed with details"],
  ["DJs", "because timing is everything"],
  ["CHEFS", "hospitality is the medium"],
  ["TECH", "building the new stack"],
  ["YOU?", "300 people / curated hard"],
];

export function EventPage(_: EventPageProps) {
  return (
    <main className="summit-page">
      <div className="summit-scanlines" aria-hidden="true" />
      <div className="summit-noise" aria-hidden="true" />
      <div className="summit-topbar">
        <div className="summit-status"><span className="summit-dot" /><span>ARRIVED NETWORK / NODE 0027</span></div>
        <span>MEDELLÍN CO / SIGNAL LIVE</span>
      </div>
      <nav className="summit-nav" aria-label="Main navigation">
        <a className="summit-brand" href="#top" aria-label="Arrived Summit home">ARRIVED<sup>®</sup></a>
        <div className="summit-navlinks">
          <a href="#why">System</a><a href="#schedule">Program</a><a href="#room">Room</a>
          <a className="summit-join" href="#rsvp">Request access</a>
        </div>
      </nav>

      <section className="summit-hero" id="top">
        <div className="summit-window">
          <div className="summit-windowbar"><span>arrived_summit_medellin.exe</span><div className="summit-controls" aria-hidden="true"><i /><i /><i /></div></div>
          <div className="summit-hero-grid">
            <div className="summit-hero-copy">
              <span className="summit-eyebrow">one room / one city / no spectators</span>
              <h1><span>ARRIVED</span><span>SUMMIT</span></h1>
              <p className="summit-deck">A live summit for the people <strong>building culture IRL.</strong> Medellín. 300 people. Zero ballroom energy.</p>
              <div className="summit-meta"><span>Medellín / Colombia</span><span>June 2027</span><span>300 humans</span><span>talks + dinner + live room</span></div>
            </div>
            <div className="summit-visual" aria-label="Abstract pastel orb reading Medellín 2027">
              <div className="summit-blob" /><div className="summit-orbit" /><div className="summit-sat">NO<br />GREEN<br />ROOM</div>
              <div className="summit-visual-note"><span>FOUNDERS / ARTISTS / PRODUCERS / DJS / DESIGNERS / CHEFS</span><b>360°</b></div>
            </div>
          </div>
        </div>
      </section>

      <div className="summit-ticker" aria-hidden="true"><span>THE ROOM IS THE CONTENT /// MEDELLÍN AFTER DARK /// HUMAN SIGNAL &gt; PANEL SIGNAL /// CAMERAS IN THE CROWD /// BUILD SOMETHING TOGETHER /// THE ROOM IS THE CONTENT /// MEDELLÍN AFTER DARK /// HUMAN SIGNAL &gt; PANEL SIGNAL /// CAMERAS IN THE CROWD /// BUILD SOMETHING TOGETHER /// </span></div>

      <section className="summit-section" id="why">
        <div className="summit-micro">01 / system premise</div><h2>NOT A<br />CONFERENCE.</h2>
        <div className="summit-grid2">
          <div className="summit-lede">A summit with the pressure turned up — intimate enough to interrupt, alive enough to change shape.</div>
          <div className="summit-systemcard"><div className="summit-systembar"><span>session_info.dat</span><span>status: active</span></div><div className="summit-systembody">ARRIVED SUMMIT puts founders, artists, creative technologists, hospitality obsessives and operators into one live system. Speakers stand in the crowd. Cameras move through the room. Dinner bleeds into music. Medellín isn&apos;t a backdrop; the city is part of the format.<div className="summit-pillrow">{["Experiential", "Hospitality", "AI + design", "Community", "Nightlife", "LatAm"].map((pill) => <span key={pill}>{pill}</span>)}</div></div></div>
        </div>
      </section>

      <section className="summit-section summit-dark" id="schedule">
        <div className="summit-micro">02 / live program</div><h2>ONE DAY.<br />NO DEAD ZONES.</h2>
        <div className="summit-schedule">{program.map(([time, event, tag]) => <div className="summit-slot" key={time}><div>{time}</div><strong>{event}</strong><span>{tag}</span></div>)}</div>
      </section>

      <section className="summit-section" id="room">
        <div className="summit-micro">03 / people protocol</div><h2>THE ROOM<br />IS THE LINEUP.</h2>
        <div className="summit-people">{people.map(([name, description], index) => <article className="summit-person" key={name}><span className="summit-num">{String(index + 1).padStart(2, "0")}</span><div><strong>{name}</strong><small>{description}</small></div><i aria-hidden="true" /></article>)}</div>
      </section>

      <section className="summit-cta" id="rsvp"><div className="summit-micro">04 / access request</div><h2>MEET US<br />IN MEDELLÍN.</h2><p>For people who think the event is the product. Request access for the first drop: venue, room list, field sessions and after-hours.</p><a href="mailto:hello@happily.events?subject=ARRIVED%20SUMMIT%20MEDELLIN">REQUEST ACCESS →</a></section>
      <footer className="summit-footer"><span>ARRIVED® / A HAPPILY COMPANY</span><span>MEDELLÍN / COLOMBIA / 2027</span><span>HUMAN SIGNAL ACTIVE</span></footer>
    </main>
  );
}
