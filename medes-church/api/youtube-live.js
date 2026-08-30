// Vercel serverless function — checks whether the MEDES Church YouTube channel
// is currently live. Runs server-side so there's no CORS issue and no
// dependency on third-party CORS-proxy services (which is what broke this
// originally: api.codetabs.com became unreachable).
//
// Two-step approach:
//   1. Fetch the /@handle/live page just to read the canonical <link> tag,
//      which names the current (live, upcoming, or most recent) video ID.
//      This is plain page head metadata, not the gated player payload.
//   2. Ask YouTube's own internal player endpoint (the same JSON API
//      youtube.com's web client calls) whether THAT video is live right
//      now. This is what actually determines isLive — the SSR page's own
//      embedded player JSON was dropped by YouTube for a chunk of
//      requests from datacenter IPs ("Sign in to confirm you're not a
//      bot" / playabilityStatus LOGIN_REQUIRED), but this JSON endpoint
//      has held up reliably in testing even when that happens, since it's
//      a different code path than the bot-walled watch-page render.
//      Uses YouTube's public, non-secret web client API key (the same one
//      shipped to every browser loading youtube.com).

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
    const videoId = (req.query && req.query.__testVideoId) || (await getCandidateVideoId());
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
