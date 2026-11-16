# GoHighLevel reference (Flos)

Embeds only on this static site. Never put a GHL API key or Private Integration token in this repo or in front-end code.
If the API is needed later, call it from a Netlify Function with the token stored in Netlify environment variables.

All embeds also need GHL's helper script (already in client/index.html):
`<script src="https://link.msgsndr.com/js/form_embed.js"></script>`

## Calendars

| Calendar | ID | Type | Used on the site |
| --- | --- | --- | --- |
| Flos Hydration (van, Scotts Valley Gym) | `emK7FK4n7NWNASH8nAEw` | booking widget | Yes, IV menu section (`HydrationMenuCalendar.tsx`) |
| Group Booking (Automation Calendars group) | `C944HUFkjFnMAcIxRQry` | Round robin, 30 min | No |
| Consultation Call (Automation Calendars group) | `3q54v3wqXX3j11MFej0Z` | Service booking, 15 min | No |
| Dr Jawad Khan's Personal Calendar | `GSjD2fNDfPHEIlJ5PxHp` | Personal, 15 min | No, tracking only |

## Calendar groups (group widgets)

| Group | Widget ID |
| --- | --- |
| Group widget 1 | `lDJxPibhTfAif7CWp64R` |
| Group widget 2 | `gNoGTTIFOocfql77n69n` |

Embed URL patterns:
- Single calendar: `https://api.leadconnectorhq.com/widget/booking/<calendarId>`
- Calendar group: `https://api.leadconnectorhq.com/widget/group/<groupId>`
- Keep `allow="payment"` on the iframe so Stripe checkout works inside it.

## Forms

| Form | ID | Used on the site |
| --- | --- | --- |
| Hydration: Individual inquiry | _to create_ | Contact section, "Individual appointment" tab |
| Hydration: Business / mobile inquiry | _to create_ | Contact section, "Business / mobile inquiry" tab |
