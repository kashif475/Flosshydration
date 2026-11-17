# Flos Hydration: Phase 1 Action Items

Staging: https://soft-cassata-578454.netlify.app
Sources: SOW-FLOS-001, Oct 20 quote, Hive's Appointment Launch Plan (Oct 5), Website Loading Guide (Oct 1), Tool Spend Review, Oct 27 kickoff notes.
Target: staging review ~Dec 4, live ~Dec 11 (SOW: launch in week 4).

## 1. Waiting on Flos (send as one email to Kaitlyn and Mike, Divya cc'd)

- [ ] **Tell the team about the form (plain words):** "We've put your GoHighLevel form on the website, so every inquiry goes straight into GoHighLevel, which is covered by your HIPAA add-on. Nothing is stored on the website itself. The form on the site right now is the IV Hydration Event Form from the July event. How would you like it to work for everyday bookings and business inquiries? We can edit that form or make a new one."

- [ ] **Final web address:** hydration.floshealth.com, hydration.flosrx.com or floshydration.com
- [ ] **Menu and prices:** the site and Hive's plan don't match
  - NAD+ is **$700** on the site but **$520** (500 mg) in the plan
  - Names differ: Beauty / Beautify, Immune Boost / Immunity, Flos+ Rejuvenate / Flos+
  - "Go Go Go" special is in the plan but not on the site. Keep it off?
  - Booster prices (B12, NAD+ IM, plan says $25 to $35)
