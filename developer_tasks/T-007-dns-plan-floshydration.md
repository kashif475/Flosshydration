# T-007 DNS plan for floshydration.com (prepare only)
Owner: Dev | Priority: High | SOW 2.1 "Domain or subdomain setup, DNS and SSL" and SOW 4.2 (DNS changes need Flos's written approval of the plan)
Status: Ready

## Steps
1. GoDaddy (delegate access, kashif@floshealth.com), READ ONLY: list every record on floshydration.com (A, CNAME, MX, TXT, NS). Save to docs/dns-backup-floshydration-2026-11-23.md.
2. Netlify: add floshydration.com and www.floshydration.com to project soft-cassata-578454. Copy the exact records Netlify asks for.
3. Write docs/domain-plan.md: records to add or change, anything that must stay (MX, TXT for email), SSL step, SITE_URL=https://floshydration.com in Netlify env vars (canonical, sitemap, robots.txt), GHL inquiry form Privacy and Terms links to update, rollback.
4. Make NO DNS changes. Kash sends the plan to Kaitlyn for written OK.

## Done when
Plan written and reviewed by Kash.
