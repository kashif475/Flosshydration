# Proposed GoHighLevel changes (not done yet, waiting on Kaitlyn's OK)

Nothing in this file has been built. Each item is written so it can be done click by click in the GHL UI (the API cannot create forms or workflows). Menu names are from the GHL app as of November 2026 and may shift slightly.
When an item is built, add a row to `docs/ghl-change-log.md` (what, ID, how made, rollback) and update `client/src/config/ghl.ts` if an ID changes.

Rules for all items:
- Create new items only. Do not edit or delete Flos's existing forms, workflows or calendars unless the item says so and Kaitlyn has agreed.
- No health questions on anything the website embeds. Health questions belong in Kaitlyn's intake questionnaire (HIPAA forms), which we only link to.
- No customer answers repeated in emails or texts.
- Test with the "test-contact" tag and Kash's own email, never real customers.

---

## 1. Form "Flos Hydration - Business & Event Inquiry"

Purpose: the website's business, group and event inquiry path. Contact details only.

Steps:
1. Sites > Forms > Builder > **+ Add Form** > Start from scratch. Name: `Flos Hydration - Business & Event Inquiry`.
2. Fields, in this order (use standard fields where they exist, otherwise create custom fields in the "Flos Hydration" folder):

   | Field | Type | Required |
   | --- | --- | --- |
   | First name | Standard: First Name | Yes |
   | Last name | Standard: Last Name | Yes |
   | Email | Standard: Email | Yes |
   | Phone | Standard: Phone | Yes |
   | Organization | Standard: Business Name | Yes |
   | Event or venue location | Custom: single line, `hydration_event_location` | Yes |
   | Estimated date | Custom: date, `hydration_event_date` | No |
   | Group size | Custom: number, `hydration_group_size` | No |
   | Notes | Custom: multi line, `hydration_inquiry_notes`, placeholder "Tell us about the setting and timing. Please don't include health information." | No |
   | Consent | Checkbox (SMS/email consent element) | Yes |

