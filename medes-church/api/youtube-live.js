// Vercel serverless function — checks whether the MEDES Church YouTube channel
// is currently live. Runs server-side so there's no CORS issue and no
// dependency on third-party CORS-proxy services (which is what broke this
// before: api.codetabs.com became unreachable).

const LIVE_PAGE_URL = "https://www.youtube.com/@medeschurch/live";

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
    if (!html.includes('"isLive":true')) {
      res.status(200).json({ isLive: false });
      return;
    }

    const videoIdMatch = html.match(
      /"videoId":"([a-zA-Z0-9_-]{11})"[^}]{0,300}"isLive":true/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    const titleMatch = html.match(
      /"videoDetails":\{"videoId":"[^"]+","title":"([^"]+)"/
    );
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
