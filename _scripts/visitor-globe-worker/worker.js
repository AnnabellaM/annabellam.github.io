// Cloudflare Worker: proxies aggregated Umami country data for the
// UmamiMaps visitor globe on the about page. Keeps the Umami API key
// out of the browser and caches responses for 30 minutes.
//
// Deploy (from this directory):
//   npm install umami-maps
//   npx wrangler secret put UMAMI_USERNAME
//   npx wrangler secret put UMAMI_PASSWORD
//   npx wrangler deploy
//
// Then set `visitor_globe_endpoint` in _config.yml to
//   https://<worker-name>.<account>.workers.dev/api/visitor-globe

import { createUmamiMapsClient } from "umami-maps/server";

const ALLOWED_ORIGINS = new Set([
  "https://annabellam.github.io",
  "http://localhost:8080", // local Jekyll preview
]);

let client;

export default {
  async fetch(request, env) {
    client ??= createUmamiMapsClient({
      umamiUrl: env.UMAMI_API_URL, // self-hosted Umami instance
      websiteId: env.UMAMI_WEBSITE_ID,
      username: env.UMAMI_USERNAME,
      password: env.UMAMI_PASSWORD,
    });

    const origin = request.headers.get("origin");
    const data = await client.getGlobeData();
    return new Response(JSON.stringify(data), {
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": ALLOWED_ORIGINS.has(origin) ? origin : "https://annabellam.github.io",
        "cache-control": "public, max-age=1800",
      },
    });
  },
};
