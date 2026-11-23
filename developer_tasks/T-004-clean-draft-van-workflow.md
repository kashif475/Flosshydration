# T-004 Clean the draft van booking workflow before publishing
Owner: Dev investigates (read-only), Kash fixes in the UI | Priority: High | SOW 2.1 "Booking confirmations and reminders by email and SMS"
Status: Ready

## Context
Draft "Flos Hydration Van - Confirmation, Reminders, Intake" (copy of Flos's live workflow, which stays unchanged). Version 6 not verified. Divya appears enrolled; there is also a Claude test enrollment.

## Dev steps
1. Read-only: list current enrollments on the draft and explain why Divya is enrolled (which trigger or test caused it).
2. Write the exact UI steps for Kash to remove all test enrollments without messaging anyone.
3. Check the draft's steps: confirmation, reminders 24 hours and 2 hours before, email and SMS, intake link placeholder, tags flos-hydration-van-booked / flos-hydration-nad-booked, opportunity in "Flos Hydration - Van Appointments" (8ymDZ87Ga5lLbQYJPlHI). List any differences.
4. Confirm the original Flos workflow (fb779af2-b1a1-47bc-874c-79821508f2dd) is untouched.

## Done when
Enrollments cleared, differences fixed, ready to test and approve on the group call with Kaitlyn and Divya. Do NOT publish.
