# Visitor globe (UmamiMaps) — setup notes

The rotating visitor globe at the bottom of the About page. It replaced
ClustrMaps in July 2026. Written down here so we remember how it works.

## Architecture

```
Browser widget (umami-maps script on the About page)
   │  fetch
   ▼
Cloudflare Worker  https://visitor-globe.annabellamiao.workers.dev/api/visitor-globe
   │  logs in with Umami credentials (secrets), caches 30 min
   ▼
Self-hosted Umami  https://umamimyweb.vercel.app  (website ID 013d0d65-5b0d-4f50-9dcb-678cac201622)
   ▲
   │  tracking script in <head> records visitors (only on annabellam.github.io)
   └── every page of the site
```

## Where each piece lives

| Piece | Location |
| --- | --- |
| Tracking script | `_includes/head.liquid` (renders when `umami.website_id` is set) |
| Umami config (script URL + website ID) | `_config.yml` → `umami:` |
| Globe widget embed | `_layouts/about.liquid` (renders when `visitor_globe_endpoint` is set) |
| Globe endpoint URL | `_config.yml` → `visitor_globe_endpoint` |
| Worker code | `_scripts/visitor-globe-worker/worker.js` |
| Worker config (vars, name) | `_scripts/visitor-globe-worker/wrangler.toml` |
| Umami credentials | Cloudflare dashboard → Workers & Pages → visitor-globe → Settings → Variables and Secrets (`UMAMI_USERNAME`, `UMAMI_PASSWORD`) |

## Accounts involved

- **Umami**: self-hosted on Vercel (project `umamimyweb`, account annabella-miao).
  Dashboard: https://umamimyweb.vercel.app — log in to see visitor stats.
- **Cloudflare**: worker `visitor-globe` on the `annabellamiao.workers.dev` subdomain.

## One-time setup that was done (July 2026)

1. Deployed Umami on Vercel, created website entry for `annabellam.github.io` → got website ID.
2. Added tracking script hook + config to the Jekyll site (see table above).
3. `npx wrangler login` (Cloudflare OAuth in browser).
4. Registered the `annabellamiao` workers.dev subdomain (dashboard prompt on first deploy).
5. Added `UMAMI_USERNAME` / `UMAMI_PASSWORD` as worker secrets **via the dashboard**
   (the `wrangler secret put` prompt doesn't work in non-interactive shells).
6. `npx wrangler deploy` from this directory.
7. Set `visitor_globe_endpoint` in `_config.yml`.

## How to redeploy the worker (after editing worker.js / wrangler.toml)

```bash
cd _scripts/visitor-globe-worker
npm install          # first time on a new machine
npx wrangler login   # first time on a new machine (browser OAuth)
npx wrangler deploy
```

Note: `wrangler` is pinned to v3 in package.json because the machine runs
Node 18; wrangler 4 needs Node ≥ 22. If Node gets upgraded, `npm install
--save-dev wrangler@4` is fine.

## Troubleshooting

- **Globe is empty / 0 visitors**: normal until real visitors hit the live
  site. Data starts from when Umami tracking went live (no ClustrMaps history).
  Local visits don't count (`data-domains="annabellam.github.io"`).
- **Globe doesn't load locally**: the worker only allows origins
  `https://annabellam.github.io` and `http://localhost:8080` (see
  `ALLOWED_ORIGINS` in worker.js). Add origins there and redeploy.
- **Test the endpoint directly**:
  `curl https://visitor-globe.annabellamiao.workers.dev/api/visitor-globe`
  → should return JSON like `{"markers":[...],"totalVisitors":N,...}`.
  An error here usually means the Umami credentials/secrets are wrong or the
  Vercel Umami instance is down.
- **Changed Umami password**: update the `UMAMI_PASSWORD` secret in the
  Cloudflare dashboard (no redeploy needed).
