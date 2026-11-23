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
| 8 | 2026-11-19 | Test contact `w97LBxZFGnLv3HmWUYS5` renamed from "test kashif" to "Test Muhammad Kashif" and tagged `test-contact`. This is the only contact used for testing | API `PUT /contacts/{id}`, `POST /contacts/{id}/tags` | Delete the contact when testing is finished (only on Kash's OK). |
| 9 | 2026-11-19 | Created contact custom fields: Hydration Event Location `2pBruPblAJ2cIRlNPwVd`, Hydration Event Date `cuhp3B5bPssYlaKq6ltx`, Hydration Group Size `3t3Cn9Vi2L2Y6CVEKEci`, Hydration Inquiry Notes `4uHe11JkX2suHw0sV6re` | API `POST /locations/{id}/customFields` | Settings, Custom Fields, delete each (or API `DELETE /locations/{id}/customFields/{fieldId}`). |
| 10 | 2026-11-19 | Created blank form "Form 6" `ZJkksYo8O4jlXE0UfBgA`, to become "Flos Hydration - Business & Event Inquiry". Not on the website yet | GHL UI: Sites, Forms, Create form | Sites, Forms, row menu, Delete. |
| 11 | 2026-11-19 | Duplicated workflow as draft "Flos Hydration Van - Confirmation, Reminders, Intake" `52c7dd98-ab6f-43b8-80b2-6d69f3a878b6`. Original `fb779af2-b1a1-47bc-874c-79821508f2dd` unchanged and still published | GHL UI: Workflows, row menu, Duplicate workflow | Automation, Workflows, row menu, Delete workflow. As a draft it sends nothing. |
| 12 | 2026-11-19 | Edits on the draft copy only: trigger changed to "Customer booked appointment" with one trigger per van calendar (`YHa3D8M3GIKLIM4FnyUt`, `9W3cXCWGFjacEM6pWEeW`); Add Tag now `flos-hydration-van-booked`; second reminder wait changed from 1 hour to 2 hours before | GHL UI: workflow builder | Delete the draft (row 11). |
| 13 | 2026-11-19 | Test contact `w97LBxZFGnLv3HmWUYS5` email changed to the Flos test account kashif@floshealth.com | API `PUT /contacts/{id}` | Set the previous email back, or delete the test contact when testing ends. |
| 14 | 2026-11-18 | Kash edited the draft `52c7dd98-ab6f-43b8-80b2-6d69f3a878b6` by hand (now version 6, still draft): alert to Kaitlyn only, van wording, 2-hour reminders, last wait and two "starting" messages removed, Create Opportunity step added. Step contents not yet confirmed by a test run | GHL UI: workflow builder | Delete the draft (row 11). |
| 15 | 2026-11-18 | Test contact `w97LBxZFGnLv3HmWUYS5` enrolled in the draft `52c7dd98-ab6f-43b8-80b2-6d69f3a878b6` at 23:08 UTC with event time 2026-11-21 10:00 AM Pacific. Approved by Kash. GHL returned 201, trace `7c3725d7-b772-42e7-941e-35dd5cac0762` | GHL MCP `add-contact-to-workflow` | GHL MCP `delete-contact-from-workflow` with the same contact, workflow and event time. |
| 16 | 2026-11-19 | Kash created form "Flos Hydration - Business & Event Inquiry" `jfqKBPuYcoXjSDDQDull`. Blank "Form 6" `ZJkksYo8O4jlXE0UfBgA` (row 10) is left unused | GHL UI: Sites, Forms | Sites, Forms, row menu, Delete, after moving the website back (row 17). |
| 18 | 2026-11-23 | Tried to set the van Saturdays to the 1st and 3rd Saturday by API on "IV Hydration Van (60 min)" `YHa3D8M3GIKLIM4FnyUt` only: removed Saturday from `openHours` and added 8 date overrides. GHL saved the overrides but did not use them for this round-robin calendar, and each `PUT /calendars/{id}` also reset fields that were not sent (slot interval 60 to 30, default duration 60 to 30, pre-buffer; one PUT also emptied `openHours`, so the calendar showed no times for a few minutes). All of that was put back by API and checked against the backup: weekly hours identical, 60-min interval and duration, overrides removed. Remaining difference, checked 00:13 UTC: this calendar shows no Saturday slots, only 3 start times per open day instead of 6, and no times on Mon Nov 23 or Wed Dec 23, while the untouched NAD+ calendar still shows every Saturday. Kaitlyn's availability for this calendar needs re-saving in the UI. NAD+ calendar not changed | API `PUT /calendars/{id}` | Fix in the GHL UI (see `docs/ghl-build-guide.md`, "Saturday hours"). Backup of both calendars' hours: Claude's session scratchpad, `cal_backup_2026-11-23.json`. |
| 19 | 2026-11-23 | Fixed row 18 and set the van hours properly. Created availability schedule "Flos Hydration Van (Mon Wed Fri, 1st and 3rd Sat)" `PvT5uLc5NBe0VU7cUPEY` for Kaitlyn McMurry, America/Los_Angeles: Monday, Wednesday and Friday 9:00 to 12:00 and 17:00 to 20:00, plus date rules with the same hours for every 1st and 3rd Saturday from Dec 5, 2026 to Dec 18, 2027 (no other Saturdays). Attached to the 60-min calendar first, checked, then to NAD+ `9W3cXCWGFjacEM6pWEeW`. Verified by free slots: 6 start times a day on the 60-min calendar, 4 on NAD+, Saturdays only Dec 5, Dec 19, Jan 2, Jan 16 in range. Compared with a full backup: 11 existing schedules (including Kaitlyn's Work Hours) and both calendars' settings unchanged | API `POST /calendars/schedules`, `PUT /calendars/schedules/{id}/associations/{calendarId}` | `DELETE /calendars/schedules/PvT5uLc5NBe0VU7cUPEY`. Note: without it the 60-min calendar falls back to Kaitlyn's Work Hours (only 9, 10, 11 AM, Mon to Fri). Full backups in `.ghl-backups/` (local, gitignored). Add 2028 Saturdays before Dec 2027. |
| 17 | 2026-11-19 | Website contact section switched from the July "IV Hydration Event Form" to the new inquiry form, inline embed. No GHL change. Local only until pushed | Code: `client/src/config/ghl.ts`, `GhlFormEmbed.tsx`, `hydration.css` | Set `FORM_IDS.businessInquiry` back to `MV1gvxvQLIRKYui1fh7t` and push. |

## Business inquiry backend check (2026-11-19, read-only, nothing changed)

- Ready: tag `flos-hydration-business-inquiry`; pipeline `YRpliMJjYQjxyGPCh0cm`, stage "New inquiry" `993ad691-e792-498b-81a1-af078561cc3e`; Kaitlyn McMurry's user `tLOCsDcDc0uhLdgfK3XA`.
- The form saves to its own contact fields: `contact.date`, `contact.event_type`, `contact.expected_number_of_guests`, `contact.event_location_city_or_venue`, `contact.anything_else_we_should_know`.
- The four fields in row 9 are not used by this form. Leave them unless Kash asks to remove them.
- The workflow "Flos Hydration - Business Inquiry Alert" is not built. Steps are in Task 3 of `docs/ghl-build-guide.md`.

## Things to watch for clashes

- Bookings on the new calendars are assigned to Kaitlyn, so they block her time on her other calendars and appear in any calendar she has connected (for example Google). That is intended (one provider, one chair), but tell her.
- The original 30-minute calendar is no longer on the website but is still active in GHL (its own booking link still works). Ask Kaitlyn whether to keep or retire it.
- The booking widget shows times in the visitor's own time zone (Pacific for local customers).
- The existing "Appointment Confirmation + Reminder - Flos Hydration" workflow only fires for the "Flos Hydration" calendar group, so van-calendar bookings currently get only GHL's built-in calendar notifications, not that workflow. If the van calendars are ever added to that group, it will start sending its messages for them too.

## Still to fix on the draft before it can be published

- Confirmation email (and probably the other copied messages) says "When it is time, we will give you a call at {{contact.phone}}". That is wrong for an in-person van visit.
- The step named "1hr Reminder Email" still needs renaming, and its text checking, now the wait is 2 hours.
- Internal Notification sends an SMS to Clint Treadway, Johnny Mengo and Kaitlyn McMurry. Decided 2026-11-19: Kaitlyn only. Kash is making this change by hand in the GHL UI (the API cannot edit workflow steps). Do not also add a calendar SMS notification for the assigned user, or Kaitlyn gets two texts per booking.
- Intake and consent link is not added (waiting on Kaitlyn's form). Opportunity step for "Flos Hydration - Van Appointments" is not added.

## Test run on 2026-11-18 (22:38 UTC, draft version 4)

- Test contact received the `flos-hydration-van-booked` tag and 4 emails (delivered to kashif@floshealth.com).
- All 4 SMS failed with Error 21408: the account cannot text +92 numbers. SMS delivery is therefore untested.
- The run used the unsaved-edit version, so the Internal Notification may have texted Clint Treadway, Johnny Mengo and Kaitlyn McMurry. Not visible through the API; check the workflow's Execution logs.

## Test run on 2026-11-18 (23:08 UTC, draft version 6, API enrollment)

- GHL accepted the enrollment (201), but the test did not show the workflow running. Checked at 23:09 and 23:13 UTC: no new emails or SMS on the test contact and no opportunity created.
- The `flos-hydration-van-booked` tag was already on the contact from the earlier test, so it proves nothing about this run.
- The cause is not confirmed. The workflow stayed in draft, and its steps and execution logs cannot be read because the Workflows API is not enabled for this sub-account (403 `WORKFLOW_API_NOT_ENABLED_FOR_LOCATION`).
- Whether Kaitlyn received an internal alert cannot be checked through the API. The draft's messages and opportunity step remain untested at version 6.

## Van draft: decision on 2026-11-18

- Keep `52c7dd98-ab6f-43b8-80b2-6d69f3a878b6` as a draft and test it later on a call with Divya and the Flos team, with their OK before anyone receives messages.
- Before publishing: confirm version 6 by a full test run (wording, opportunity step, alert to Kaitlyn only, SMS to a US number), and remove the test enrollment in row 15.
- Kash saw Divya listed as a contact inside the draft. Check the workflow's Enrollment history to see how she got there and whether she received anything.

## Test data

- Contact "Test Muhammad Kashif" `w97LBxZFGnLv3HmWUYS5` (tag `test-contact`). The only contact to use in tests. Leave until Kaitlyn has seen it.