- [ ] **Launch offers to show on the site:** gym member $20 off, 3-pack at 10% off, bring a friend $15 off (the opening offer ended Oct 31)
- [ ] **Membership terms:** tiers, price, enrollment fee, minimum term (needed for Stripe recurring payments)
- [ ] **No-show policy:** plan suggests a $25 fee under 12 hours' notice
- [ ] **Location details:** exact van address at Scotts Valley Gym and arrival instructions (plan: market as "Santa Cruz", keep the Scotts Valley address)
- [ ] **Mobile service terms:** service radius, group minimums, travel fees
- [ ] **Contact:** confirm phone 1-844-967-3567, add a public email and the @flos.hydration Instagram link
- [ ] **Legal pages:** privacy policy, terms and clinical disclaimer wording (Flos supplies or approves; we place them)
- [ ] **Clinical review:** Dr. Khan signs off on site copy and claims
- [ ] **Images:** approve the two AI-style visuals or send real Flos photos
- [ ] **GoHighLevel HIPAA add-on:** written confirmation from GHL of what it covers (SOW makes this Flos's job)
- [ ] **DrChrono:** decide on the one-way GHL to DrChrono booking sync (small = free, real development = quoted)

## 2. Website build (ValueStreamAI)

- [x] Source code in GitHub, Netlify config, deployed to staging
- [x] **Inquiry form on the site is a GHL embed** (decided 2026-11-17: no custom form or Netlify Function, so data never passes through Netlify). Currently the "IV Hydration Event Form".
- [ ] **Make the GHL form fit the website** once the team answers: new banner (not the July event), individual vs. business choice, real consent wording instead of "[BUSINESS NAME]"
- [ ] **Fix what the end-to-end test found (2026-11-17, contact "test kashif" `w97LBxZFGnLv3HmWUYS5`):**
  - Works: website form to GHL, contact created with source "IV Hydration Event Form", page URL recorded, anti-bot challenge active, submitter gets an email from info@floshealth.com
  - The submitter email's subject is "IV Hydration Confirmed for USPC Unleashed Iron Pro/Am Event", but nothing is booked
  - That email repeats every answer, including date of birth, gender, treatment and health concerns, in a regular email. Switch it to a short "we got your request" message with no answers
  - Nothing happens after submission: no tag, no pipeline entry, no task, no workflow, no text, so the team gets no alert in GHL (check whether the form's own email notification goes to anyone)
  - The confirmation email landed in Gmail's Promotions tab
  - Delete the test contact once the team has seen it
- [ ] **Pipelines, tags and notification:** pipelines and tags via the API; in the GHL UI, a workflow on form submit that alerts Kaitlyn and sends an auto-reply (no health details in either)
- [x] **Booking calendar:** two new GHL van calendars (60 min and NAD+ 120 min), Mon, Wed, Fri, Sat 9 to 12 and 5 to 8 Pacific, one chair, 15-min buffer; on the website as two tabs (2026-11-17). Kaitlyn to confirm provider and hours
- [ ] **Stripe through GHL:** pay at booking, then memberships and 3-packs with failed-payment follow-up (test mode first)
- [ ] **Automations** (check the existing "Appointment Confirmation + Reminder - Flos Hydration" workflow first): booking confirmation, 24-hour and 2-hour reminders (email and SMS), with the intake questionnaire and consent form sent after booking (GHL HIPAA forms)
- [ ] **Check SMS registration (A2P 10DLC) in GHL early.** Carrier approval can take days.
- [ ] Update the menu, offers, boosters, contact details and location once Flos confirms (section 1)
- [x] Privacy, terms and clinical disclaimer placeholder pages added and linked in the footer (noindex; wording to come from Flos)
- [ ] **Launch blocker:** remove the "prices should be reconfirmed" note from the menu once Flos approves the menu and prices
- [ ] **At launch:** set `SITE_URL` in Netlify to the final domain (canonical, social tags, robots.txt, sitemap.xml follow automatically)
- [ ] **At launch:** set `VITE_GA_MEASUREMENT_ID` in Netlify once Flos's GA4 property exists, after Flos agrees on analytics and a cookie notice
- [ ] **At launch:** swap `FORM_IDS.businessInquiry` in `client/src/config/ghl.ts` to the new business form (it currently points at the July event form as a placeholder)
- [ ] Test booking and the inquiry form on a real iPhone in Safari (GHL embeds stay hidden until the iframe reports it loaded; a browser that blocks it would show an empty box)
- [x] **SEO basics:** favicon set, sitemap.xml, robots.txt, canonical URL, social share image and tags (2026-11-17)
- [ ] **Analytics:** GA4 scaffold and click events done (needs the GA4 ID). Booking and form submissions must be tracked from GHL, since its embed does not tell the page
- [ ] **Tagged links and QR codes:** one each for the front desk, van door, Instagram bio, member email and partners
- [ ] Test on Chrome, Safari, Firefox, iPhone and Android
- [ ] Flos staging review (up to 2 revision rounds, 5 business days to approve)
- [ ] DNS in GoDaddy to Netlify, SSL check, then go live
- [ ] Link the main Flos site to the Hydration site

## 3. Tech stack cleanup ($750, needs Flos's written OK before each cut)

- [ ] Get the RingCentral contract and line count, then cut 13 lines to 2 (~$396/mo saved)
- [ ] Google Workspace: 19 seats down to 11, backing up mailboxes first (~$176/mo)
- [ ] Rebuild the consult form in GHL to replace Gravity Forms (renews **Feb 7**)
- [ ] Move Dropbox to a shared Google Drive with permissions, before it renews on **Jan 5**
- [ ] Build the tool register (every login, owner, renewal date and cost) in 1Password and Drive
- [ ] Get a ValueStreamAI seat or vault in 1Password

## 4. Admin and money

- [ ] Confirm access is complete: GHL admin, GoDaddy, Stripe, Google Workspace admin, RingCentral, Dropbox, WordPress, 1Password, Search Console and Analytics, Google Business Profile, socials
- [ ] At launch: invoice the second 50% of Phase 1 ($1,775)
- [ ] Essentials support ($350/mo) starts the first full month after launch
- [ ] Pay Hive 10% on Phase 1 payments as they clear
- [ ] 30-day warranty on our site work starts at launch

## 5. Later (outside Phase 1, quote separately at market rates)

- Flos Rx phase: WooCommerce retirement (Hive's plan wanted it by Dec 1), moving Rx checkout and memberships into GHL
- Decide what to do with the WordPress site before plugins renew **Feb 13**
- SEO plan (Flos didn't pick it yet; easy upsell once the site is live and has data)
