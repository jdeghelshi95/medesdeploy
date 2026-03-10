/*
 * VideosAndBible — Urban Revival Design
 * YouTube video player (55%) + RVR1960 Bible reader (45%) side-by-side
 * Tabs: "Más Recientes" (5 latest) | "Pastor David" (5 top)
 * Bible: Spanish book names mapped over English dataset
 */

import { useState, useEffect, useRef } from "react";
import {
  Play, ChevronLeft, ChevronRight, BookOpen, Search,
  ExternalLink, Youtube, ChevronDown, User, Clock
} from "lucide-react";

const CHANNEL_ID = "UCbKclBCuOtMyYl7W853ZcuA";
const CHANNEL_URL = "https://www.youtube.com/@medeschurch";
const BIBLE_API = "https://raw.githubusercontent.com/thiagobodruk/bible/master/json/es_rvr.json";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  published: string;
  link: string;
}

interface BibleBook {
  abbrev: string;
  name: string;
  spanishName: string;
  chapters: string[][];
}

// Spanish book name mapping (the JSON has English names but Spanish verse text)
const SPANISH_BOOK_NAMES: Record<string, string> = {
  "Genesis": "Génesis", "Exodus": "Éxodo", "Leviticus": "Levítico",
  "Numbers": "Números", "Deuteronomy": "Deuteronomio", "Joshua": "Josué",
  "Judges": "Jueces", "Ruth": "Rut", "1 Samuel": "1 Samuel",
  "2 Samuel": "2 Samuel", "1 Kings": "1 Reyes", "2 Kings": "2 Reyes",
  "1 Chronicles": "1 Crónicas", "2 Chronicles": "2 Crónicas", "Ezra": "Esdras",
  "Nehemiah": "Nehemías", "Esther": "Ester", "Job": "Job",
  "Psalms": "Salmos", "Proverbs": "Proverbios", "Ecclesiastes": "Eclesiastés",
  "Song of Solomon": "Cantares", "Isaiah": "Isaías", "Jeremiah": "Jeremías",
  "Lamentations": "Lamentaciones", "Ezekiel": "Ezequiel", "Daniel": "Daniel",
  "Hosea": "Oseas", "Joel": "Joel", "Amos": "Amós",
  "Obadiah": "Abdías", "Jonah": "Jonás", "Micah": "Miqueas",
  "Nahum": "Nahúm", "Habakkuk": "Habacuc", "Zephaniah": "Sofonías",
  "Haggai": "Hageo", "Zechariah": "Zacarías", "Malachi": "Malaquías",
  "Matthew": "Mateo", "Mark": "Marcos", "Luke": "Lucas",
  "John": "Juan", "Acts": "Hechos", "Romans": "Romanos",
  "1 Corinthians": "1 Corintios", "2 Corinthians": "2 Corintios",
  "Galatians": "Gálatas", "Ephesians": "Efesios", "Philippians": "Filipenses",
  "Colossians": "Colosenses", "1 Thessalonians": "1 Tesalonicenses",
  "2 Thessalonians": "2 Tesalonicenses", "1 Timothy": "1 Timoteo",
  "2 Timothy": "2 Timoteo", "Titus": "Tito", "Philemon": "Filemón",
  "Hebrews": "Hebreos", "James": "Santiago", "1 Peter": "1 Pedro",
  "2 Peter": "2 Pedro", "1 John": "1 Juan", "2 John": "2 Juan",
  "3 John": "3 Juan", "Jude": "Judas", "Revelation": "Apocalipsis",
};

