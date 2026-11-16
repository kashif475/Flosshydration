# Flos Hydration Website Source

This is the **editable React + TypeScript + Vite** source for the standalone Flos Hydration website.

## Quick start

```bash
pnpm install
pnpm dev
```

Open the local address displayed in the terminal. Before release:

```bash
pnpm check
pnpm build
```

The production files appear in `dist/`.

## Important implementation notes

- The site is intentionally separate from the retired combined Flos Rx + Hydration site.
- Website images are self-contained in `client/public/assets/` and use relative paths, so the built site works from a domain root, subdomain, or ordinary staging folder.
- The individual booking calendar remains an external LeadConnector iframe. Its source URL is in `client/src/components/HydrationMenuCalendar.tsx`.
- The visible inquiry form is currently a **prototype**. It only displays an on-screen confirmation and does not send data to a CRM or email account. Connect it before launch.

## Key editing files

| File | Update here |
| --- | --- |
| `client/src/pages/HydrationHome.tsx` | Hero copy, locations, navigation, FAQs, mobile-business messaging, form fields, and photo caption |
| `client/src/components/HydrationMenuCalendar.tsx` | IV menu, prices, add-ons, booking calendar iframe URL |
| `client/src/hydration.css` | Hydration-specific cards, calendar, form, and responsive styling |
| `client/src/index.css` | Global colors, typography, navigation, and core layout |
| `client/public/assets/` | The hydration-care and hiking-couple images |
| `client/index.html` | Browser title, description, and theme color |

Do not edit files in `dist/` by hand; they are generated every time `pnpm build` runs.

## Deploying to Netlify

`netlify.toml` is included, so Netlify picks up the settings automatically:

- Build command: `pnpm install --frozen-lockfile && pnpm build`
- Publish directory: `dist`
- Node 22, pnpm 10.4.1

In Netlify: Add new site → Import from GitHub → pick this repo → Deploy. No extra settings needed.
