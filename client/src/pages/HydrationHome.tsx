import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Droplets,
  Dumbbell,
  HeartPulse,
  MapPin,
  Menu,
  ShieldCheck,
  TentTree,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import "../hydration.css";
import HydrationMenuCalendar from "../components/HydrationMenuCalendar";

const HYDRATION_IMAGE = "./assets/flos-hydration-care.jpg";
const WELLNESS_IMAGE = "./assets/flos-hiking-couple.jpg";

const navigation = [
  ["Scotts Valley appointments", "#individual"],
  ["IV menu", "#menu"],
  ["Mobile for businesses", "#mobile"],
  ["FAQs", "#faqs"],
] as const;

const mobileUses = [
  [Dumbbell, "Gyms & fitness communities", "Create an on-site hydration day around training, recovery, member events, or a recurring wellness offering."],
  [TentTree, "Retreats & festivals", "Add a provider-guided hydration experience to a planned retreat, festival, or destination wellness program."],
  [Building2, "Workplaces & organizations", "Explore a scheduled hydration experience for a company, hospitality group, or community organization."],
  [Users, "Private & partner events", "Plan hydration for an eligible private gathering, wellness center, partner activation, or special event."],
] as const;

const questions = [
  ["Where do individual hydration appointments take place?", "Individual appointments are offered at the Scotts Valley gym location by appointment. Scheduling and location details are confirmed when your appointment is arranged."],
  ["Does Flos Hydration offer individual house calls?", "The mobile program is designed for businesses, organized groups, partnerships, retreats, and events—not individual house calls. Individuals can request an appointment at the Scotts Valley gym location."],
  ["What kinds of mobile partnerships can you support?", "Flos Hydration can consider gyms, wellness centers, retreats, workplaces, festivals, private events, and other organized group settings. Availability depends on location, timing, attendance, staffing, and clinical requirements."],
  ["How far does the mobile team travel?", "The current focus is the greater Santa Cruz area. Other locations can be considered through the business inquiry process based on timing and service requirements."],
  ["Can every guest receive IV hydration?", "No. IV hydration is provided only when appropriate after required screening. Individual eligibility and service options may vary."],
] as const;

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="group inline-flex items-center gap-3" aria-label="Flos Hydration home">
      <span className={`grid size-10 place-items-center rounded-full border transition-transform duration-200 group-hover:-rotate-6 ${light ? "border-white/25 bg-white/10 text-[#F6BA82]" : "border-[#D7791F]/25 bg-[#FFF1E5] text-[#D7791F]"}`}>
        <Droplets className="size-5" strokeWidth={1.8} />
      </span>
      <span className="leading-none">
        <span className={`block text-[1.45rem] font-semibold tracking-[0.11em] ${light ? "text-white" : "text-[#0A4F78]"}`}>FLOS</span>
        <span className={`mt-1 block text-[8px] font-bold uppercase tracking-[0.31em] ${light ? "text-[#F6BA82]" : "text-[#D7791F]"}`}>Hydration</span>
      </span>
    </a>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`mb-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] ${light ? "text-[#F6BA82]" : "text-[#D7791F]"}`}><span className={`h-px w-8 ${light ? "bg-[#F6BA82]/60" : "bg-[#D7791F]/50"}`} />{children}</div>;
}

