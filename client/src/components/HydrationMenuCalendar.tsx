import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, Sparkles } from "lucide-react";
import { VAN_CALENDARS } from "../config/ghl";
import { SHOW_MENU_INGREDIENTS } from "../config/site";
import { track } from "../lib/analytics";

// Names and prices from Kaitlyn's Nov 20 decisions. Ingredients are copied word for
// word from docs/menu-2026-11-20.md; a card shows "What's inside" only when its list is filled in
// and SHOW_MENU_INGREDIENTS is on.
type IngredientGroup = {
  heading?: string;
  items: readonly string[];
};

type Drip = {
  name: string;
  price: string;
  note: string;
  tag: string;
  ingredients: readonly IngredientGroup[];
};

const INFUVITE_VIAL_1: IngredientGroup = {
  heading: "Infuvite Vial #1 - 5mL",
  items: ["200mg Vitamin C", "3,300 IU Vitamin A", "200 IU Vitamin D3", "6mg Vitamin B1", "3.6mg Vitamin B2", "6mg Vitamin B6", "40mg Niacinamide", "15mg Dexpanthenol", "10 IU Vitamin E", "150mcg Vitamin K1"],
};

const drips: readonly Drip[] = [
  {
    name: "Electrolyte Rehydration",
    price: "$130",
    note: "A straightforward hydration option with a 1000 mL Lactated Ringer’s infusion.",
    tag: "Hydration",
    ingredients: [{ items: ["1000mL Lactated Ringers"] }],
  },
  {
    name: "Myers Cocktail",
    price: "$220",
    note: "A foundational blend of hydration, vitamins, and minerals for general wellness and recovery.",
    tag: "Wellness",
    ingredients: [{ items: ["500mL Normal Saline", "500mg Vitamin C", "1mL B-complex", "10mg Zinc", "400mg Magnesium", "1000mcg Vitamin B-12", "500mg Calcium"] }],
  },
  {
    name: "Sports Recovery",
    price: "$240",
    note: "Designed for active routines, workouts, travel, and demanding days.",
    tag: "Recovery",
    ingredients: [{ items: ["500mL Normal Saline", "1500mg Vitamin C", "3mL B-Complex", "400mg Magnesium"] }, INFUVITE_VIAL_1],
  },
  {
    name: "Beautify",
    price: "$240",
    note: "A hydration and vitamin blend created to complement self-care and overall vitality.",
    tag: "Vitality",
    ingredients: [{ items: ["500mL Normal Saline", "1500mg Vitamin C", "3mL B-Complex", "1mg Folic Acid"] }, { heading: "Infuvite Vial #2 - 5mL", items: ["600mcg Folic Acid", "60mcg Biotin", "5mcg Vitamin B-12"] }],
  },
  {
    name: "Hangover",
    price: "$240",
    note: "A provider-guided option designed to support hydration and comfort after a long night.",
    tag: "Provider-guided",
    ingredients: [{ items: ["500mL Normal Saline", "4mg Ondansetron", "3mL B-Complex", "30mg Ketorolac"] }],
  },
  {
    name: "Immune Boost",
    price: "$270",
    note: "A wellness-focused blend with hydration, vitamin C, zinc, B vitamins, and minerals.",
    tag: "Seasonal support",
    ingredients: [{ items: ["500mL Normal Saline", "1500mg Vitamin C", "3mL B-Complex", "10mg Zinc", "1000mg Magnesium", "500mg Calcium", "1000mg L-Carnitine"] }],
  },
  {
    name: "Flos+",
    price: "$290",
    note: "The comprehensive signature IV experience for hydration, replenishment, and balance.",
    tag: "Signature",
    ingredients: [{ items: ["500mL Normal Saline", "1500mg Vitamin C", "3mL B-Complex", "1000mg Magnesium", "500mg Calcium", "1000mg L-Carnitine"] }, INFUVITE_VIAL_1],
  },
  {
    name: "NAD+ infusion",
    price: "$520",
    note: "A wellness-focused NAD+ infusion that may be included in an individualized plan. Allow about 2 hours.",
    tag: "Advanced",
    ingredients: [],
  },
];

const bagUpgrade = {
  name: "Upgraded bag size",
  price: "+$20",
  note: "Any 500mL Normal Saline bag can be upgraded to 1000mL Lactated Ringers for added electrolytes.",
};

const boosters = [
  { name: "Vitamin B12", dose: "1000mcg IM or IV", price: "$45" },
  { name: "NAD+", dose: "50mg IM", price: "$80" },
  { name: "Glutathione", dose: "500mg IM or IV", price: "$45" },
  { name: "Toradol", dose: "30mg IM or IV", price: "$45" },
] as const;

type HydrationMenuCalendarProps = {
  onAppointmentRequest: (location: string) => void;
};

