# GoHighLevel build guide (tasks 1 to 7)

Do these in order, signed in to GoHighLevel in your own browser. GHL's builders can take up to a minute to appear. Menu names can differ slightly; if one doesn't match, tell Claude what you see.

Rules for every task:
- Use only the test contact **Test Muhammad Kashif** (`w97LBxZFGnLv3HmWUYS5`), with the email **kashif@floshealth.com** and the phone already on that contact.
- Do not open or edit **Appointment Confirmation + Reminder - Flos Hydration**. That is Flos's live workflow.
- No health questions on the website form, and no health details in any alert.
- After each task, tell Claude "task N done" so it can check the result and log it in `docs/ghl-change-log.md`.

---

## Task 1: Finish the booking messages draft (about 20 minutes)

Open it: **Automation > Workflows**, search **Flos Hydration Van**, open **Flos Hydration Van - Confirmation, Reminders, Intake**. Keep the switch at the top right on **Draft** the whole time.

**A. Send the alert to Kaitlyn only**
1. Click **Internal Notification**.
2. Under **Select Users**, click the **X** on **Clint Treadway** and **Johnny Mengo**. Keep **Kaitlyn McMurry**.
3. Click **Save action**.

**B. Fix the confirmation email**
1. Click **Confirmation Email**.
2. In the message, select only this line: `When it is time, we will give you a call at {{contact.phone}}.`
3. Type: `Your visit is at the Flos Hydration van at Scotts Valley Gym.`
4. Scroll down to **Test Emails**, enter `kashif@floshealth.com`, click **Send test mail**, and read it.
5. Click **Save action**.

**C. Fix the other messages (exact wording)**

Open each step, make the change, and click **Save action**. Replace wording only; keep the `{{...}}` placeholders you aren't told to remove.

| Step | Change |
| --- | --- |
| **SMS** after Confirmation Email | Replace the "we will give you a call" line with `Your visit is at the Flos Hydration van at Scotts Valley Gym.` |
| **24 hr Reminder Email** | Subject: `Your Flos Hydration visit is in 24 hours`. Replace the "we will give you a call" line with the van sentence above. |
| **SMS** after the 24 hr email | Change "our appointment" to "your appointment". Replace the call line with the van sentence. |
| **1hr Reminder Email** | Action Name: `2hr Reminder Email`. Subject: `Your Flos Hydration visit is in 2 hours`. Message: change "one hour" to "two hours" and replace "We will give you a call at {{contact.phone}}." with the van sentence. |
| **SMS** after that email | Replace the text with `Hi {{contact.first_name}}, just a friendly reminder that your appointment is in two hours at the Flos Hydration van at Scotts Valley Gym. -Flos Hydration Reply STOP to unsubscribe from texts` |
| Last wait, **"appointment is starting" email** and last **SMS** | Delete all three steps (three dots on each box, then Delete). They say "We will give you a call in 5" and the plan only needs confirmation, 24-hour and 2-hour messages. |

**D. Add the pipeline step**
1. Click the **+** directly under **Add Tag**.
2. Search for and choose **Create Opportunity** (not the older Create/Update action, which GHL is retiring).
3. **Pipeline:** `Flos Hydration - Van Appointments`
4. **Stage:** `Booked`
5. **Opportunity name:** `{{contact.name}} - Van booking`
6. **Status:** Open. Leave **Allow duplicate opportunities** off.
7. Click **Save action**.

**E. Save**
1. Click **Save** at the top right.
2. Leave it on **Draft**. It goes live only after Kaitlyn approves the messages and sends her intake link.

---

## Task 2: Build the business inquiry form (done 2026-11-19)

Built as `Flos Hydration - Business & Event Inquiry` (`jfqKBPuYcoXjSDDQDull`) and embedded on the website. "Form 6" is unused. The original steps are kept below for reference.

Open it: **Sites > Forms > Builder**, then click **Form 6**.

**A. Name it**
Rename the form at the top to `Flos Hydration - Business & Event Inquiry`.

**B. Add the fields in this order**

Drag each one from the left panel. Custom fields are under **Custom Fields**; search by name.

