import { useRef, useState, useEffect, useCallback, memo } from "react";
import { useInView } from "motion/react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { PROJECTS, type Project } from "@/data/projects";

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function getYouTubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:embed\/|watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

const META: Record<number, { year: string; duration: string; role: string }> = {
  7: { year: "2024", duration: "0:45", role: "Motion Designer" },
  2: { year: "2023", duration: "0:58", role: "Senior Editor" },
  3: { year: "2023", duration: "1:15", role: "Lead Editor" },
  4: { year: "2024", duration: "1:30", role: "Fusion Compositor" },
  5: { year: "2024", duration: "0:52", role: "Lead Editor" },
  1: { year: "2023", duration: "1:05", role: "Senior Editor" },
};

// ─── GALLERY ITEM ─────────────────────────────────────────────────────────────

const GalleryItem = memo(function GalleryItem({
  project,
  index,
  isPlaying,
  isActive,
  onPlay,
  onPause,
}: {
  project: Project;
  index: number;
  isPlaying: boolean;
  isActive: boolean;
  onPlay: () => void;
  onPause: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  // Pause / unmount iframe when far out of view (1.5× viewport margin)
  const isInView = useInView(itemRef, { margin: "150% 0px 150% 0px", once: false });

  const youtubeId = project.video ? getYouTubeId(project.video) : null;
  const isYouTube = Boolean(youtubeId);
  const meta = META[project.id] ?? { year: "2024", duration: "1:00", role: "Editor" };
  const thumb =
    youtubeId
      ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
      : project.thumbnail ?? project.image;

  const isHorizontal = project.orientation === "horizontal";

  // Auto-pause when scrolled out of view
  useEffect(() => {
    if (!isInView && isPlaying) onPause();
  }, [isInView, isPlaying, onPause]);

  return (
    <div
      ref={itemRef}
      data-gallery-item
      data-index={index}
      className={`
        flex-shrink-0 snap-start flex flex-col gap-4
        transition-all duration-500 ease-out
        ${isActive ? "opacity-100 scale-100" : "opacity-50 scale-[0.96]"}
      `}
      style={{
        /* Horizontal: ~68vw capped at 900px; Vertical: ~32vw capped at 400px */
        width: isHorizontal
          ? "clamp(280px, 68vw, 900px)"
          : "clamp(180px, 32vw, 400px)",
      }}
    >
      {/* Frame */}
      <div
        className={`
          group relative rounded-md border border-border/50 overflow-hidden bg-black
          cursor-pointer transition-border duration-300 hover:border-border w-full
        `}
        style={{ aspectRatio: isHorizontal ? "16 / 9" : "9 / 16" }}
      >
        {/* Thumbnail */}
        {(!isPlaying || !isYouTube) && thumb && (
          <img
            src={thumb}
            alt={project.title}
            loading="lazy"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}

        {/* HTML5 video */}
        {isInView && !isYouTube && (
          <video
            src={project.video}
            poster={thumb}
            controls={isPlaying}
            loop
            playsInline
            muted
            autoPlay={isPlaying}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isPlaying ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* YouTube iframe — only when in-view AND actively playing */}
        {isInView && isYouTube && isPlaying && (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&playsinline=1&controls=1&modestbranding=1&rel=0&fs=1`}
            className="absolute inset-0 w-full h-full z-30 pointer-events-auto"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            style={{ border: "none" }}
            title={project.title}
            loading="lazy"
          />
        )}

        {/* Bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />

        {/* Play button */}
        {!isPlaying && (
          <button
            onClick={onPlay}
            aria-label={`Play ${project.title}`}
            className="absolute inset-0 w-full h-full flex items-center justify-center z-20"
          >
            <div
              className={`
                flex items-center justify-center rounded-full border border-white/25
                bg-black/40 backdrop-blur-sm transition-all duration-300
                group-hover:scale-110 group-hover:border-white/50
                ${isHorizontal ? "size-14 lg:size-16" : "size-12"}
              `}
            >
              <Play
                className={`fill-white text-white translate-x-[1.5px] ${isHorizontal ? "size-5" : "size-4"}`}
              />
            </div>
          </button>
        )}
      </div>

      {/* Details below frame */}
      <div>
        <p className="text-[12px] font-medium text-muted-foreground">
          {project.category} · {meta.year} · {meta.duration}
        </p>
        <h3
          className={`mt-1 font-semibold tracking-tight text-foreground leading-tight ${
            isHorizontal ? "text-[1.15rem] lg:text-[1.3rem]" : "text-[1rem] lg:text-[1.1rem]"
          }`}
        >
          {project.title}
        </h3>
        <p className="mt-1 text-[13px] font-medium text-muted-foreground/55">
          {meta.role}
        </p>
      </div>
    </div>
  );
});

// ─── PROJECTS GALLERY SECTION ──────────────────────────────────────────────────

export function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingId, setPlayingId] = useState<number | null>(null);

  // ── IntersectionObserver: detect which item is most centred ────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = Array.from(track.querySelectorAll<HTMLElement>("[data-gallery-item]"));
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest intersectionRatio
        let best = entries[0];
        for (const entry of entries) {
          if (entry.intersectionRatio > (best?.intersectionRatio ?? 0)) best = entry;
        }
        if (best && best.isIntersecting) {
          const idx = Number((best.target as HTMLElement).dataset.index);
          if (!isNaN(idx)) setActiveIndex(idx);
        }
      },
      {
        root: track,
        threshold: [0, 0.25, 0.5, 0.75, 1],
        // Centre detection: only the middle 60% of the track width counts
        rootMargin: "0px -20% 0px -20%",
      }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  // ── Pointer drag (desktop) ─────────────────────────────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let startX = 0;
    let startScrollLeft = 0;
    let isDragging = false;
    let hasMoved = false;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // let native touch handle touch
      isDragging = true;
      hasMoved = false;
      startX = e.clientX;
      startScrollLeft = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
      track.style.cursor = "grabbing";
      track.style.userSelect = "none";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) hasMoved = true;
      track.scrollLeft = startScrollLeft - dx;
    };

    const onPointerUp = () => {
      isDragging = false;
      track.style.cursor = "";
      track.style.userSelect = "";
    };

    // Prevent click-firing play when the user was dragging
    const onClickCapture = (e: MouseEvent) => {
      if (hasMoved) {
        e.stopPropagation();
        hasMoved = false;
      }
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerUp);
    track.addEventListener("click", onClickCapture, true);

    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("pointercancel", onPointerUp);
      track.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  // ── Wheel → horizontal scroll (only while pointer is over track) ───────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onWheel = (e: WheelEvent) => {
      // Only hijack predominantly-vertical wheel events over the track
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // already horizontal — let it pass
      e.preventDefault();
      track.scrollLeft += e.deltaY * 1.2;
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  // ── Prev / Next ────────────────────────────────────────────────────────────
  const goTo = useCallback((targetIndex: number) => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.querySelectorAll<HTMLElement>("[data-gallery-item]"));
    const target = items[targetIndex];
    if (!target) return;

    // Snap to item's offsetLeft, accounting for track padding
    const trackPaddingLeft = parseInt(getComputedStyle(track).paddingLeft || "0", 10);
    track.scrollTo({
      left: target.offsetLeft - trackPaddingLeft,
      behavior: "smooth",
    });
  }, []);

  const prev = useCallback(() => {
    goTo(Math.max(0, activeIndex - 1));
  }, [activeIndex, goTo]);

  const next = useCallback(() => {
    goTo(Math.min(PROJECTS.length - 1, activeIndex + 1));
  }, [activeIndex, goTo]);

  const handlePause = useCallback((id: number) => {
    setPlayingId((cur) => (cur === id ? null : cur));
  }, []);

  return (
    <section id="work" className="relative mt-20 lg:mt-28 scroll-mt-24">

      {/* ── Header row ── */}
      <div className="container-px mx-auto max-w-6xl mb-10 lg:mb-12">
        <div className="flex items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <p className="text-[14px] font-medium text-muted-foreground mb-3">
              Selected Work
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.94] tracking-tight text-foreground">
              Featured Projects
            </h2>
          </div>

          {/* Counter + nav */}
          <div className="flex items-center gap-3 flex-shrink-0 pb-1">
            <span className="text-[13px] font-medium text-muted-foreground tabular-nums select-none">
              {String(activeIndex + 1).padStart(2, "0")}{" "}
              <span className="text-muted-foreground/40">/</span>{" "}
              {String(PROJECTS.length).padStart(2, "0")}
            </span>

            <button
              onClick={prev}
              disabled={activeIndex === 0}
              aria-label="Previous project"
              className="size-8 flex items-center justify-center rounded-full border border-border text-muted-foreground
                hover:border-foreground/30 hover:text-foreground transition-all duration-200
                disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="size-3.5" strokeWidth={2} />
            </button>

            <button
              onClick={next}
              disabled={activeIndex === PROJECTS.length - 1}
              aria-label="Next project"
              className="size-8 flex items-center justify-center rounded-full border border-border text-muted-foreground
                hover:border-foreground/30 hover:text-foreground transition-all duration-200
                disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <ChevronRight className="size-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Scroll track ── */}
      {/*
        overflow-x: scroll + scroll-snap-type x proximity
        touch-action: pan-x  ← allows horizontal swipe without fighting vertical page scroll
        padding-inline: peek gap at edges so next item is visible
        No scrollbar on any browser via css classes below
      */}
      <div
        ref={trackRef}
        className="
          flex gap-5 lg:gap-7
          overflow-x-scroll overflow-y-hidden
          scroll-snap-type-x-proximity
          touch-action-pan-x
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          items-end
          pb-2
        "
        style={{
          scrollSnapType: "x proximity",
          touchAction: "pan-x",
          paddingLeft: "clamp(1rem, 4vw, 4rem)",
          paddingRight: "clamp(1rem, 4vw, 4rem)",
          cursor: "grab",
        }}
      >
        {PROJECTS.map((project, i) => (
          <GalleryItem
            key={project.id}
            project={project}
            index={i}
            isPlaying={playingId === project.id}
            isActive={activeIndex === i}
            onPlay={() => setPlayingId(project.id)}
            onPause={() => handlePause(project.id)}
          />
        ))}
      </div>

    </section>
  );
}
