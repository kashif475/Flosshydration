// GoHighLevel IDs used on the website. Full list and history:
// docs/gohighlevel.md and docs/ghl-change-log.md.

// Van booking calendars (hours are set in GHL: Mon, Wed, Fri, Sat 9 to 12 and 5 to 8 Pacific).
export const VAN_CALENDARS = [
  { id: "YHa3D8M3GIKLIM4FnyUt", key: "iv_60", label: "IV hydration", length: "60 min", title: "Flos Hydration 60-minute IV appointment calendar" },
  { id: "9W3cXCWGFjacEM6pWEeW", key: "nad_120", label: "NAD+ infusion", length: "2 hours", title: "Flos Hydration 2-hour NAD+ appointment calendar" },
] as const;

export const FORM_IDS = {
  // PLACEHOLDER: this is the old July "IV Hydration Event Form". Replace with the ID of
  // the new "Flos Hydration - Business & Event Inquiry" form once it exists in GHL
  // (spec in docs/next-ghl-changes.md).
  businessInquiry: { id: "MV1gvxvQLIRKYui1fh7t", name: "IV Hydration Event Form" },
} as const;