// 5 most recent videos from MEDES Church (fallback)
const RECENT_VIDEOS: Video[] = [
  { id: "atlMWeepWus", title: "Principios Biblicos Para Salir De La Deuda | David Eghelshi", thumbnail: "https://i.ytimg.com/vi/atlMWeepWus/hqdefault.jpg", published: "Sep 2025", link: "https://www.youtube.com/watch?v=atlMWeepWus" },
  { id: "1ahxA_8Dwww", title: "Se cumplirá en tí | Profeta Ronny Oliveira", thumbnail: "https://i.ytimg.com/vi/1ahxA_8Dwww/hqdefault.jpg", published: "Hace 1 mes", link: "https://www.youtube.com/watch?v=1ahxA_8Dwww" },
  { id: "LrxAvPKaK3E", title: "Noche de Adoracion - Coalo Zamorano", thumbnail: "https://i.ytimg.com/vi/LrxAvPKaK3E/hqdefault.jpg", published: "Hace 2 meses", link: "https://www.youtube.com/watch?v=LrxAvPKaK3E" },
  { id: "Fb338Rpmtfk", title: "Fe Inquebrantable | Pastor David Eghelshi", thumbnail: "https://i.ytimg.com/vi/Fb338Rpmtfk/hqdefault.jpg", published: "Hace 3 meses", link: "https://www.youtube.com/watch?v=Fb338Rpmtfk" },
  { id: "GfhCErhzXb4", title: "El Siempre Estuvo Alli | Profeta Ronny Oliveira", thumbnail: "https://i.ytimg.com/vi/GfhCErhzXb4/hqdefault.jpg", published: "Hace 4 meses", link: "https://www.youtube.com/watch?v=GfhCErhzXb4" },
];

// 5 most recent livestream recordings
const LIVESTREAM_VIDEOS: Video[] = [
  { id: "pZDKbml8CCo", title: "Servicio de Oración 3/09/26", thumbnail: "https://i.ytimg.com/vi/pZDKbml8CCo/hqdefault.jpg", published: "En Vivo", link: "https://www.youtube.com/watch?v=pZDKbml8CCo" },
  { id: "9DWE_KkQzxA", title: "Servicio Familiar 2PM", thumbnail: "https://i.ytimg.com/vi/9DWE_KkQzxA/hqdefault.jpg", published: "En Vivo", link: "https://www.youtube.com/watch?v=9DWE_KkQzxA" },
  { id: "xRWFIQQf93I", title: "Servicio Familiar 11AM", thumbnail: "https://i.ytimg.com/vi/xRWFIQQf93I/hqdefault.jpg", published: "En Vivo", link: "https://www.youtube.com/watch?v=xRWFIQQf93I" },
  { id: "yiQRSQW3XMY", title: "Servicio Familiar 8:30AM", thumbnail: "https://i.ytimg.com/vi/yiQRSQW3XMY/hqdefault.jpg", published: "En Vivo", link: "https://www.youtube.com/watch?v=yiQRSQW3XMY" },
  { id: "XxjYbFTu0Ek", title: "Servicio General 7:00PM", thumbnail: "https://i.ytimg.com/vi/XxjYbFTu0Ek/hqdefault.jpg", published: "En Vivo", link: "https://www.youtube.com/watch?v=XxjYbFTu0Ek" },
];

// Pastor David's 5 most popular sermons
const PASTOR_DAVID_VIDEOS: Video[] = [
  { id: "I9qLO60CZzc", title: "Dios Quiere Lo Primero | Pastor David Eghelshi", thumbnail: "https://i.ytimg.com/vi/I9qLO60CZzc/hqdefault.jpg", published: "Popular", link: "https://www.youtube.com/watch?v=I9qLO60CZzc" },
  { id: "AiiGZzUk-RY", title: "La Oración Funciona | Pastor David Eghelshi", thumbnail: "https://i.ytimg.com/vi/AiiGZzUk-RY/hqdefault.jpg", published: "Popular", link: "https://www.youtube.com/watch?v=AiiGZzUk-RY" },
  { id: "aVzJWq43rSQ", title: "El Poder de las Primicias | Pastor David Eghelshi", thumbnail: "https://i.ytimg.com/vi/aVzJWq43rSQ/hqdefault.jpg", published: "Popular", link: "https://www.youtube.com/watch?v=aVzJWq43rSQ" },
  { id: "OyuLFBGBLhs", title: "Dios Desea Bendecirte | Pastor David Eghelshi", thumbnail: "https://i.ytimg.com/vi/OyuLFBGBLhs/hqdefault.jpg", published: "Popular", link: "https://www.youtube.com/watch?v=OyuLFBGBLhs" },
  { id: "2geOJx-1ndY", title: "Renovando Nuestro Servicio | Pastor David Eghelshi", thumbnail: "https://i.ytimg.com/vi/2geOJx-1ndY/hqdefault.jpg", published: "Popular", link: "https://www.youtube.com/watch?v=2geOJx-1ndY" },
];

