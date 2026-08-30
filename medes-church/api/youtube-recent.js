// Vercel serverless function — returns the 5 most recent videos from the
// MEDES Church YouTube channel by fetching and parsing the channel's public
// RSS feed server-side. Replaces the client-side fetch through
// api.allorigins.win, which is unreliable.

const CHANNEL_ID = "UCbKclBCuOtMyYl7W853ZcuA";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

function timeAgo(published) {
  const date = new Date(published);
  const diffDays = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return "Hoy";
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
  if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
  return `Hace ${Math.floor(diffDays / 365)} años`;
}

function decodeXmlEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=300");

  try {
    const upstream = await fetch(RSS_URL, { signal: AbortSignal.timeout(10000) });
    if (!upstream.ok) {
      res.status(200).json({ videos: [] });
      return;
    }

    const xml = await upstream.text();
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];

    const videos = entries.slice(0, 5).map((entry) => {
      const videoId = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] || "";
      const title = decodeXmlEntities(entry.match(/<title>(.*?)<\/title>/)?.[1] || "");
      const published = entry.match(/<published>(.*?)<\/published>/)?.[1] || "";
      const link =
        entry.match(/<link rel="alternate" href="(.*?)"/)?.[1] ||
        `https://www.youtube.com/watch?v=${videoId}`;

      return {
        id: videoId,
        title,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        published: published ? timeAgo(published) : "",
        link,
      };
    });

    res.status(200).json({ videos });
  } catch {
    res.status(200).json({ videos: [] });
  }
}
