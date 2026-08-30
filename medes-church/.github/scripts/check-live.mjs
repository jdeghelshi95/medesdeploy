import { writeFileSync } from "node:fs";

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
  });
  const html = await res.text();
  const canonical = html.match(
    /<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"/
  );
  return { ok: res.ok, videoId: canonical ? canonical[1] : null, htmlLength: html.length };
}

async function checkVideo(videoId) {
  const res = await fetch(INNERTUBE_PLAYER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      context: { client: { clientName: "WEB", clientVersion: "2.20240101.00.00", hl: "en", gl: "US" } },
      videoId,
    }),
  });
  const json = await res.json();
  return { ok: res.ok, playabilityStatus: json.playabilityStatus?.status, isLive: json.videoDetails?.isLive ?? false, title: json.videoDetails?.title ?? null };
}

// Also test against a known always-live stream (NASA ISS) as an independent
// control, so we can tell "MEDES isn't live right now" apart from "this
// runner is blocked too".
async function findNasaLive() {
  const res = await fetch("https://www.youtube.com/@NASA/live", {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36" },
  });
  const html = await res.text();
  const canonical = html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"/);
  return canonical ? canonical[1] : null;
}

const result = { timestamp: new Date().toISOString() };

const candidate = await getCandidateVideoId();
result.medesCandidate = candidate;
if (candidate.videoId) {
  result.medesCheck = await checkVideo(candidate.videoId);
}

const nasaId = await findNasaLive();
result.nasaVideoId = nasaId;
if (nasaId) {
  result.nasaCheck = await checkVideo(nasaId);
}

writeFileSync("test-result.json", JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