type VideoTab = "recent" | "livestream" | "pastor";

export default function VideosAndBible() {
  const [activeTab, setActiveTab] = useState<VideoTab>("recent");
  const [recentVideos, setRecentVideos] = useState<Video[]>(RECENT_VIDEOS);
  const [selectedVideo, setSelectedVideo] = useState<Video>(RECENT_VIDEOS[0]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  // Bible state
  const [bibleData, setBibleData] = useState<BibleBook[]>([]);
  const [loadingBible, setBibleLoading] = useState(true);
  const [selectedBookIdx, setSelectedBookIdx] = useState(42); // Juan = index 42
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [selectedVerse, setSelectedVerse] = useState(0); // 0 = show all
  const [bookSearch, setBookSearch] = useState("");
  const [showBookDropdown, setShowBookDropdown] = useState(false);
  const verseListRef = useRef<HTMLDivElement>(null);
  const verseRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const currentTabVideos =
    activeTab === "recent" ? recentVideos
    : activeTab === "livestream" ? LIVESTREAM_VIDEOS
    : PASTOR_DAVID_VIDEOS;

  // Fetch latest YouTube videos via RSS
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
        const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
        const data = await res.json();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "text/xml");
        const entries = xml.querySelectorAll("entry");
        const parsed: Video[] = Array.from(entries)
          .slice(0, 5)
          .map((entry) => {
            const videoId = entry.querySelector("videoId")?.textContent || "";
            const title = entry.querySelector("title")?.textContent || "";
            const published = entry.querySelector("published")?.textContent || "";
            const link = entry.querySelector("link")?.getAttribute("href") || "";
            const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            const date = new Date(published);
            const now = new Date();
            const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
            const timeAgo =
              diffDays < 1 ? "Hoy"
              : diffDays < 7 ? `Hace ${diffDays} días`
              : diffDays < 30 ? `Hace ${Math.floor(diffDays / 7)} semanas`
              : diffDays < 365 ? `Hace ${Math.floor(diffDays / 30)} meses`
              : `Hace ${Math.floor(diffDays / 365)} años`;
            return { id: videoId, title, thumbnail, published: timeAgo, link };
          });
        if (parsed.length > 0) {
          setRecentVideos(parsed);
          if (activeTab === "recent") setSelectedVideo(parsed[0]);
        }
      } catch {
        // Use fallback
      } finally {
        setLoadingVideos(false);
      }
    };
    fetchVideos();
  }, []);

  // Fetch Bible data
  useEffect(() => {
    const fetchBible = async () => {
      try {
        const res = await fetch(BIBLE_API);
        const buffer = await res.arrayBuffer();
        const text = new TextDecoder("utf-8").decode(buffer).replace(/^\uFEFF/, "");
        const raw = JSON.parse(text);
        // Inject Spanish names
        const enriched: BibleBook[] = raw.map((b: any) => ({
          ...b,
          spanishName: SPANISH_BOOK_NAMES[b.name] || b.name,
        }));
        setBibleData(enriched);
      } catch (err) {
        console.error("Bible fetch failed:", err);
      } finally {
        setBibleLoading(false);
      }
    };
    fetchBible();
  }, []);

  const currentBook = bibleData[selectedBookIdx];
  const currentChapterVerses = currentBook?.chapters[selectedChapter] || [];
  const totalChapters = currentBook?.chapters.length || 0;

  const filteredBooks = bibleData.filter((b) =>
    b.spanishName.toLowerCase().includes(bookSearch.toLowerCase()) ||
    b.name.toLowerCase().includes(bookSearch.toLowerCase())
  );

  const handleBookSelect = (idx: number) => {
    setSelectedBookIdx(idx);
    setSelectedChapter(0);
    setSelectedVerse(0);
    setBookSearch("");
    setShowBookDropdown(false);
  };

  const handleChapterChange = (chapterIdx: number) => {
    setSelectedChapter(chapterIdx);
    setSelectedVerse(0);
  };

  const handleVerseChange = (verseNum: number) => {
    setSelectedVerse(verseNum);
  };

  const handleTabChange = (tab: VideoTab) => {
    setActiveTab(tab);
    const videos = tab === "recent" ? recentVideos : PASTOR_DAVID_VIDEOS;
    setSelectedVideo(videos[0]);
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const prevChapter = () => {
    if (selectedChapter > 0) handleChapterChange(selectedChapter - 1);
  };

  const nextChapter = () => {
    if (selectedChapter < totalChapters - 1) handleChapterChange(selectedChapter + 1);
  };

  const allVerses = currentChapterVerses.map((v, i) => ({ verse: v, num: i + 1 }));

  // Scroll to selected verse when it changes
  useEffect(() => {
    if (selectedVerse > 0 && verseRefs.current[selectedVerse]) {
      verseRefs.current[selectedVerse]?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (verseListRef.current) {
      verseListRef.current.scrollTop = 0;
    }
  }, [selectedVerse, selectedChapter, selectedBookIdx]);

  return (
    <section id="predicas" className="bg-[#0F0F0F] py-16 lg:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-0.5 flame-gradient" />
              <span className="text-[#FF6B35] font-['Nunito_Sans'] text-sm font-600 tracking-widest uppercase">
                Predicas & Biblia
              </span>
            </div>
            <h2 className="font-['Oswald'] font-700 text-4xl lg:text-5xl text-white uppercase tracking-tight">
              La Palabra
            </h2>
          </div>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-white/60 hover:text-white font-['Nunito_Sans'] text-sm font-600 transition-colors group"
          >
            <Youtube className="w-4 h-4 text-red-500" />
            Ver Canal
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Main Layout: Video + Bible */}
        <div className="flex flex-col xl:flex-row gap-6">
          {/* LEFT: Video Player + Tabs + Thumbnails (55%) */}
          <div className="xl:w-[55%] flex flex-col gap-4">
            {/* Main Player */}
            <div className="relative bg-[#1A1A1A] rounded-xl overflow-hidden aspect-video shadow-2xl shadow-black/50">
              <iframe
                key={selectedVideo.id}
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=0&rel=0&modestbranding=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Selected video title */}
            <div className="px-1">
              <h3 className="font-['Oswald'] font-600 text-white text-xl leading-tight line-clamp-2">
                {selectedVideo.title}
              </h3>
              {selectedVideo.published && (
                <p className="flex items-center gap-1.5 text-white/40 font-['Nunito_Sans'] text-sm mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedVideo.published}
                </p>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-[#1A1A1A] rounded-lg p-1 border border-white/8">
              <button
                onClick={() => handleTabChange("recent")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md font-['Nunito_Sans'] font-600 text-xs sm:text-sm transition-all ${
                  activeTab === "recent"
                    ? "flame-gradient text-white shadow-md"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Más Recientes</span>
                <span className="sm:hidden">Recientes</span>
              </button>
              <button
                onClick={() => handleTabChange("livestream")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md font-['Nunito_Sans'] font-600 text-xs sm:text-sm transition-all ${
                  activeTab === "livestream"
                    ? "flame-gradient text-white shadow-md"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  activeTab === "livestream" ? "bg-white" : "bg-red-500"
                }`} />
                En Vivo
              </button>
              <button
                onClick={() => handleTabChange("pastor")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md font-['Nunito_Sans'] font-600 text-xs sm:text-sm transition-all ${
                  activeTab === "pastor"
                    ? "flame-gradient text-white shadow-md"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Pastor David</span>
                <span className="sm:hidden">P. David</span>
              </button>
            </div>

            {/* Video Thumbnails Grid */}
            {!loadingVideos ? (
              <div className="grid grid-cols-5 gap-2">
                {currentTabVideos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => handleVideoSelect(video)}
                    className={`relative group rounded-lg overflow-hidden aspect-video bg-[#1A1A1A] transition-all ${
                      selectedVideo.id === video.id
                        ? "ring-2 ring-[#FF6B35] scale-[1.03]"
                        : "hover:scale-[1.03] hover:ring-1 hover:ring-white/20"
                    }`}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-7 h-7 rounded-full flame-gradient flex items-center justify-center shadow-lg">
                        <Play className="w-3 h-3 fill-white text-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white font-['Nunito_Sans'] text-[9px] leading-tight line-clamp-2">
                        {video.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="aspect-video bg-[#1A1A1A] rounded-lg animate-pulse" />
                ))}
              </div>
            )}

            {/* Channel CTA */}
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-lg border border-white/10 hover:border-[#FF6B35]/50 text-white/60 hover:text-white font-['Nunito_Sans'] text-sm font-600 transition-all group"
            >
              <Youtube className="w-4 h-4 text-red-500" />
              Ver todos los videos en YouTube
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* RIGHT: Bible Reader (45%) */}
          <div
            id="biblia"
            className="xl:w-[45%] bg-[#141414] rounded-xl border border-white/8 flex flex-col overflow-hidden"
            style={{ minHeight: "600px", maxHeight: "780px" }}
          >
            {/* Bible Header */}
            <div className="px-5 pt-5 pb-4 border-b border-white/8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-[#FF6B35]" />
                <span className="font-['Oswald'] font-600 text-white text-lg uppercase tracking-wide">
                  Biblia RVR 1960
                </span>
              </div>

              {/* Book Selector */}
              <div className="relative mb-3">
                <button
                  onClick={() => setShowBookDropdown(!showBookDropdown)}
                  className="w-full flex items-center justify-between px-3 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-lg text-white font-['Nunito_Sans'] text-sm hover:border-white/20 transition-colors"
                >
                  <span className="font-600">{currentBook?.spanishName || "Seleccionar libro"}</span>
                  <ChevronDown className={`w-4 h-4 text-white/50 transition-transform ${showBookDropdown ? "rotate-180" : ""}`} />
                </button>

                {showBookDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#1E1E1E] border border-white/10 rounded-lg shadow-2xl z-20 overflow-hidden">
                    <div className="p-2 border-b border-white/8">
                      <input
                        type="text"
                        placeholder="Buscar libro..."
                        value={bookSearch}
                        onChange={(e) => setBookSearch(e.target.value)}
                        className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm font-['Nunito_Sans'] placeholder-white/30 focus:outline-none focus:border-[#FF6B35]/50"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {filteredBooks.map((book) => {
                        const realIdx = bibleData.findIndex((b) => b.abbrev === book.abbrev);
                        return (
                          <button
                            key={book.abbrev}
                            onClick={() => handleBookSelect(realIdx)}
                            className={`w-full text-left px-4 py-2 text-sm font-['Nunito_Sans'] transition-colors ${
                              realIdx === selectedBookIdx
                                ? "bg-[#FF6B35]/20 text-[#FF6B35]"
                                : "text-white/70 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {book.spanishName}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Chapter + Verse Dropdowns */}
              <div className="flex items-center gap-2">
                {/* Prev chapter */}
                <button
                  onClick={prevChapter}
                  disabled={selectedChapter === 0}
                  className="p-2 rounded bg-[#1A1A1A] border border-white/10 text-white/60 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex-shrink-0"
                  title="Capítulo anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Chapter dropdown */}
                <div className="flex-1">
                  <label className="block text-white/30 font-['Nunito_Sans'] text-[10px] uppercase tracking-widest mb-1">Capítulo</label>
                  <select
                    value={selectedChapter}
                    onChange={(e) => handleChapterChange(Number(e.target.value))}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-white font-['Nunito_Sans'] font-600 text-sm focus:outline-none focus:border-[#FF6B35]/50 transition-colors appearance-none cursor-pointer"
                  >
                    {Array.from({ length: totalChapters }, (_, i) => (
                      <option key={i} value={i} className="bg-[#1A1A1A]">
                        Capítulo {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Verse dropdown */}
                <div className="flex-1">
                  <label className="block text-white/30 font-['Nunito_Sans'] text-[10px] uppercase tracking-widest mb-1">Versículo</label>
                  <select
                    value={selectedVerse}
                    onChange={(e) => handleVerseChange(Number(e.target.value))}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-white font-['Nunito_Sans'] font-600 text-sm focus:outline-none focus:border-[#FF6B35]/50 transition-colors appearance-none cursor-pointer"
                  >
                    <option value={0} className="bg-[#1A1A1A]">Todos</option>
                    {allVerses.map(({ num }) => (
                      <option key={num} value={num} className="bg-[#1A1A1A]">
                        Versículo {num}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Next chapter */}
                <button
                  onClick={nextChapter}
                  disabled={selectedChapter >= totalChapters - 1}
                  className="p-2 rounded bg-[#1A1A1A] border border-white/10 text-white/60 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex-shrink-0 mt-5"
                  title="Siguiente capítulo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Reference bar */}
            <div className="px-5 py-2.5 border-b border-white/5 flex items-center justify-between">
              <span className="text-[#FF6B35] font-['Oswald'] font-500 text-sm uppercase tracking-widest">
                {currentBook?.spanishName} {selectedChapter + 1}{selectedVerse > 0 ? `:${selectedVerse}` : ""}
              </span>
              {selectedVerse > 0 && (
                <button
                  onClick={() => setSelectedVerse(0)}
                  className="text-white/30 hover:text-white/60 font-['Nunito_Sans'] text-xs transition-colors"
                >
                  Ver todo el capítulo
                </button>
              )}
            </div>

            {/* Verses */}
            <div ref={verseListRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {loadingBible ? (
                <div className="space-y-3">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-6 h-4 bg-white/10 rounded animate-pulse flex-shrink-0 mt-1" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3.5 bg-white/10 rounded animate-pulse" />
                        <div className="h-3.5 bg-white/10 rounded animate-pulse w-4/5" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                allVerses.map(({ verse, num }) => (
                  <div
                    key={num}
                    ref={(el) => { verseRefs.current[num] = el; }}
                    className={`flex gap-3 group rounded-lg px-2 py-1.5 -mx-2 transition-all ${
                      selectedVerse === num
                        ? "bg-[#FF6B35]/10 ring-1 ring-[#FF6B35]/30"
                        : "hover:bg-white/3"
                    } ${
                      selectedVerse > 0 && selectedVerse !== num
                        ? "opacity-30"
                        : "opacity-100"
                    }`}
                    onClick={() => handleVerseChange(selectedVerse === num ? 0 : num)}
                    style={{ cursor: "pointer" }}
                  >
                    <span className={`font-['Oswald'] font-500 text-xs mt-1.5 flex-shrink-0 w-5 text-right transition-colors ${
                      selectedVerse === num ? "text-[#FF6B35]" : "text-[#FF6B35]/70"
                    }`}>
                      {num}
                    </span>
                    <p className="bible-text text-sm leading-relaxed">{verse}</p>
                  </div>
                ))
              )}
              {!loadingBible && allVerses.length === 0 && (
                <p className="text-white/30 font-['Nunito_Sans'] text-sm text-center py-8">
                  No hay versículos disponibles
                </p>
              )}
            </div>

            {/* Bible Footer */}
            <div className="px-5 py-3 border-t border-white/8 flex items-center justify-between">
              <span className="text-white/30 font-['Nunito_Sans'] text-xs">Reina-Valera 1960</span>
              <span className="text-white/30 font-['Nunito_Sans'] text-xs">
                {currentChapterVerses.length} versículos
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