export default function HydrationHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<"individual" | "business">("individual");

  const goToForm = (type: "individual" | "business") => {
    setInquiryType(type);
    setTimeout(() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" }), 10);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success(inquiryType === "individual" ? "Appointment request ready" : "Mobile inquiry ready", {
      description: "This is a prototype form and is not yet connected to scheduling or the CRM.",
    });
    event.currentTarget.reset();
  };

  return (
    <div id="top" className="hydration-site min-h-screen overflow-x-hidden bg-[#F7FBFD] text-[#173D55]">
      <div className="bg-[#073E63] text-white">
        <div className="container flex min-h-9 items-center justify-between gap-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em] sm:text-[10px]">
          <span className="inline-flex items-center gap-2"><MapPin className="size-3.5 text-[#F6BA82]" />Individual appointments in Scotts Valley</span>
          <span className="hidden text-white/75 md:inline">Mobile hydration for businesses, groups & events</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-[#0A4F78]/8 bg-white/95 backdrop-blur-xl">
        <div className="container flex h-[78px] items-center justify-between gap-6">
          <BrandMark />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navigation.map(([label, href]) => <a key={href} href={href} className="text-[12px] font-semibold text-[#416478] transition-colors hover:text-[#D7791F]">{label}</a>)}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a href="tel:18449673567" className="grid size-11 place-items-center rounded-full border border-[#0A4F78]/12 text-[#0A4F78] transition-colors hover:border-[#D7791F]/40 hover:text-[#D7791F]" aria-label="Call Flos Hydration"><HeartPulse className="size-4" /></a>
            <button type="button" onClick={() => goToForm("individual")} className="hydration-primary">Request an appointment <ArrowRight className="size-4" /></button>
          </div>
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="grid size-11 place-items-center rounded-full border border-[#0A4F78]/12 text-[#0A4F78] lg:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
        {menuOpen && <div className="border-t border-[#0A4F78]/8 bg-white px-4 pb-5 pt-2 lg:hidden"><nav className="mx-auto flex max-w-xl flex-col">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-[#0A4F78]/8 py-4 text-sm font-semibold text-[#315A72]">{label}</a>)}<button type="button" onClick={() => {setMenuOpen(false); goToForm("individual");}} className="hydration-primary mt-5 justify-center">Request an appointment <ArrowRight className="size-4" /></button></nav></div>}
      </header>

      <main>
        <section className="hydration-hero relative overflow-hidden pb-20 pt-14 sm:pb-28 sm:pt-20">
          <div className="container relative z-10 grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <div>
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#0A4F78]/10 bg-white/80 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#547286] shadow-sm backdrop-blur"><span className="size-1.5 rounded-full bg-[#D7791F]" />Local care. Two clear ways to hydrate.</div>
              <h1 className="max-w-2xl font-display text-[3.45rem] font-medium leading-[0.93] tracking-[-0.045em] text-[#0A4F78] sm:text-[5rem] lg:text-[6rem]">Convenient hydration in Scotts Valley. <em className="font-normal text-[#D7791F]">Mobile for your group.</em></h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-[#5C7889] sm:text-lg">Book individual IV hydration by appointment at our Scotts Valley gym location. For businesses, retreats, wellness centers, festivals, and private events, Flos Hydration can come to your group.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#individual" className="hydration-primary justify-center">Hydration for me <ArrowRight className="size-4" /></a><a href="#mobile" className="hydration-secondary justify-center">Hydration for my business or event <ArrowRight className="size-4" /></a></div>
              <div className="mt-9 grid max-w-xl grid-cols-3 gap-4 border-t border-[#0A4F78]/10 pt-6">{[["By appointment", "Scotts Valley"], ["Mobile service", "Businesses & events"], ["Local clinician", "Provider-guided"]].map(([label, value]) => <div key={label}><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8296A3]">{label}</p><p className="mt-2 text-xs font-semibold leading-5 text-[#315A72] sm:text-sm">{value}</p></div>)}</div>
            </div>
            <div className="relative mx-auto w-full max-w-[670px]">
              <div className="relative overflow-hidden rounded-[80px_4px_80px_4px] bg-[#0A4F78] p-2 shadow-[0_35px_90px_rgba(10,79,120,0.2)]"><img src={HYDRATION_IMAGE} alt="Mobile IV hydration at a wellness gathering" className="aspect-[4/5] w-full rounded-[72px_2px_72px_2px] object-cover sm:aspect-[5/4] lg:aspect-[4/5]" /><div className="absolute inset-x-2 bottom-2 h-1/2 rounded-b-[72px] bg-gradient-to-t from-[#062D48]/75 to-transparent" /><div className="absolute bottom-9 left-8 right-8 text-white"><p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#F6BA82]">Flos Hydration</p><p className="mt-2 max-w-sm font-display text-2xl leading-tight sm:text-3xl">Local by design. Flexible by appointment.</p></div></div>
              <div className="absolute -bottom-7 -left-3 rounded-2xl border border-[#0A4F78]/10 bg-white/95 p-5 shadow-[0_18px_45px_rgba(10,79,120,0.13)] backdrop-blur sm:-left-8 sm:max-w-[260px]"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-[#FFF1E5] text-[#D7791F]"><ShieldCheck className="size-4" /></span><div><p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8296A3]">Care comes first</p><p className="mt-1 text-sm font-semibold text-[#234E66]">Eligibility and availability are confirmed before service.</p></div></div></div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#0A4F78]/8 bg-white py-8"><div className="container grid gap-4 sm:grid-cols-2"><a href="#individual" className="hydration-route group"><CalendarDays className="size-5 text-[#D7791F]" /><span><strong>Individual hydration</strong><small>Appointments at the Scotts Valley gym</small></span><ArrowRight className="ml-auto size-4 transition-transform group-hover:translate-x-1" /></a><a href="#mobile" className="hydration-route group"><Building2 className="size-5 text-[#D7791F]" /><span><strong>Mobile hydration</strong><small>For businesses, groups, partnerships & events</small></span><ArrowRight className="ml-auto size-4 transition-transform group-hover:translate-x-1" /></a></div></section>

        <section id="individual" className="scroll-mt-24 bg-[#F7FBFD] py-24 sm:py-32">
          <div className="container grid items-center gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-24">
            <div className="relative order-2 lg:order-1">
              <div className="hydration-appointment">
                <div className="flex items-start justify-between gap-6">
                  <span className="grid size-12 place-items-center rounded-full bg-[#FFF1E5] text-[#D7791F]"><CalendarDays className="size-5" /></span>
                  <span className="rounded-full bg-[#E9F4F9] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#0A4F78]">By appointment</span>
                </div>
                <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D7791F]">Individual hydration</p>
                <h3 className="mt-3 font-display text-4xl font-medium leading-tight text-[#0A4F78]">Your appointment. Our Scotts Valley setup.</h3>
                <p className="mt-5 max-w-lg text-sm leading-7 text-[#607C8C]">Request an individual appointment at the Scotts Valley gym location. The team will confirm timing, available hydration options, and any required screening.</p>
                <div className="mt-8 space-y-4">
                  {["Offered at the Scotts Valley gym location", "Advance appointment required", "Administered by a qualified local clinician", "Service provided only when appropriate"].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-medium text-[#315A72]">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#E6F2F7] text-[#0A4F78]"><Check className="size-3.5" /></span>
                      {item}
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => goToForm("individual")} className="hydration-primary mt-9">Request an individual appointment <ArrowRight className="size-4" /></button>
              </div>
              <div className="absolute -right-6 -top-7 hidden rounded-2xl border border-[#0A4F78]/10 bg-white px-5 py-4 shadow-lg sm:block">
                <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#8296A3]">Location</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-[#0A4F78]"><MapPin className="size-4 text-[#D7791F]" />Scotts Valley, California</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Eyebrow>For individuals</Eyebrow>
              <h2 className="max-w-xl font-display text-4xl font-medium leading-[1.03] tracking-[-0.035em] text-[#0A4F78] sm:text-6xl">A simple, local way to make hydration part of your day.</h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-[#5C7889]">No mobile house-call coordination is needed. Individuals begin by requesting an appointment at the Scotts Valley gym, and the care team follows up with the next available step.</p>
              <div className="mt-9 overflow-hidden rounded-[2px_36px_2px_36px] border border-[#0A4F78]/10 bg-white shadow-[0_20px_50px_rgba(10,79,120,0.08)]">
                <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[4/5]">
                  <img src={WELLNESS_IMAGE} alt="Healthy active couple on a coastal trail reflecting everyday vitality" className="size-full object-cover object-[center_12%]" />
                  <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#062D48]/85 via-[#062D48]/35 to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6 text-white sm:bottom-6 sm:left-7 sm:right-7">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#F6BA82]">Everyday vitality</p>
                    <p className="mt-1 font-display text-xl leading-tight sm:text-2xl">Fueling active routines, recovery, and wellness.</p>
                  </div>
                </div>
              </div>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="hydration-mini"><Clock3 className="size-5" /><strong>Scheduled around availability</strong><span>Share preferred timing and the team will confirm what is open.</span></div>
                <div className="hydration-mini"><ShieldCheck className="size-5" /><strong>Appropriate screening</strong><span>The clinician confirms eligibility before providing service.</span></div>
              </div>
            </div>
          </div>
        </section>

        <HydrationMenuCalendar onAppointmentRequest={() => document.querySelector("#book")?.scrollIntoView({ behavior: "smooth", block: "start" })} />

        <section id="mobile" className="scroll-mt-24 bg-[#073E63] py-24 text-white sm:py-32"><div className="container"><div className="grid items-end gap-10 lg:grid-cols-[1fr_0.72fr]"><div><Eyebrow light>For businesses, partners & events</Eyebrow><h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-6xl">Bring mobile hydration to <em className="font-normal text-[#F6BA82]">your people.</em></h2></div><div><p className="max-w-xl text-base leading-8 text-white/68">The mobile program is designed for organized groups—not individual house calls. Tell us about the setting, timing, and estimated participation so the team can evaluate the opportunity.</p><button type="button" onClick={() => goToForm("business")} className="hydration-light mt-7">Start a mobile inquiry <ArrowRight className="size-4" /></button></div></div><div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{mobileUses.map(([Icon, title, body]) => <article key={title} className="hydration-mobile-card"><Icon className="size-5 text-[#F6BA82]" /><h3 className="mt-7 font-display text-2xl leading-tight">{title}</h3><p className="mt-4 text-sm leading-7 text-white/58">{body}</p></article>)}</div><div className="mt-8 flex flex-col justify-between gap-5 rounded-2xl border border-white/12 bg-white/6 px-6 py-5 sm:flex-row sm:items-center"><p className="max-w-3xl text-sm leading-6 text-white/66"><strong className="text-white">Planning outside the Santa Cruz area?</strong> Include the location in your inquiry. Travel, timing, attendance, and service requirements will determine whether the opportunity is a fit.</p><button type="button" onClick={() => goToForm("business")} className="shrink-0 text-[10px] font-bold uppercase tracking-[0.17em] text-[#F6BA82]">Discuss a partnership <ArrowRight className="ml-2 inline size-3.5" /></button></div></div></section>

        <section id="how-it-works" className="scroll-mt-24 bg-white py-24 sm:py-32"><div className="container"><div className="mx-auto max-w-3xl text-center"><Eyebrow>How it works</Eyebrow><h2 className="font-display text-4xl font-medium leading-[1.04] tracking-[-0.035em] text-[#0A4F78] sm:text-6xl">A clear route from interest to availability.</h2><p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#5C7889]">The first step is intentionally simple. The care team confirms the operational and clinical details before anything is scheduled.</p></div><div className="relative mt-14 grid gap-4 md:grid-cols-4">{[["01", "Choose your path", "Select an individual Scotts Valley appointment or a mobile business and event inquiry."], ["02", "Share the basics", "Tell us who the service is for, where it would take place, and the timing you have in mind."], ["03", "Confirm availability", "The team confirms fit, clinical requirements, staffing, and scheduling."], ["04", "Receive care", "Eligible services are administered by a qualified local clinician in the confirmed setting."]].map(([number, title, copy]) => <article key={number} className="hydration-step"><div className="grid size-14 place-items-center rounded-full border border-[#D7791F]/25 bg-[#FFF7F0] font-display text-lg text-[#D7791F]">{number}</div><h3 className="mt-6 text-base font-bold text-[#234E66]">{title}</h3><p className="mt-3 text-sm leading-7 text-[#67808F]">{copy}</p></article>)}</div><p className="mx-auto mt-9 max-w-3xl text-center text-[10px] leading-5 text-[#7D919C]">IV hydration is provided only when appropriate following the required screening. Availability, service options, and individual results vary.</p></div></section>

        <section id="faqs" className="scroll-mt-24 bg-[#EEF6F9] py-24 sm:py-32"><div className="container grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24"><div><Eyebrow>Common questions</Eyebrow><h2 className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[#0A4F78] sm:text-5xl">Know which path fits before you reach out.</h2><p className="mt-6 max-w-md text-base leading-8 text-[#5C7889]">Individuals begin with a Scotts Valley appointment request. Businesses, partners, and events use the mobile inquiry path.</p></div><div className="space-y-3">{questions.map(([question, answer]) => <details key={question} className="hydration-faq group"><summary><span>{question}</span><ChevronDown className="size-4 shrink-0 transition-transform duration-200 group-open:rotate-180" /></summary><p>{answer}</p></details>)}</div></div></section>

        <section id="contact" className="scroll-mt-24 bg-white py-24 sm:py-32"><div className="container grid items-start gap-14 lg:grid-cols-[0.76fr_1.24fr] lg:gap-24"><div><Eyebrow>Start here</Eyebrow><h2 className="max-w-xl font-display text-4xl font-medium leading-[1.03] tracking-[-0.035em] text-[#0A4F78] sm:text-6xl">Tell us what you want to plan.</h2><p className="mt-6 max-w-lg text-base leading-8 text-[#5C7889]">Choose the individual or business path, share the basics, and the Flos Hydration team can follow up with availability and the appropriate next step.</p><div className="mt-8 space-y-4 text-sm text-[#486A7D]">{["Individual appointments take place in Scotts Valley", "Mobile service is reserved for businesses, groups, partners, and events", "Do not submit urgent or sensitive medical information"].map((item) => <div key={item} className="flex items-start gap-3"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#E6F2F7] text-[#0A4F78]"><Check className="size-3.5" /></span><span>{item}</span></div>)}</div></div><form onSubmit={submit} className="hydration-form"><div className="mb-8 grid grid-cols-2 rounded-xl bg-[#EAF3F7] p-1.5"><button type="button" onClick={() => setInquiryType("individual")} className={`min-h-11 rounded-lg px-4 text-xs font-bold transition-all ${inquiryType === "individual" ? "bg-white text-[#0A4F78] shadow-sm" : "text-[#66808E]"}`}>Individual appointment</button><button type="button" onClick={() => setInquiryType("business")} className={`min-h-11 rounded-lg px-4 text-xs font-bold transition-all ${inquiryType === "business" ? "bg-[#0A4F78] text-white shadow-sm" : "text-[#66808E]"}`}>Business / mobile inquiry</button></div><input type="hidden" name="interest" value={inquiryType} /><div className="grid gap-5 sm:grid-cols-2"><label className="hydration-field"><span>First name</span><input required name="firstName" autoComplete="given-name" placeholder="Your first name" /></label><label className="hydration-field"><span>Last name</span><input required name="lastName" autoComplete="family-name" placeholder="Your last name" /></label><label className="hydration-field sm:col-span-2"><span>Email address</span><input required type="email" name="email" autoComplete="email" placeholder="you@example.com" /></label><label className="hydration-field"><span>Phone</span><input required type="tel" name="phone" autoComplete="tel" placeholder="(831) 555-0123" /></label><label className="hydration-field"><span>{inquiryType === "individual" ? "ZIP code" : "Organization or event"}</span><input required name={inquiryType === "individual" ? "zip" : "organization"} placeholder={inquiryType === "individual" ? "95066" : "Business, retreat, gym or event"} /></label>{inquiryType === "business" && <label className="hydration-field sm:col-span-2"><span>Proposed location</span><input required name="location" placeholder="City, venue or service area" /></label>}<label className="hydration-field sm:col-span-2"><span>{inquiryType === "individual" ? "Preferred timing" : "Tell us about the group or event"}</span><textarea required name="details" rows={4} placeholder={inquiryType === "individual" ? "Share days or times that generally work for you." : "Include the date or timing, expected participation, and what you are planning."} /></label></div><button type="submit" className="hydration-primary mt-7 w-full justify-center sm:w-auto">{inquiryType === "individual" ? "Request an appointment" : "Send mobile inquiry"}<ArrowRight className="size-4" /></button><p className="mt-5 max-w-2xl text-[10px] leading-5 text-[#718692]">By submitting, you agree that Flos Hydration may contact you about scheduling and service coordination. This form is not for emergencies or sensitive medical information.</p></form></div></section>
      </main>

      <footer className="bg-[#052E49] pb-8 pt-16 text-white"><div className="container"><div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1.1fr_0.7fr_0.7fr]"><div><BrandMark light /><p className="mt-6 max-w-md text-sm leading-7 text-white/58">Individual IV hydration by appointment in Scotts Valley. Mobile hydration for eligible businesses, partnerships, groups, and events.</p></div><div><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F6BA82]">Explore</p><div className="mt-5 flex flex-col gap-3 text-sm text-white/62"><a href="#individual" className="hover:text-white">Individual appointments</a><a href="#mobile" className="hover:text-white">Mobile business hydration</a><a href="#how-it-works" className="hover:text-white">How it works</a><a href="#faqs" className="hover:text-white">FAQs</a></div></div><div><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F6BA82]">Contact</p><div className="mt-5 flex flex-col gap-3 text-sm text-white/62"><span>Scotts Valley, California</span><a href="tel:18449673567" className="hover:text-white">1.844.967.FLOS</a><button type="button" onClick={() => goToForm("business")} className="w-fit text-left hover:text-white">Business inquiry</button></div></div></div><div className="flex flex-col gap-4 pt-7 text-[9px] leading-5 text-white/42 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Flos Hydration. All rights reserved.</p><p>Services are subject to availability, screening, and clinical appropriateness.</p></div></div></footer>
    </div>
  );
}
