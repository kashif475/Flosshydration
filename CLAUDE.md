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
| `client/src/components/HydrationMenuCalendar.tsx` | IV menu and prices, booking calendar embed (`#book`) |
| `client/src/hydration.css` | Section styles, calendar and form styling |
| `client/src/index.css` | Global colors, type, layout |
| `client/index.html` | Title, meta, GHL `form_embed.js` script |
| `client/public/` | Images and `404.html` |
| `netlify.toml` | Build command, publish dir, Node/pnpm versions, headers |

## Hosting and deploy

- **GitHub:** `kashif475/Flosshydration` (public, so Netlify's free plan allows it to deploy).
- **Netlify:** project `soft-cassata-578454`, live at https://soft-cassata-578454.netlify.app. Every push to `main` deploys.
- **Domain:** not chosen yet (hydration.floshealth.com, hydration.flosrx.com or floshydration.com). DNS is on GoDaddy.
- One-page site with no client routes. Unknown URLs get `404.html`, which sends people home. There's no SPA catch-all redirect, on purpose: the build uses relative asset paths (`base: "./"`), so deep links would load a blank page.

## GoHighLevel integration

- **Use embeds on the site, not the API in browser code.** Calendar embed: `https://api.leadconnectorhq.com/widget/booking/emK7FK4n7NWNASH8nAEw` (Flos Hydration calendar) with `allow="payment"`. `form_embed.js` auto-resizes it.
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

Next up:
1. Verify the calendar is no longer cut off at desktop and mobile widths
2. Edit the GHL form for the website (or copy it): replace the July event banner, add an individual vs. business choice, fill in the consent wording, then confirm the embed ID
3. Create the GHL pipelines and tags via the API (GHL forms record UTM source automatically); build the notify-Kaitlyn and auto-reply workflow in the GHL UI
4. Items waiting on Flos: final domain, menu prices (NAD+ is $700 on the site vs $520 in Hive's plan; several names differ), offers, legal pages, clinical review. See `docs/action-items.md`

## Local dev in Docker

```
docker start flos-dev   # http://localhost:5173 (container runs pnpm dev against this folder)
docker stop flos-dev
```

## Known environment issue (claude.ai session)

The claude.ai cloud session could not reach `services.leadconnectorhq.com` or push to GitHub, and could not keep a dev server running on Kash's Mac. Claude Code running locally has none of those limits.
