# T-002 Inquiry alert workflow
Owner: Kash builds in the GHL UI, dev verifies via API | Priority: High | SOW 2.1 "A separate inquiry path ... with its own pipeline and tags" and "pipelines and automations"
Status: Ready

## Why
The business inquiry form is live on staging but nothing happens after a submission. Nobody is alerted.

## Spec (Kash builds, see docs/ghl-build-guide.md Task 3)
New workflow "Flos Hydration - Business Inquiry Alert":
1. Trigger: Form Submitted, form = "Flos Hydration - Business & Event Inquiry".
2. Add tag flos-hydration-business-inquiry.
3. Create/update opportunity in "Flos Hydration - Business & Mobile" (YRpliMJjYQjxyGPCh0cm), stage "New inquiry", status open.
4. Internal notification to Kaitlyn (email, plus SMS once A2P is approved): name, organization, phone, email, event type, location, date, guest count, link to the contact. Do NOT include the free-text notes field (could contain health details).
5. Optional: short email to the customer, "We got your inquiry", no answers repeated, no images.
Save as draft until tested.

## Dev steps
1. Check docs/ghl-build-guide.md Task 3 matches the spec above; update it if not.
2. After Kash builds it, verify via read-only API that the workflow exists with the right trigger, and log it in docs/ghl-change-log.md.

## Done when
Built, verified, logged. Test happens in T-003.
