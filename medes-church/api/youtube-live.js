// Vercel serverless function — checks whether the MEDES Church YouTube channel
// is currently live. Runs server-side so there's no CORS issue and no
// dependency on third-party CORS-proxy services (which is what broke this
// before: api.codetabs.com became unreachable).

const LIVE_PAGE_URL = "https://www.youtube.com/@medeschurch/live";

// Extracts the raw "videoDetails":{...} object from the page as a string,
// using brace counting rather than a fixed-size window or regex proximity —
// both proved unreliable because the fields inside videoDetails vary in
// order and length between broadcasts. Scoping strictly to this object also
// avoids false positives from "isLive":true appearing elsewhere on the page
// (e.g. other currently-live channels shown in sidebar recommendations).
function extractVideoDetailsObject(html) {
  const marker = '"videoDetails":';
  const idx = html.indexOf(marker);
  if (idx === -1) return null;

  const braceStart = idx + marker.length;
  if (html[braceStart] !== "{") return null;

  let depth = 0;
  for (let i = braceStart; i < html.length; i++) {
    if (html[i] === "{") depth++;
    else if (html[i] === "}") {
      depth--;
      if (depth === 0) return html.slice(braceStart, i + 1);
    }
  }
  return null;
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
    const videoDetails = extractVideoDetailsObject(html);

    // videoDetails.isLive is only true while actively broadcasting — it's
    // absent (or false) for an upcoming/waiting-room stream that hasn't
    // started yet, which is what "isUpcoming":true elsewhere on the page
    // indicates.
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
