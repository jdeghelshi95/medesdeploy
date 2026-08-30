// Vercel serverless function — checks whether the MEDES Church YouTube channel
// is currently live. Runs server-side so there's no CORS issue and no
// dependency on third-party CORS-proxy services (which is what broke this
// originally: api.codetabs.com became unreachable).
//
// NOTE: YouTube intermittently bot-walls this from Vercel's server IP range
// ("Sign in to confirm you're not a bot" / playabilityStatus LOGIN_REQUIRED).
// This affects both the SSR /live page and YouTube's internal player JSON
// endpoint equally, so there is currently no scraping technique that avoids
// it reliably. When blocked, this silently degrades to isLive:false rather
// than erroring. See project notes for the tradeoffs of moving to the
// official (quota-limited) YouTube Data API instead.

const LIVE_PAGE_URL = "https://www.youtube.com/@medeschurch/live";
const INNERTUBE_KEY = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";
const INNERTUBE_PLAYER_URL = `https://www.youtube.com/youtubei/v1/player?key=${INNERTUBE_KEY}`;

async function getCandidateVideoId() {
  const res = await fetch(LIVE_PAGE_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
    },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) return null;

  const html = await res.text();
  const canonicalMatch = html.match(
    /<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"/
  );
  return canonicalMatch ? canonicalMatch[1] : null;
}

async function getVideoLiveStatus(videoId) {
  const res = await fetch(INNERTUBE_PLAYER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      context: {
        client: {
          clientName: "WEB",
          clientVersion: "2.20240101.00.00",
          hl: "en",
          gl: "US",
        },
      },
      videoId,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=30");

  try {
    const videoId = await getCandidateVideoId();
    if (!videoId) {
      res.status(200).json({ isLive: false });
      return;
    }

    const data = await getVideoLiveStatus(videoId);
    const details = data?.videoDetails;

    if (!details || details.isLive !== true) {
      res.status(200).json({ isLive: false });
      return;
    }

    res.status(200).json({
      isLive: true,
      videoId,
      title: details.title || "MEDES Church — En Vivo",
    });
  } catch {
    res.status(200).json({ isLive: false });
  }
}