| # | Field | Where to find it | Required |
| --- | --- | --- | --- |
| 1 | First Name | Personal info | Yes |
| 2 | Last Name | Personal info | Yes |
| 3 | Email | Contact info | Yes |
| 4 | Phone | Contact info | Yes |
| 5 | Business Name (label it `Organization`) | Contact or business info | Yes |
| 6 | Hydration Event Location (label it `Event or venue location`) | Custom Fields | Yes |
| 7 | Hydration Event Date (label it `Estimated date`) | Custom Fields | No |
| 8 | Hydration Group Size (label it `Estimated group size`) | Custom Fields | No |
| 9 | Hydration Inquiry Notes (label it `Notes`) | Custom Fields | No |
| 10 | Terms & Conditions / consent checkbox | Other or Quick add | Yes |

Remove any default field you didn't add. Do not add date of birth, gender or health questions.

**C. Consent wording**

Click the consent field and use:

> I agree that Flos Hydration may contact me by phone, text and email about this inquiry. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.

Flos should confirm this wording before launch.

**D. Button and style**
1. Click the **Submit** button and change its text to `Send inquiry`.
2. In **Styles**, set the button color to `#0A4F78`.
3. Do not add a banner image.

**E. After someone submits**
1. Open **Options** (or **Settings**) for the form.
2. Under **On submit**, choose **Message** and enter: `Thanks, we've received your inquiry. The Flos Hydration team will be in touch soon.`
3. Turn **off** any option that emails the submitter a copy of their answers.

**F. Save**
Click **Save**. Tell Claude "task 2 done". The form ID is `ZJkksYo8O4jlXE0UfBgA`, so nothing needs copying.

---

## Task 3: Build the inquiry alert (about 20 minutes)

This has to be built in the GHL workflow builder, because the Workflows API is not enabled for this sub-account. Everything the workflow points to already exists.

**Before you start:** open the form `Flos Hydration - Business & Event Inquiry` and mark **Organization** as required. The opportunity name uses it, and a required field avoids a blank name.

1. Go to **Automation > Workflows** and click **Create workflow > Start from scratch**.
2. Rename it at the top: `Flos Hydration - Business Inquiry Alert`.
3. Click **Add new trigger**, search **Form submitted**, and choose it.
4. Click **Add filters**, choose **Form is**, and select `Flos Hydration - Business & Event Inquiry` (`jfqKBPuYcoXjSDDQDull`). Click **Save trigger**.
5. Click **+**, choose **Add Contact Tag**, select `flos-hydration-business-inquiry`, and click **Save action**.
6. Click **+**, choose **Create Opportunity** (not the older Create/Update action, which GHL is retiring):
   - **Pipeline:** `Flos Hydration - Business & Mobile`
   - **Stage:** `New inquiry`
   - **Opportunity name:** `{{contact.company_name}} - event inquiry`
   - **Status:** Open
   - **Allow duplicate opportunities:** off
   - Click **Save action**.
7. Click **+**, choose **Internal Notification**:
   - **Type of notification:** Email
   - **To user type:** Particular User
   - **Select users:** Kaitlyn McMurry
   - **Subject:** `New business/event inquiry: {{contact.company_name}}`
   - **Message:**

   ```
   Name: {{contact.name}}
   Organization: {{contact.company_name}}
   Phone: {{contact.phone}}
   Email: {{contact.email}}
   Event type: {{contact.event_type}}
   Event location: {{contact.event_location_city_or_venue}}
   Estimated date: {{contact.date}}
   Number of guests: {{contact.expected_number_of_guests}}
   Notes: {{contact.anything_else_we_should_know}}
   Contact record: https://app.gohighlevel.com/v2/location/hPqWvWwFMOH0laKe4Aku/contacts/detail/{{contact.id}}
   ```

   - Click **Save action**.
8. Click **+**, choose **Internal Notification** again for the text alert:
   - **Type of notification:** SMS
   - **To user type:** Particular User
   - **Select users:** Kaitlyn McMurry
   - **Message:** `New Flos Hydration inquiry from {{contact.name}}, {{contact.company_name}}. Details: https://app.gohighlevel.com/v2/location/hPqWvWwFMOH0laKe4Aku/contacts/detail/{{contact.id}}`
   - Click **Save action**.
