# T-013 Stripe setup
Owner: Kash with Kaitlyn on a call, dev assists | Priority: Medium | SOW 2.1 "Stripe payments: pay at booking, memberships and recurring payments ... including failed-payment follow-up"
Status: Blocked: call with Kaitlyn

## Read first
claude.ai project doc claude/flos-stripe-plan.md (summary below).

## Plan
1. Kaitlyn confirms Stripe's business-details screen (Flos's legal entity) and GHL connects to the EXISTING Flos Stripe account. Never onboard a new account.
2. Decision: flat deposit at booking (recommended, one price per calendar), full price (needs a calendar per drip), or pay at visit.
3. Products in GHL (Payments > Products): drips, bag upgrade, boosters. Test mode first.
4. Calendar: Forms & Payments > Accept Payments on both van calendars per the decision.
5. Memberships: recurring product + setup fee (enrollment), sold by payment link; website gets "Join" buttons. Needs Kaitlyn's terms.
6. Failed payments: GHL subscription retry settings + Subscription trigger workflow alerting Kaitlyn.
7. Refunds: built in (Payments > Transactions). Recurring charges refunded in Stripe.
Fallback agreed with Divya (to confirm): launch booking-only if Stripe isn't ready by Dec 11.
