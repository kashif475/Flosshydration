# Flos Hydration website: project context for Claude Code

Read this first. It sums up the project, how it's built and deployed, and where work stands.
Detailed references: `docs/gohighlevel.md` (GHL IDs and embed rules) and `docs/action-items.md` (full Phase 1 checklist).

## Working rules (from Kash)

- **Do not commit or push unless Kash explicitly says so.** Make changes locally, test them, then report.
- Commits must be authored as `kashif475 <kashif@floshealth.com>` (already set in this repo's git config). Netlify's free plan only deploys commits from the account owner. No `Co-Authored-By` or Claude trailer lines in commit messages.
- Never put API keys or tokens in the code. `.env*` files are gitignored.
- No em dashes in any copy or docs (Kash's style preference).
- Run `pnpm check` and `pnpm build` after every change. Check desktop and mobile widths before calling something done.

## The project

- **Client:** Flos Health, Inc. (California), d/b/a Flos Rx and Flos Hydration, Scotts Valley, CA. Contacts: Kaitlyn McMurry and Mike Tyree (owners), Clint Treadway (previous IT/WordPress), Dr. Jawad Khan (clinical). Strategic lead: Divya Sharma, Hive Consulting Services (cc her on client email; scope and budget changes go through her).
- **Provider:** ValueStreamAI LLC (Muhammad Kashif "Kash", Founder). Signed SOW (SOW-FLOS-001) and BAA.
- **Scope (Phase 1):** Flos Hydration website plus GoHighLevel (GHL) integration ($2,800), and tech stack cleanup ($750). IT support Essentials ($350/mo) starts the first full month after launch. SEO not selected. Flos Rx is a separate future phase.
- **What the site is for:** individual IV hydration appointments at the Flos van parked at Scotts Valley Gym, plus mobile hydration for businesses, groups and events. Booking, forms, CRM, payments and automations all run in GoHighLevel. The website is a static front end that embeds GHL.
- **Compliance:** all patient data stays in GoHighLevel, which has its HIPAA add-on. The website never receives or stores form data: the booking calendar and the inquiry form are GHL embeds, so submissions go straight from the visitor's browser to GHL and never pass through Netlify. Intake and consent forms are sent from GHL after booking.

## Stack and commands

- React 19 + TypeScript + Vite 7 + Tailwind CSS 4, pnpm 10.4.1, Node 22.
- Original source by Jessica Kovash (via Hive), built with Manus.

```
pnpm install
pnpm dev        # http://localhost:5173
pnpm check      # tsc --noEmit
pnpm build      # outputs dist/
```

Key files:

| File | What's there |
| --- | --- |
| `client/src/pages/HydrationHome.tsx` | Hero, navigation, individual/mobile sections, FAQs, the contact section (`#contact`) with the GHL form embed |
| `client/src/components/GhlFormEmbed.tsx` | GHL form iframe embed |
| `client/src/components/HydrationMenuCalendar.tsx` | IV menu and prices, booking section (`#book`) with tabs for the two GHL van calendars |
| `client/src/hydration.css` | Section styles, calendar and form styling |
| `client/src/index.css` | Global colors, type, layout |
| `client/index.html` | Title, meta, canonical and social tags (`%SITE_URL%`), favicons, GHL `form_embed.js` script |
| `client/src/config/ghl.ts` | GHL calendar IDs and `FORM_IDS` (swap the business inquiry form ID here) |
| `client/src/lib/analytics.ts` | GA4 loader and `track()` events |
| `client/public/*.html` | Legal placeholder pages (privacy, terms, clinical disclaimer), noindex, plus `404.html` |
| `client/public/` | Images and `404.html` |
| `netlify.toml` | Build command, publish dir, Node/pnpm versions, headers |
| `vite.config.ts` | `SITE_URL` (default staging), generates `robots.txt` and `sitemap.xml`, reads `.env` from the repo root |

## Build settings and analytics

- `SITE_URL` (Netlify env var or `.env`): the public URL. Defaults to the staging URL in `vite.config.ts`. Set it to the final domain at launch; canonical, Open Graph, robots.txt and sitemap.xml all follow.
- `VITE_GA_MEASUREMENT_ID`: GA4 ID (public). Empty means no analytics script loads. Set it in Netlify's environment variables, not in code.
- Events sent (no names, emails or health details): `booking_cta_click` and `inquiry_cta_click` (with the button location), `booking_type_select` (`iv_60` or `nad_120`), `booking_section_view`, `phone_click`.
- GHL's `form_embed.js` does not post a "form submitted" or "booking made" message to the page (checked 2026-11-17; it only handles iframeLoaded, fetch-query-params, fetch/set-sticky-contacts and modify-parent-url). Track submissions from GHL itself (thank-you redirect page or GHL's own tracking), not from this site.
- Legal pages are plain static HTML in `client/public` so `/privacy.html` etc. deep-link directly on Netlify without a router and without touching `404.html`.

## Hosting and deploy

- **GitHub:** `kashif475/Flosshydration` (public, so Netlify's free plan allows it to deploy).
- **Netlify:** project `soft-cassata-578454`, live at https://soft-cassata-578454.netlify.app. Every push to `main` deploys.
- **Domain:** not chosen yet (hydration.floshealth.com, hydration.flosrx.com or floshydration.com). DNS is on GoDaddy.
- One-page site with no client routes. Unknown URLs get `404.html`, which sends people home. There's no SPA catch-all redirect, on purpose: the build uses relative asset paths (`base: "./"`), so deep links would load a blank page.

## GoHighLevel integration

- **Use embeds on the site, not the API in browser code.** Booking embeds: `https://api.leadconnectorhq.com/widget/booking/<calendarId>` for "IV Hydration Van (60 min)" `YHa3D8M3GIKLIM4FnyUt` and "NAD+ Van (2 hours)" `9W3cXCWGFjacEM6pWEeW`, with `allow="payment"`. `form_embed.js` auto-resizes them.
- **Every change in Flos's live GHL account is logged with its rollback in `docs/ghl-change-log.md`.** Add new items only; don't edit or delete their existing setup without Kash's OK.
- **Inquiry form (decided 2026-11-17):** embed the GHL form directly instead of a custom React form plus Netlify Function, so form data never passes through Netlify (no BAA on the free plan). The contact section currently embeds the existing "IV Hydration Event Form" (`MV1gvxvQLIRKYui1fh7t`). That form was built for the July USPC event and still needs editing in GHL (banner, an individual vs. business choice, consent wording); see `docs/action-items.md`. To swap forms, change `HYDRATION_FORM_ID` in `HydrationHome.tsx`. GHL's API cannot create or edit forms, so form changes happen in the GHL UI.
- **API use:** only for setup (pipelines, tags) and read-only checks, never from browser code. Token in `.env` locally as `GHL_TOKEN` and `GHL_LOCATION_ID` (`.env.example` shows the names; never prefix them with `VITE_`), and in Netlify env vars if a function ever needs it. Claude uses the token only through the environment variable and never reads `.env`. Workflows (notify Kaitlyn, auto-reply on form submit) are built in the GHL UI.
- **API token:** GHL sub-account, Settings, Private Integrations (enable under Settings, Labs if hidden). Created 2026-11-17 and verified read-only (location, contacts, pipelines, tags, custom fields, calendars, forms, workflows all return 200). It currently has far more scopes than needed, including payments and read access to Flos Rx patient records; trim to contacts, opportunities, pipelines, custom fields, tags (read/write) and calendars, locations, forms (read). Location ID: `hPqWvWwFMOH0laKe4Aku`.
- All calendar and widget IDs are in `docs/gohighlevel.md`.

## Status (as of 2026-11-17)

Done:
- Source in GitHub, Netlify config, live on staging (Netlify free plan, deploys on every push to `main`)
- Calendar embed: payment permission, GHL auto-resize script, visitor-facing copy; double card removed and height fixed so the widget isn't cut off
- "Contact" added to the top navigation
- Contact section embeds the GHL "IV Hydration Event Form"; the prototype React form is gone
- GHL Private Integration token created and verified read-only; `.env.example` added (`.env` stays local)
- End-to-end test on 2026-11-17 (contact "test kashif"): form to GHL works and the customer gets an email, but no team alert fires and the email repeats health answers. Details in `docs/action-items.md`
- New GHL van calendars (60 min and NAD+ 2 hours, Mon/Wed/Fri/Sat 9-12 and 5-8 Pacific, one chair), two Hydration pipelines and tags created 2026-11-17; the website books through the van calendars. See `docs/ghl-change-log.md`

Next up:
1. Waiting on Kaitlyn's answers (provider, hours, alerts, booking messages, intake forms, business form, old calendar, texts). Draft email sent by Kash
2. Edit the GHL form for the website (or copy it): replace the July event banner, add an individual vs. business choice, fill in the consent wording, then confirm the embed ID
3. After Kaitlyn replies: business/mobile inquiry form (contact details only) and its alert workflow; copy the existing "Appointment Confirmation + Reminder - Flos Hydration" workflow for the van calendars (2-hour reminder, intake and consent link); intake and consent forms
4. Items waiting on Flos: final domain, menu prices (NAD+ is $700 on the site vs $520 in Hive's plan; several names differ), offers, legal pages, clinical review. See `docs/action-items.md`

## Local dev in Docker

```
docker start flos-dev   # http://localhost:5173 (container runs pnpm dev against this folder)
docker stop flos-dev
```

## Known environment issue (claude.ai session)

The claude.ai cloud session could not reach `services.leadconnectorhq.com` or push to GitHub, and could not keep a dev server running on Kash's Mac. Claude Code running locally has none of those limits.
