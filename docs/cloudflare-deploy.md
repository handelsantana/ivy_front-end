# Cloudflare Deploy

## Build and deploy commands

Use these commands in Cloudflare Workers Builds:

- Build command: `npm run build`
- Deploy command: `npm run deploy`

`npm run build` runs:

1. `next build`
2. `opennextjs-cloudflare build --skipNextBuild`

This generates the Worker entrypoint and assets expected by `wrangler.jsonc`.

## Worker config

The Worker config is in `wrangler.jsonc` and points to:

- `main`: `.open-next/worker.js`
- `assets.directory`: `.open-next/assets`

## CMS publish storage on Cloudflare

`/api/publish` now supports Cloudflare KV via binding `CMS_DATA`.

- If `CMS_DATA` is present, data is persisted in KV.
- If `CMS_DATA` is not present in production Worker runtime, it falls back to in-memory storage (non-persistent).
- In local Node/dev runtime, it falls back to file storage (`data/ivy-cms.json`).

To persist publish data in Cloudflare, add a KV namespace binding named `CMS_DATA` in your Worker settings.