9. Click **+**, choose **Send Email**:
   - **From name:** `Flos Hydration`
   - **From email:** `info@floshealth.com`
   - **Subject:** `We got your inquiry | Flos Hydration`
   - **Message (plain text, no template, images or banner):**

   ```
   Hi {{contact.first_name}},

   Thanks for reaching out about bringing Flos Hydration to your group or event. We've received your details and will be in touch within 1 business day.

   If it's urgent, call us at 1.844.967.FLOS.

   The Flos Hydration team
   ```

   - Click **Save action**.
10. Open the **Settings** tab and turn **Allow re-entry** on.
11. Click **Save** at the top right. Leave it on **Draft**.

---

## Task 4: Test both flows (about 15 minutes)

Tell Kaitlyn first: "You'll get one test text from Flos Hydration about Test Muhammad Kashif."

**A. Business inquiry (real test)**
1. Open **Flos Hydration - Business Inquiry Alert** and switch it to **Publish**. Click **Save**.
2. Open this link in a private browser window: https://api.leadconnectorhq.com/widget/form/jfqKBPuYcoXjSDDQDull
3. Fill it in:
   - **First name:** `Test`
   - **Last name:** `Muhammad Kashif`
   - **Email:** `kashif@floshealth.com`
   - **Phone:** the one already on the test contact
   - **Organization:** `Test Organization`
   - **Location:** `Test venue`
   - **Notes:** `TEST submission, please ignore.`
4. Tick consent and click **Send inquiry**.
5. Check the thank-you message appears.
6. Tell Claude "test submitted". Claude checks the contact, tag, pipeline entry and alert through the API.

**B. Booking messages (preview only)**

Do not publish this workflow. You already previewed the confirmation email in task 1. Preview the rest:
1. Open each email step, enter `kashif@floshealth.com` under **Test Emails**, and click **Send test mail**.
2. Open each SMS step, enter a **US** mobile number under **Test phone number**, and click **Send test SMS**. The test contact's +92 number cannot receive texts from this account (Error 21408).
3. Close each step with **Cancel**.

The date and time placeholders can show blank in previews. The full booking test happens after Kaitlyn approves.

---

## Task 5: Website copy (Claude has done this)

The wording now says people can book online rather than request a time. Review it at http://localhost:5173 and tell Claude if you want anything changed. Nothing is committed yet.

---

## Task 6: Capture the WordPress consult form (about 10 minutes)

1. Sign in to the Flos WordPress admin.
2. In the left menu, click **Forms** (Gravity Forms), then open the consult form.
3. Take screenshots of the whole form in the editor, top to bottom. Open any field with conditional logic and capture those rules too.
4. Open **Settings > Notifications** and **Settings > Confirmations** for that form, and screenshot both.
5. Send the screenshots to Claude. Do not open or send **Entries**, because those contain patient information.

If the WordPress login doesn't work, tell Claude and we'll add it to the access list for Flos.

---

## Task 7: Build the consult form in GHL (about 45 minutes)

Claude will write the exact field list after task 6 and create the custom fields through the API. Then:
1. Go to **Sites > Forms > Builder > Create form > Start from scratch**.
2. Name it `Flos Consult Form - DRAFT`.
3. Add the fields in the order Claude gives you.
4. Match the on-submit message from the WordPress confirmation.
5. Save. Do not embed or link it anywhere yet.
6. Tell Claude "task 7 done" so the form can go to Flos for review. Flos must confirm the questions before it replaces the WordPress form.

---

## Saturday hours: 1st and 3rd Saturday only (done by API, 2026-11-23)

Done through the API on 2026-11-23 (change log row 19). Both van calendars use the availability schedule "Flos Hydration Van (Mon Wed Fri, 1st and 3rd Sat)": Monday, Wednesday and Friday 9 to 12 and 5 to 8 Pacific, plus each 1st and 3rd Saturday through Dec 18, 2027. No other Saturdays are open.

Nothing to do in the UI. If Kaitlyn changes the van hours or takes a day off, ask Claude to update that schedule (or edit it under Kaitlyn's availability in GHL). Before December 2027, add the 2028 Saturdays.
