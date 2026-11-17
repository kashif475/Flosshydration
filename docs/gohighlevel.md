# GoHighLevel reference (Flos)

Embeds only on this static site. Never put a GHL API key or Private Integration token in this repo or in front-end code.
If the API is needed later, call it from a Netlify Function with the token stored in Netlify environment variables.

All embeds also need GHL's helper script (already in client/index.html):
`<script src="https://link.msgsndr.com/js/form_embed.js"></script>`

## Calendars

| Calendar | ID | Type | Used on the site |
| --- | --- | --- | --- |
| IV Hydration Van (60 min) | `YHa3D8M3GIKLIM4FnyUt` | Round robin (Kaitlyn), 60 min, 1 per slot, 15-min buffer; Mon/Wed/Fri/Sat 9-12 and 5-8 Pacific (custom schedule on this calendar only) | Yes, booking section, "IV hydration" tab (created 2026-11-17) |
| NAD+ Van (2 hours) | `9W3cXCWGFjacEM6pWEeW` | Same, 120 min | Yes, booking section, "NAD+ infusion" tab (created 2026-11-17) |
| Flos Hydration Calendar (original) | `emK7FK4n7NWNASH8nAEw` | Personal (Kaitlyn), 30 min, 2 per slot, uses her work hours | No longer on the site since 2026-11-17; left unchanged in GHL |
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

Forms are embedded as iframes (`client/src/components/GhlFormEmbed.tsx`), so submissions go straight to GHL and never pass through Netlify. The API can list forms and read submissions but cannot create or edit forms.

| Form | ID | Used on the site |
| --- | --- | --- |
| IV Hydration Event Form | `MV1gvxvQLIRKYui1fh7t` | Yes, contact section (`#contact`). Built for the July USPC event; needs a new banner, an individual vs. business choice and real consent wording |
| Testimonial Submission | `c8LmFv1EYmguCGXLlEGm` | No |
| Anaheim Event Form | `YQhlFLOpsyheEcN70AXS` | No |
| Anaheim Event Form | `TwuS6TE0OuD2QbdpjgtL` | No |
| Form 0 | `Dmxn8YnLpceNbFJcmFPV` | No (blank) |

Form embed URL: `https://api.leadconnectorhq.com/widget/form/<formId>`

IV Hydration Event Form fields (checked 2026-11-17): first name, last name, phone (required), date of birth, email (required), gender, IV bag (required: Electrolyte Rehydration $130, Myers Cocktail $220, Sports Recovery $240, Beautify $240, Hangover $240, Immune Boost $270, Flos+ $290), booster injection (required, multi: No, Vitamin B12 $45, Glutathione $45, Toradol $45, NAD+ $80), health concerns (free text), two SMS consent checkboxes (text still has "[BUSINESS NAME]" placeholders).

## Account

- Location ID: `hPqWvWwFMOH0laKe4Aku` (Flos, Scotts Valley, America/Los_Angeles)
- Existing Hydration workflow: "Appointment Confirmation + Reminder - Flos Hydration" (published). Check what it sends before adding reminders, to avoid duplicates.
