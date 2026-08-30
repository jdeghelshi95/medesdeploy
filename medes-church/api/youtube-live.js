// Vercel serverless function — checks whether the MEDES Church YouTube channel
// is currently live. Runs server-side so there's no CORS issue and no
// dependency on third-party CORS-proxy services (which is what broke this
// before: api.codetabs.com became unreachable).
//
// NOTE: YouTube intermittently bot-walls this scrape from Vercel's server
// IP range ("Sign in to confirm you're not a bot" / playabilityStatus
// LOGIN_REQUIRED), which silently degrades this to a false "not live". This
// is a known limitation of scraping from a datacenter IP, not a parsing
// bug — see the project's YOUTUBE_LIVE_NOTES for the plan to move to the
// official YouTube Data API.

const LIVE_PAGE_URL = "https://www.youtube.com/@medeschurch/live";

// The page contains two different "videoDetails": keys:
//   1. ytInitialPlayerResponse.videoDetails — the real one, shaped like
//      {"videoId":"...","title":"...", ..., "isLive":true, ...}
//   2. a UI overlay structure nested under ytInitialData
//      (playerOverlays...videoDetails.playerOverlayVideoDetailsRenderer),
//      shaped like {"playerOverlayVideoDetailsRenderer":{"title":{"simpleText":
//      "..."},...}} — no "videoId" key at all.
// Which one appears first in the HTML isn't consistent, so scan every
// "videoDetails":{...} occurrence (brace-matched, not a fixed window) and
// use the first one whose object actually starts with a raw "videoId" key.
function extractPlayerVideoDetails(html) {
  const marker = '"videoDetails":';
  let searchFrom = 0;

  while (true) {
    const idx = html.indexOf(marker, searchFrom);
    if (idx === -1) return null;

    const braceStart = idx + marker.length;
    if (html[braceStart] !== "{") {
      searchFrom = idx + marker.length;
      continue;
    }

    let depth = 0;
    let end = -1;
    for (let i = braceStart; i < html.length; i++) {
      if (html[i] === "{") depth++;
      else if (html[i] === "}") {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    if (end === -1) return null;

    const candidate = html.slice(braceStart, end + 1);
    if (/^\{"videoId":"[a-zA-Z0-9_-]{11}"/.test(candidate)) {
      return candidate;
    }
    searchFrom = end + 1;
  }
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=30");

  try {
    const upstream = await fetch(LIVE_PAGE_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!upstream.ok) {
      res.status(200).json({ isLive: false });
      return;
    }

    const html = await upstream.text();
    const videoDetails = extractPlayerVideoDetails(html);

    if (!videoDetails || !videoDetails.includes('"isLive":true')) {
      res.status(200).json({ isLive: false });
      return;
    }

    const videoIdMatch = videoDetails.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
    const titleMatch = videoDetails.match(/"title":"([^"]+)"/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    const title = titleMatch ? titleMatch[1] : "MEDES Church — En Vivo";

    if (!videoId) {
      res.status(200).json({ isLive: false });
      return;
    }

    res.status(200).json({ isLive: true, videoId, title });
  } catch {
    res.status(200).json({ isLive: false });
  }
}