3. Consent text (replace the template wording; Flos to confirm): "I agree that Flos Hydration may contact me by phone, text and email about this inquiry. Message frequency varies. Message and data rates may apply. Reply STOP to opt out, HELP for help." Link Privacy Policy and Terms to the website's pages.
4. Styles: match the website (primary color #0A4F78, button text "Send inquiry"). No banner image.
5. Options > On submit: **Message**: "Thanks, we've received your inquiry. The Flos Hydration team will be in touch within one business day." (Flos to confirm the timing.)
6. Options > Submitter email: turn **off** "send form details". If an email is wanted, the workflow in item 2 sends a short one instead.
7. Save. Copy the form ID from Integrate > Embed (the part after `/widget/form/`).
8. Website: set `FORM_IDS.businessInquiry` in `client/src/config/ghl.ts` to the new ID and name. Run `pnpm check` and `pnpm build`.

Test: submit once from the staging site with Kash's details, last name "Test", tag the contact `test-contact` afterwards. Check the thank-you message shows and no email repeats the answers.

Rollback: Sites > Forms > the form > Delete (or leave it unused). Revert the `FORM_IDS` change on the website.

---

## 2. Workflow "Flos Hydration - Business Inquiry Alert"

Purpose: every business inquiry is tagged, lands in the business pipeline and alerts Kaitlyn.

Steps:
1. Automation > Workflows > **+ Create Workflow** > Start from scratch. Name: `Flos Hydration - Business Inquiry Alert`.
2. Trigger: **Form Submitted**, filter Form is `Flos Hydration - Business & Event Inquiry`.
3. Action **Add Contact Tag**: `flos-hydration-business-inquiry`.
4. Action **Create/Update Opportunity**: pipeline `Flos Hydration - Business & Mobile` (`YRpliMJjYQjxyGPCh0cm`), stage `New inquiry`, opportunity name `{{contact.company_name}} - {{contact.name}}`, source "Website", allow duplicate opportunities off.
5. Action **Internal Notification** > Email (and SMS if Kaitlyn wants it) to Kaitlyn McMurry. Subject: "New business inquiry: {{contact.company_name}}". Body: name, organization and a link to the contact record only. No notes, no phone or email in the text (Kaitlyn opens the record in GHL).
6. Optional action **Send Email** to the contact: subject "We got your request", body "Thanks for reaching out to Flos Hydration. We've received your inquiry and will be in touch within one business day." No answers repeated.
7. Settings: allow re-entry on; stop on response off.
8. Save as **Draft**. Test with Test workflow on a `test-contact` contact. Publish only after Kaitlyn approves.

Rollback: switch the workflow to Draft (stops it immediately), then delete it if not wanted. Tags and opportunities it created can be removed per contact.

---

## 3. Workflow "Flos Hydration Van - Confirmation, Reminders, Intake" (copy of the existing one)

Purpose: confirmations and reminders for the two van calendars, plus Kaitlyn's intake and consent link. The original workflow `fb779af2-b1a1-47bc-874c-79821508f2dd` ("Appointment Confirmation + Reminder - Flos Hydration") stays exactly as it is.

Steps:
1. Automation > Workflows > find `Appointment Confirmation + Reminder - Flos Hydration` > three-dot menu > **Duplicate** (or **Copy**). Do not open or edit the original.
2. Rename the copy: `Flos Hydration Van - Confirmation, Reminders, Intake`. Make sure the copy is in **Draft**.
3. Trigger (in the copy only): Appointment status, event type Normal, status confirmed. Remove the "In calendar group: Flos Hydration" filter and add **In calendar**: `IV Hydration Van (60 min)` (`YHa3D8M3GIKLIM4FnyUt`) and `NAD+ Van (2 hours)` (`9W3cXCWGFjacEM6pWEeW`).
4. Add an **If/Else** right after the trigger on calendar: NAD+ Van branch adds tag `flos-hydration-nad-booked`; the other branch adds `flos-hydration-van-booked`. Replace the copied "Add Tag" step with this.
5. Action **Create/Update Opportunity**: pipeline `Flos Hydration - Van Appointments` (`8ymDZ87Ga5lLbQYJPlHI`), stage `Booked`.
6. Keep the copied Internal Notification, Confirmation Email and SMS. Edit the copied texts so they mention the van at Scotts Valley Gym, the appointment time and the reschedule link, and nothing about treatments or health.
7. In the confirmation email and SMS, add the intake line: "Before your visit, please complete your health questionnaire and consent form: {{INTAKE_LINK}}". `{{INTAKE_LINK}}` is a placeholder until Kaitlyn supplies her HIPAA form link; then add tag `flos-hydration-intake-sent` after sending.
8. Keep the 24-hours-before wait, reminder email and SMS.
9. Change the copied "1 Hour before the appointment" wait to **2 hours before**, and rename the email step "2hr Reminder Email" (same short wording).
10. Save as Draft. Test with a test booking on the 60-minute calendar using a `test-contact` contact, then cancel the booking. Publish after Kaitlyn approves.

Check for clashes: the van calendars must not be added to the "Flos Hydration" calendar group, or the original workflow will also fire and customers get two of everything.

Rollback: switch the copy to Draft, then delete it. The original workflow is unaffected.

---

## 4. If Flos keeps the July "IV Hydration Event Form" (`MV1gvxvQLIRKYui1fh7t`)

Only if Kaitlyn wants to keep using it. Before editing, Duplicate it and edit the copy, so the July version and its history stay intact.

1. Sites > Forms > `IV Hydration Event Form` > three-dot menu > Duplicate. Name the copy, for example, `IV Hydration Event Form - [event name]`.
2. Banner: replace the "USPC Unleashed Iron Pro/Am Event, July 17th & 18th" image with a new event banner or a plain Flos Hydration header.
3. Consent checkboxes: replace "[BUSINESS NAME]" and "[USE_CASE_FROM_CAMPAIGN_DESCRIPTION]" with "Flos Hydration" and a real description, for example "appointment confirmations, reminders and follow-up about your visit". The marketing checkbox stays optional.
4. Submitter email: change the subject from "IV Hydration Confirmed for USPC Unleashed Iron Pro/Am Event" to "We received your request" and turn off "include form details", so the email no longer repeats date of birth, gender, treatment or health answers.
5. Health questions (date of birth, gender, health concerns): move them to Kaitlyn's intake form if this form will be embedded on the public website.
6. Service menu image and prices: update to match the approved menu (the form says boosters $45 and NAD+ $80; the website says NAD+ $700).

Rollback: delete the copy. The original stays as it was.
