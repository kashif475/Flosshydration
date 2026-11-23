# T-003 Inquiry form: Organization required, end-to-end test
Owner: Kash, dev verifies | Priority: High
Status: Ready (after T-002 is built)

## Steps (Kash, GHL UI)
1. Form "Flos Hydration - Business & Event Inquiry": set First name, Last name and Organization to Required.
2. Publish the T-002 workflow temporarily.
3. Submit the form once on staging as "test kashif business", notes "TEST" (the anti-bot check needs a person).
4. Set the workflow back to draft.

## Dev steps (read-only API)
Confirm for the test contact: tag present, opportunity in "New inquiry", workflow run recorded. Report results. Do not delete anything; Kash deletes the test opportunity.

## Done when
All four checks pass: tag, pipeline entry, alert received, customer email (if built) with no answers repeated.
