# GoHighLevel change log (Flos account)

Every change ValueStreamAI makes in Flos's live GoHighLevel account, with how to undo it.
Rule: add new items only; do not edit or delete Flos's existing calendars, forms, workflows, pipelines or users without Kash's explicit OK.
Location ID: `hPqWvWwFMOH0laKe4Aku`. Times are Pacific.

## Baseline before changes (2026-11-17)

- Existing "Flos Hydration Calendar" `emK7FK4n7NWNASH8nAEw`: personal calendar for Kaitlyn McMurry, 30-minute slots, 30-minute interval, 2 bookings per slot, 15-minute pre-buffer, auto-confirm on, 0 upcoming bookings. Still embedded on the website until we switch.
- Kaitlyn's general "Work Hours" schedule: weekdays 9:00 AM to 5:00 PM. Not changed.
- Existing pipelines: "Doctors Consultation ONLY", "New Leads".
- Existing published workflow "Appointment Confirmation + Reminder - Flos Hydration" `fb779af2-b1a1-47bc-874c-79821508f2dd` (inspected read-only, not changed). Trigger: appointment status confirmed, event type Normal, in calendar group "Flos Hydration". Steps: Add Tag, Internal Notification, Confirmation Email, SMS, wait until 24 hours before, 24 hr Reminder Email, SMS, wait until 1 hour before, 1hr Reminder Email (and possibly more below). Our new calendars are not in that group, so it does not fire for them.

## Changes

| # | When | What | How made | Rollback |
| --- | --- | --- | --- | --- |
| 1 | 2026-11-17 | Created calendar "IV Hydration Van (60 min)" `YHa3D8M3GIKLIM4FnyUt`: round robin, Kaitlyn only, 60-min slots, 60-min interval, 15-min buffer after, 1 per slot, book 12 hours to 60 days ahead, auto-confirm | API `POST /calendars/` | Settings, Calendars, row actions, Delete (or API `DELETE /calendars/YHa3D8M3GIKLIM4FnyUt`). Cancel any bookings on it first. |
| 2 | 2026-11-17 | Created calendar "NAD+ Van (2 hours)" `9W3cXCWGFjacEM6pWEeW`: same settings, 120-min slots | API `POST /calendars/` | Same as #1 with this ID. |
| 3 | 2026-11-17 | Both new calendars: Kaitlyn's custom schedule for that calendar only set to Mon, Wed, Fri, Sat 9:00 AM to 12:00 PM and 5:00 PM to 8:00 PM | GHL UI: calendar, Availability, Kaitlyn, Custom schedule, Edit | Not needed if #1 and #2 are deleted. This is per-calendar and does not change Kaitlyn's Work Hours or her other calendars (verified: old calendar slots unchanged). |
| 4 | 2026-11-17 | Created pipeline "Flos Hydration - Business & Mobile" `YRpliMJjYQjxyGPCh0cm` (New inquiry, Contacted, Proposal sent, Event booked, Completed) | API `POST /opportunities/pipelines` | Settings, Opportunities & Pipelines, delete the pipeline (move or delete its opportunities first). |
| 5 | 2026-11-17 | Created pipeline "Flos Hydration - Van Appointments" `8ymDZ87Ga5lLbQYJPlHI` (Booked, Intake complete, Visit completed, No-show / cancelled) | API | Same as #4. |
| 6 | 2026-11-17 | Created tags: `flos-hydration-business-inquiry`, `flos-hydration-van-booked`, `flos-hydration-nad-booked`, `flos-hydration-intake-sent`, `flos-hydration-intake-complete`, `test-contact` | API `POST /locations/{id}/tags` | Settings, Tags, delete each (removes it from any contacts). |
| 7 | 2026-11-17 | Website booking section switched from the original calendar to the two van calendars (tabs: IV hydration 60 min, NAD+ 2 hours). No GHL change | Code: `HydrationMenuCalendar.tsx`, pushed to `main` (Netlify staging) | Revert that commit and push; the original calendar `emK7FK4n7NWNASH8nAEw` is untouched and works as before. |

## Things to watch for clashes

- Bookings on the new calendars are assigned to Kaitlyn, so they block her time on her other calendars and appear in any calendar she has connected (for example Google). That is intended (one provider, one chair), but tell her.
- The original 30-minute calendar is no longer on the website but is still active in GHL (its own booking link still works). Ask Kaitlyn whether to keep or retire it.
- The booking widget shows times in the visitor's own time zone (Pacific for local customers).
- The existing "Appointment Confirmation + Reminder - Flos Hydration" workflow only fires for the "Flos Hydration" calendar group, so van-calendar bookings currently get only GHL's built-in calendar notifications, not that workflow. If the van calendars are ever added to that group, it will start sending its messages for them too.

## Test data

- Contact "test kashif" `w97LBxZFGnLv3HmWUYS5` (form test, Nov 16). Leave until Kaitlyn has seen it.
