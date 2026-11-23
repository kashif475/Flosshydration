// GoHighLevel IDs used on the website. Full list and history:
// docs/gohighlevel.md and docs/ghl-change-log.md.

// Van booking calendars. Website copy: Monday, Wednesday and Friday, plus the 1st and 3rd
// Saturday of each month, 9 to 12 and 5 to 8 Pacific. Bookable hours are set in GHL itself.
export const VAN_CALENDARS = [
  { id: "YHa3D8M3GIKLIM4FnyUt", key: "iv_60", label: "IV hydration", length: "60 min", title: "Flos Hydration 60-minute IV appointment calendar" },
  { id: "9W3cXCWGFjacEM6pWEeW", key: "nad_120", label: "NAD+ infusion", length: "2 hours", title: "Flos Hydration 2-hour NAD+ appointment calendar" },
] as const;

export const FORM_IDS = {
  // Business, group and event inquiries. Contact details only, no health questions.
  businessInquiry: { id: "jfqKBPuYcoXjSDDQDull", name: "Flos Hydration - Business & Event Inquiry" },
} as const;