export default function HydrationMenuCalendar({ onAppointmentRequest }: HydrationMenuCalendarProps) {
  const [calendarId, setCalendarId] = useState<string>(VAN_CALENDARS[0].id);
  const bookRef = useRef<HTMLElement>(null);

  // Fire one analytics event the first time the booking section is on screen.
  useEffect(() => {
    const el = bookRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        track("booking_section_view");
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
              <p className="max-w-2xl text-base leading-8 text-[#56707F]">Explore the current individual hydration offerings, then use the Scotts Valley calendar to book a time. The care team confirms which option is appropriate after the required screening.</p>
              <button type="button" onClick={() => onAppointmentRequest("menu_intro")} className="hydration-secondary mt-7">Go to appointment calendar <ArrowRight className="size-4" /></button>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {drips.map((drip) => (
              <article key={drip.name} className="hydration-menu-card">
                <div className="flex items-start justify-between gap-3"><span className="rounded-full bg-[#FFF1E5] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.13em] text-[#C5681C]">{drip.tag}</span><strong className="font-display text-xl text-[#0A4F78]">{drip.price}</strong></div>
                <h3 className="mt-7 font-display text-2xl leading-tight text-[#0A4F78]">{drip.name}</h3>
                <p className="mt-4 text-sm leading-7 text-[#56707F]">{drip.note}</p>
                {SHOW_MENU_INGREDIENTS && drip.ingredients.length > 0 && (
                  <details className="group mt-auto border-t border-[#0A4F78]/10 pt-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.17em] text-[#0A4F78] [&::-webkit-details-marker]:hidden">
                      What's inside <ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    {drip.ingredients.map((group, index) => (
                      <div key={group.heading ?? index} className="mt-3">
                        {group.heading && <p className="text-xs font-semibold leading-5 text-[#234E66]">{group.heading}</p>}
                        <ul className="space-y-1 text-xs leading-5 text-[#56707F]">
                          {group.items.map((item) => <li key={item} className="break-words">{item}</li>)}
                        </ul>
                      </div>
                    ))}
                  </details>
                )}
              </article>
            ))}
          </div>

          <div className="mt-7 rounded-2xl border border-[#0A4F78]/10 bg-[#EEF6F9] px-6 py-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-[#D7791F]"><Sparkles className="size-4" /></span><h3 className="font-display text-2xl text-[#0A4F78]">Add-ons</h3></div>
              <button type="button" onClick={() => onAppointmentRequest("menu_boosters")} className="self-start py-2 text-[10px] font-bold uppercase tracking-[0.17em] text-[#0A4F78] sm:self-auto">View calendar <ArrowRight className="ml-2 inline size-3.5" /></button>
            </div>
            <div className="mt-5 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
              <div>
                <div className="flex items-baseline justify-between gap-4"><strong className="text-sm text-[#234E66]">{bagUpgrade.name}</strong><span className="shrink-0 font-display text-lg text-[#0A4F78]">{bagUpgrade.price}</span></div>
                <p className="mt-2 text-sm leading-6 text-[#547182]">{bagUpgrade.note}</p>
              </div>
              <div>
                <strong className="text-sm text-[#234E66]">IV boosters</strong>
                <ul className="mt-2 divide-y divide-[#0A4F78]/10">
                  {boosters.map((booster) => (
                    <li key={booster.name} className="flex items-baseline justify-between gap-4 py-2.5">
                      <span className="min-w-0 text-sm text-[#234E66]">{booster.name} <span className="text-xs text-[#56707F]">({booster.dose})</span></span>
                      <span className="shrink-0 font-display text-lg text-[#0A4F78]">{booster.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-5 text-[10px] leading-5 text-[#56707F]">Treatments are provided only when clinically appropriate.</p>
        </div>
      </section>

      <section id="book" ref={bookRef} className="scroll-mt-24 bg-[#F7FBFD] py-24 sm:py-32">
        <div className="container grid gap-14 lg:grid-cols-[0.68fr_1.32fr] lg:gap-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D7791F]"><span className="h-px w-8 bg-[#D7791F]/50" />Scotts Valley appointments</div>
            <h2 className="max-w-xl font-display text-4xl font-medium leading-[1.04] tracking-[-0.035em] text-[#0A4F78] sm:text-6xl">Find a time that works for you.</h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-[#56707F]">Individual hydration is booked at the Flos van at the Scotts Valley gym. Choose a 60-minute IV hydration visit or a 2-hour NAD+ infusion, then pick a time; the team will handle any required screening.</p>
            <div className="mt-8 space-y-4 text-sm text-[#486A7D]">
              {["Monday, Wednesday and Friday, plus the 1st and 3rd Saturday of each month, 9 to 12 and 5 to 8 Pacific","Flos van at the Scotts Valley gym", "Appointment and clinical suitability are confirmed by the care team"].map((item) => <div key={item} className="flex items-start gap-3"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#E6F2F7] text-[#0A4F78]"><Check className="size-3.5" /></span><span>{item}</span></div>)}
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
                  onClick={() => {
                    if (calendarId !== cal.id) track("booking_type_select", { booking_type: cal.key });
                    setCalendarId(cal.id);
                  }}
                  className={`min-h-12 rounded-lg px-3 text-xs font-bold transition-all ${calendarId === cal.id ? "bg-white text-[#0A4F78] shadow-sm" : "text-[#56707F]"}`}
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
