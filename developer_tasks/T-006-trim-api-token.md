# T-006 Trim the GHL API token's permissions
Owner: Kash (GHL UI), dev lists scopes | Priority: High (BAA exposure)
Status: Ready

## Why
The current Private Integration token can read Flos Rx patient records and payments, which this project doesn't need.

## Dev steps
List the smallest scopes the repo and tickets actually use (calendars read, contacts read/write for verification, opportunities and pipelines read/write, tags, custom fields, forms read, workflows read). Write them in docs/gohighlevel.md.

## Kash steps
Create a new Private Integration with only those scopes, put it in .env (never in chat or code), confirm the dev's read-only checks still work, then delete the old token.
