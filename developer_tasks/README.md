# Developer tasks (tickets)

Written by the project manager (Claude, claude.ai project "flosshealth") on 2026-11-23. One file per ticket. Work them in priority order unless Kash says otherwise.

## Rules for every ticket
- Do NOT commit or push unless Kash explicitly says so. Commits are authored as kashif475 <kashif@floshealth.com>, no Co-Authored-By or Claude trailer lines.
- Stay inside SOW-FLOS-001 (sections 2.1 and 2.2). If a task looks like extra work, stop and ask.
- Never read or print .env. Use GHL_TOKEN and GHL_LOCATION_ID from the environment only, never VITE_.
- GoHighLevel: read-only API calls unless a ticket says otherwise. Workflows and forms are built by Kash in the GHL UI (Workflows API not enabled). Log every live GHL change, with its rollback, in docs/ghl-change-log.md.
- Never submit test forms or bookings without asking Kash (they send real emails and texts).
- No em dashes in any copy, comments or docs.
- Before calling a ticket done: pnpm check, pnpm build, screenshots at 1440px and 390px.
- When a ticket is done or blocked, update its Status line and the table below.

## Key decisions (from Kaitlyn's email, Nov 20)
- Domain: floshydration.com
- Saturdays: only the 1st and 3rd Saturday of each month (done in GHL Nov 23)
- Bookings go to Kaitlyn
- NAD+ infusion: $520. Menu per docs/menu-2026-11-20.md
- Intake and consent form: we build it in GHL from Kaitlyn's questions (waiting on her questions)
- RingCentral: no new paid line; ask Kaitlyn to reassign a line that is being cut
- Legal wording: from Flos's attorney (overdue since Nov 20)
- Inquiry alert to Kaitlyn excludes the customer's free-text notes

## Tickets

| ID | Title | Owner | Priority | Status |
| --- | --- | --- | --- | --- |
| T-001 | Menu ingredients and push the menu/schedule changes | Dev, then Kash pushes | High | In review: waiting for push OK |
| T-002 | Inquiry alert workflow (build in GHL UI, dev verifies) | Kash builds, dev verifies | High | Ready |
| T-003 | Inquiry form: Organization required, end-to-end test | Kash, dev verifies | High | Ready |
| T-004 | Clean the draft van booking workflow before publishing | Dev investigates, Kash fixes | High | Ready |
| T-005 | SMS registration (A2P 10DLC) | Kash | High | Ready, start today |
| T-006 | Trim the GHL API token's permissions | Kash, dev lists scopes | High | Ready |
| T-007 | DNS plan for floshydration.com (prepare only) | Dev | High | Ready |
| T-008 | GA4: create property and wire it up | Kash creates, dev wires | Medium | Ready |
| T-009 | Consult form rebuild in GHL (SOW 2.2, due early Dec) | Dev specs, Kash builds | Medium | Blocked: needs Gravity Forms export |
| T-010 | Google Workspace seat report | Kash pulls, dev formats | Medium | Ready |
| T-011 | Legal pages: drop in Flos's wording | Dev | Medium | Blocked: attorney wording |
| T-012 | Intake and consent form in GHL | Dev specs, Kash builds | Medium | Blocked: Kaitlyn's questions |
| T-013 | Stripe setup | Kash with Kaitlyn, dev assists | Medium | Blocked: call with Kaitlyn |
| T-014 | RingCentral line inventory and cut plan | Kash, dev drafts plan | Low | Blocked: line reassigned to Kash |
| T-015 | Dropbox to Google Drive map, and tool register | Dev drafts, Kash fills | Low | Ready |
| T-016 | Real-device testing | Kash, dev fixes | Medium | Ready after T-001 |
| T-017 | Launch checklist (domain live, badge, links, invoice) | Dev | Low | Later (target Dec 11) |
