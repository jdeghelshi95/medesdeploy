/*
 * LiveStreamBanner — Urban Revival Design
 * Detects if MEDES Church (@medeschurch) is currently live on YouTube.
 * Shows a pulsing banner only when live; completely hidden otherwise.
 *
 * Detection strategy:
 *   1. Fetch https://www.youtube.com/@medeschurch/live via api.codetabs.com CORS proxy
 *   2. Parse "isLive":true from the embedded page JSON to confirm live status
 *   3. Extract videoId and title from videoDetails in the same page JSON
 *   4. Build thumbnail URL directly: https://i.ytimg.com/vi/{videoId}/hqdefault.jpg
 *
 * Why the old approach failed:
 *   - YouTube's oEmbed endpoint returns 404 for /@handle/live URLs even when the
 *     channel IS live. It only works with direct watch?v= video URLs.
 *   - allorigins.win was returning HTTP 500 errors intermittently.
 *
 * Polls every 3 minutes.
 */

import { useState, useEffect } from "react";
import { Radio, ExternalLink, X } from "lucide-react";

const DEMO_MODE = false;

const CHANNEL_HANDLE = "medeschurch";
const LIVE_PAGE_URL = `https://www.youtube.com/@${CHANNEL_HANDLE}/live`;
const CORS_PROXY = "https://api.codetabs.com/v1/proxy?quest=";

interface LiveData {
  title: string;
  thumbnail_url: string;
  author_name: string;
  watch_url: string;
}

export default function LiveStreamBanner() {
  const [isLive, setIsLive] = useState(false);
  const [liveData, setLiveData] = useState<LiveData | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkLive = async () => {
      if (DEMO_MODE) {
        setLiveData({
          title: "🔴 Demo: Servicio en Vivo",
          thumbnail_url: "",
          author_name: "MEDES CHURCH",
          watch_url: LIVE_PAGE_URL,
        });
        setIsLive(true);
        return;
      }

      try {
        const proxyUrl = `${CORS_PROXY}${encodeURIComponent(LIVE_PAGE_URL)}`;
        const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(15000) });

        if (!res.ok) {
          setIsLive(false);
          return;
        }

        const html = await res.text();

        // Check for live flag in the embedded YouTube page JSON
        const isLiveNow = html.includes('"isLive":true');

        if (!isLiveNow) {
          setIsLive(false);
          return;
        }

        // Extract the video ID that is adjacent to "isLive":true
        const videoIdMatch = html.match(
          /"videoId":"([a-zA-Z0-9_-]{11})"[^}]{0,300}"isLive":true/
        );
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        // Extract the stream title from videoDetails
        const titleMatch = html.match(
          /"videoDetails":\{"videoId":"[^"]+","title":"([^"]+)"/
        );
        const title = titleMatch
          ? titleMatch[1]
          : "MEDES Church está en vivo ahora";

        setLiveData({
          title,
          thumbnail_url: videoId
            ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
            : "",
          author_name: "MEDES CHURCH",
          watch_url: videoId
            ? `https://www.youtube.com/watch?v=${videoId}`
            : LIVE_PAGE_URL,
        });
        setIsLive(true);
      } catch {
        setIsLive(false);
      }
    };

    checkLive();
    const interval = setInterval(checkLive, 3 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (dismissed || !isLive) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
      style={{ animation: "slideUpBanner 0.5s ease-out" }}
    >
      <style>{`
        @keyframes slideUpBanner {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
      <div className="relative bg-[#111] border border-red-500/50 rounded-2xl shadow-2xl shadow-red-900/40 overflow-hidden">
        {/* Animated glow border */}
        <div className="absolute inset-0 rounded-2xl border border-red-500/20 animate-pulse pointer-events-none" />

        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
          {/* Thumbnail */}
          {liveData?.thumbnail_url && (
            <div className="flex-shrink-0 w-16 h-10 sm:w-20 sm:h-12 rounded-lg overflow-hidden bg-[#1A1A1A]">
              <img
                src={liveData.thumbnail_url}
                alt="Live stream thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Live badge */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                <div className="absolute inset-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping opacity-75" />
              </div>
              <span className="font-['Oswald'] font-700 text-red-500 text-xs uppercase tracking-widest">
                En Vivo
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-10 bg-white/10 flex-shrink-0 hidden sm:block" />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="font-['Nunito_Sans'] font-700 text-white text-sm leading-tight truncate">
              {liveData?.title || "MEDES Church está en vivo ahora"}
            </p>
            <p className="font-['Nunito_Sans'] text-white/40 text-xs mt-0.5 truncate">
              {liveData?.author_name || "MEDES CHURCH"} · Únete ahora
            </p>
          </div>

          {/* CTA */}
          <a
            href={liveData?.watch_url ?? LIVE_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-['Nunito_Sans'] font-700 text-xs sm:text-sm transition-colors shadow-lg shadow-red-900/40 whitespace-nowrap"
          >
            <Radio className="w-3.5 h-3.5" />
            Ver Ahora
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            className="flex-shrink-0 p-1.5 text-white/30 hover:text-white/60 transition-colors rounded"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom flame bar */}
        <div className="h-0.5 bg-gradient-to-r from-red-600 via-red-400 to-red-600 animate-pulse" />
      </div>
    </div>
  );
}
