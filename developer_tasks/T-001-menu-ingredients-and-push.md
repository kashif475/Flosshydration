# T-001 Menu ingredients and push the menu/schedule changes
Owner: Dev, then Kash approves the push | Priority: High | SOW 2.1 "Full service menu with names, descriptions and prices as approved by Flos"
Status: In review (built 2026-11-23; screenshots in qa/screenshots-2026-11-23; waiting for Kash to say "commit and push")

## Context
The menu and schedule copy are already updated locally (not on staging). Staging still shows NAD+ at $700.

## Steps
1. Read docs/menu-2026-11-20.md (Kaitlyn's sheet, her exact wording).
2. Add a collapsed "What's inside" toggle to each drip card listing the ingredients word for word. Write no new clinical or benefit claims. Make the toggle easy to switch off with one flag in config, in case Kaitlyn prefers names and prices only.
3. NAD+ infusion: keep $520 and the current description. Mark the dose as "to confirm with Kaitlyn" in docs/action-items.md.
4. Confirm the old "should be reconfirmed" note is gone.
5. pnpm check, pnpm build, screenshots at 1440px and 390px.

## Done when
Kash has reviewed the screenshots and says "commit and push". Then commit, push, and confirm staging shows NAD+ at $520.
