import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";

// GoHighLevel van calendars (see docs/gohighlevel.md and docs/ghl-change-log.md).
// Hours live in GHL: Mon, Wed, Fri, Sat 9 to 12 and 5 to 8 Pacific, one chair.
const VAN_CALENDARS = [
  { id: "YHa3D8M3GIKLIM4FnyUt", label: "IV hydration", length: "60 min", title: "Flos Hydration 60-minute IV appointment calendar" },
  { id: "9W3cXCWGFjacEM6pWEeW", label: "NAD+ infusion", length: "2 hours", title: "Flos Hydration 2-hour NAD+ appointment calendar" },
] as const;

const drips = [
  {
    name: "Electrolyte Rehydration",
    price: "$130",
    note: "A straightforward hydration option with a 1000 mL Lactated Ringer’s infusion.",
    tag: "Hydration",
  },
  {
    name: "Myers Cocktail",
    price: "$220",
    note: "A foundational blend of hydration, vitamins, and minerals for general wellness and recovery.",
    tag: "Wellness",
  },
  {
    name: "Sports Recovery",
    price: "$240",
    note: "Designed for active routines, workouts, travel, and demanding days.",
    tag: "Recovery",
  },
  {
    name: "Beauty",
    price: "$240",
    note: "A hydration and vitamin blend created to complement self-care and overall vitality.",
    tag: "Vitality",
  },
  {
    name: "Immune Boost",
    price: "$270",
    note: "A wellness-focused blend with hydration, vitamin C, zinc, B vitamins, and minerals.",
    tag: "Seasonal support",
  },
  {
    name: "Flos+ Rejuvenate",
    price: "$290",
    note: "The comprehensive signature IV experience for hydration, replenishment, and balance.",
    tag: "Signature",
  },
  {
    name: "Hangover",
    price: "$240",
    note: "A provider-guided option designed to support hydration and comfort after a long night.",
    tag: "Provider-guided",
  },
  {
    name: "NAD+",
    price: "$700",
    note: "A wellness-focused NAD+ infusion that may be included in an individualized plan. Allow about 2 hours.",
    tag: "Advanced",
  },
] as const;

type HydrationMenuCalendarProps = {
  onAppointmentRequest: () => void;
};

export default function HydrationMenuCalendar({ onAppointmentRequest }: HydrationMenuCalendarProps) {
  const [calendarId, setCalendarId] = useState<string>(VAN_CALENDARS[0].id);

  return (
    <>
      <section id="menu" className="scroll-mt-24 bg-white py-24 sm:py-32">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D7791F]"><span className="h-px w-8 bg-[#D7791F]/50" />Individual appointments</div>
              <h2 className="max-w-xl font-display text-4xl font-medium leading-[1.04] tracking-[-0.035em] text-[#0A4F78] sm:text-6xl">A signature IV menu for your appointment.</h2>
            </div>
            <div>
              <p className="max-w-2xl text-base leading-8 text-[#5C7889]">Explore the current individual hydration offerings, then use the Scotts Valley calendar to request a time. The care team confirms which option is appropriate after the required screening.</p>
              <button type="button" onClick={onAppointmentRequest} className="hydration-secondary mt-7">Go to appointment calendar <ArrowRight className="size-4" /></button>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {drips.map((drip) => (
              <article key={drip.name} className="hydration-menu-card">
                <div className="flex items-start justify-between gap-3"><span className="rounded-full bg-[#FFF1E5] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.13em] text-[#C5681C]">{drip.tag}</span><strong className="font-display text-xl text-[#0A4F78]">{drip.price}</strong></div>
                <h3 className="mt-7 font-display text-2xl leading-tight text-[#0A4F78]">{drip.name}</h3>
                <p className="mt-4 text-sm leading-7 text-[#67808F]">{drip.note}</p>
              </article>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-4 rounded-2xl border border-[#0A4F78]/10 bg-[#EEF6F9] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3"><span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-white text-[#D7791F]"><Sparkles className="size-4" /></span><p className="max-w-3xl text-sm leading-6 text-[#547182]"><strong className="text-[#234E66]">Optional boosters and upgrades are also available.</strong> Current offerings include NAD+, glutathione, vitamin B12, Toradol, and bag-size upgrades; discuss eligibility and fit with the clinician.</p></div>
            <button type="button" onClick={onAppointmentRequest} className="shrink-0 text-[10px] font-bold uppercase tracking-[0.17em] text-[#0A4F78]">View calendar <ArrowRight className="ml-2 inline size-3.5" /></button>
          </div>
          <p className="mt-5 text-[10px] leading-5 text-[#7D919C]">Menu names and listed prices reflect the current Flos Hydration page and should be reconfirmed before production launch. Treatments are provided only when clinically appropriate.</p>
        </div>
      </section>

      <section id="book" className="scroll-mt-24 bg-[#F7FBFD] py-24 sm:py-32">
        <div className="container grid gap-14 lg:grid-cols-[0.68fr_1.32fr] lg:gap-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D7791F]"><span className="h-px w-8 bg-[#D7791F]/50" />Scotts Valley appointments</div>
            <h2 className="max-w-xl font-display text-4xl font-medium leading-[1.04] tracking-[-0.035em] text-[#0A4F78] sm:text-6xl">Find a time that works for you.</h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-[#5C7889]">Individual hydration is booked at the Flos van at the Scotts Valley gym. Choose a 60-minute IV hydration visit or a 2-hour NAD+ infusion, then pick a time; the team will handle any required screening.</p>
            <div className="mt-8 space-y-4 text-sm text-[#486A7D]">
              {["Monday, Wednesday, Friday and Saturday, 9 to 12 and 5 to 8", "Flos van at the Scotts Valley gym", "Appointment and clinical suitability are confirmed by the care team"].map((item) => <div key={item} className="flex items-start gap-3"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#E6F2F7] text-[#0A4F78]"><Check className="size-3.5" /></span><span>{item}</span></div>)}
            </div>
          </div>

          <div>
            <div className="mb-4 grid grid-cols-2 rounded-xl bg-[#EAF3F7] p-1.5" role="tablist" aria-label="Appointment type">
              {VAN_CALENDARS.map((cal) => (
                <button
                  key={cal.id}
                  type="button"
                  role="tab"
                  aria-selected={calendarId === cal.id}
                  onClick={() => setCalendarId(cal.id)}
                  className={`min-h-12 rounded-lg px-3 text-xs font-bold transition-all ${calendarId === cal.id ? "bg-white text-[#0A4F78] shadow-sm" : "text-[#66808E]"}`}
                >
                  {cal.label} <span className="font-semibold opacity-70">· {cal.length}</span>
                </button>
              ))}
            </div>
            {/* Both calendars load up front so form_embed.js can size each one; only the selected one is shown. */}
            {VAN_CALENDARS.map((cal) => (
              <div key={cal.id} className="hydration-calendar-shell" hidden={calendarId !== cal.id}>
                <iframe
                  className="hydration-calendar"
                  id={`${cal.id}_flos`}
                  src={`https://api.leadconnectorhq.com/widget/booking/${cal.id}`}
                  title={cal.title}
                  allow="payment"
                  scrolling="no"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
