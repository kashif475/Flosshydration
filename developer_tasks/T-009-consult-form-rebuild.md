# T-009 Consult form rebuild in GHL
Owner: Dev specs, Kash builds | Priority: Medium | SOW 2.2 "Rebuild the consult form in GoHighLevel" (SOW timeline: weeks 2 to 3, so early December; Gravity Forms renews Feb 7)
Status: Blocked: needs the Gravity Forms export

## Kash first
WordPress admin > Forms > Import/Export > Export Forms, tick the consult form, download the .json. Screenshot its Confirmations, Notifications and any add-on feeds. Note the entry count and latest entry date (counts only, never export entries).

## Dev steps
1. Field-by-field spec from the export: label, type, GHL type, required, choices, conditional logic, standard vs custom field.
2. Flag fields collecting health information (allowed under the HIPAA add-on, but list them for Kaitlyn and Dr. Khan).
3. Click-by-click GHL form builder checklist for Kash (API can't create forms).
4. Spec the replacement for the Gravity Forms notifications: alert without health details, no email repeating answers.
5. Same rules as the inquiry form: no "[BUSINESS NAME]", optional SMS consent, privacy and terms links.

## Scope note
SOW only says rebuild it in GHL. Placing the embed on the WordPress page: hand Flos the embed code; WordPress work is out of scope unless Divya agrees.
