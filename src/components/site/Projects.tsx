import { useState, useEffect, useCallback, memo } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  isCenter,
}: {
  project: Project;
  isCenter: boolean;
}) {
  const youtubeId = project.video ? getYouTubeId(project.video) : null;
  const isYouTube = Boolean(youtubeId);
  const thumb =
    youtubeId
      ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
      : project.thumbnail ?? project.image;

  const isHorizontal = project.orientation === "horizontal";

  return (
    <div
      className="w-full h-full relative rounded-xl overflow-hidden bg-black/50 border border-white/5 transition-colors duration-500 hover:border-white/10"
      style={{
        boxShadow: isCenter ? "0 20px 40px -10px rgba(0,0,0,0.5)" : "none",
      }}
    >
      {/* Thumbnail (always visible if not playing native video) */}
      {(!isCenter || isYouTube) && thumb && (
        <img
          src={thumb}
          alt={project.title}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />
      )}

      {/* HTML5 video (Only renders if it's the center active video to save memory) */}
      {isCenter && !isYouTube && (
        <video
          src={project.video}
          poster={thumb}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* YouTube iframe (Only renders if center) */}
      {isCenter && isYouTube && (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&playsinline=1&controls=0&modestbranding=1&rel=0`}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none scale-105"
          allow="autoplay; encrypted-media; picture-in-picture"
          style={{ border: "none" }}
          title={project.title}
          loading="lazy"
        />
      )}

      {/* Subtle vignette on center video */}
      {isCenter && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-20" />
      )}
    </div>
  );
});

// ─── PROJECTS GALLERY SECTION ──────────────────────────────────────────────────

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const N = PROJECTS.length;

  const prev = useCallback(() => {
    setActiveIndex((cur) => (cur - 1 + N) % N);
  }, [N]);

  const next = useCallback(() => {
    setActiveIndex((cur) => (cur + 1) % N);
  }, [N]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // Pan / Swipe handler
  const handlePanEnd = (e: any, info: any) => {
    const threshold = 50;
    const velocityThreshold = 400;
    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      next();
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      prev();
    }
  };

  const activeProject = PROJECTS[activeIndex];
  const activeMeta = META[activeProject.id] ?? { year: "2024", duration: "1:00", role: "Editor" };

  return (
    <section id="work" className="relative mt-16 lg:mt-24 scroll-mt-24 overflow-hidden py-10 lg:py-16">
      <div className="container-px mx-auto max-w-6xl mb-8 lg:mb-10 text-center">
        <p className="text-[13px] font-medium text-muted-foreground mb-2">
          Selected Work
        </p>
        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold leading-[1] tracking-tight text-foreground">
          Featured Projects
        </h2>
      </div>

      {/* Carousel Track Area */}
      <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] max-h-[800px] flex items-center justify-center">
        
        {/* Navigation Buttons (Left/Right) - Outside active visual area on desktop */}
        <button
          onClick={prev}
          aria-label="Previous project"
          className="absolute left-4 lg:left-12 z-50 size-10 lg:size-12 flex items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white/70 hover:bg-black/60 hover:text-white transition-all duration-300"
        >
          <ChevronLeft className="size-5 lg:size-6" strokeWidth={1.5} />
        </button>

        <button
          onClick={next}
          aria-label="Next project"
          className="absolute right-4 lg:right-12 z-50 size-10 lg:size-12 flex items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white/70 hover:bg-black/60 hover:text-white transition-all duration-300"
        >
          <ChevronRight className="size-5 lg:size-6" strokeWidth={1.5} />
        </button>

        {/* Swipe Capture Layer */}
        <motion.div
          onPanEnd={handlePanEnd}
          className="absolute inset-0 z-40 cursor-grab active:cursor-grabbing touch-pan-y"
        />

        {/* Video Items */}
        {PROJECTS.map((project, i) => {
          // Calculate circular distance from activeIndex
          let diff = (i - activeIndex) % N;
          if (diff < 0) diff += N;
          if (diff > Math.floor(N / 2)) diff -= N;

          const isCenter = diff === 0;
          const isLeft = diff === -1;
          const isRight = diff === 1;
          const isHidden = Math.abs(diff) > 1;

          // Responsive geometry values
          const xOffset = isCenter ? "0%" : isLeft ? "-85%" : isRight ? "85%" : diff > 0 ? "150%" : "-150%";
          const scale = isCenter ? 1 : 0.85;
          const opacity = isCenter ? 1 : isHidden ? 0 : 0.55;
          const blur = isCenter ? 0 : isHidden ? 12 : 6;
          const zIndex = isCenter ? 30 : isHidden ? 10 : 20;

          // Aspect ratio sizes
          const isHorizontal = project.orientation === "horizontal";
          const widthClass = isHorizontal ? "w-[85vw] md:w-[65vw] lg:w-[55vw] max-w-[1000px]" : "w-[60vw] md:w-[35vw] lg:w-[28vw] max-w-[450px]";
          
          return (
            <motion.div
              key={project.id}
              initial={false}
              animate={{
                x: xOffset,
                scale,
                opacity,
                filter: `blur(${blur}px)`,
                zIndex,
              }}
              transition={{
                duration: 0.55,
                ease: [0.32, 0.72, 0, 1], // Premium spring-like CSS ease without bounce
              }}
              className={`absolute ${widthClass} h-full max-h-full flex flex-col justify-center pointer-events-none`}
            >
              <div
                className="w-full relative transition-transform duration-300 pointer-events-auto"
                style={{
                  aspectRatio: isHorizontal ? "16/9" : "9/16",
                  maxHeight: "100%", // ensure vertical videos don't overflow viewport height
                }}
              >
                {/* Wrap in subtle hover scale if it's the center item */}
                <motion.div
                  whileHover={isCenter ? { scale: 1.015 } : {}}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <GalleryItem project={project} isCenter={isCenter} />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Metadata (Below the active video) */}
      <div className="container-px mx-auto max-w-2xl mt-8 lg:mt-12 text-center">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-[12px] font-medium text-[#6EE7FF]">
            {activeProject.category}
          </p>
          <h3 className="text-[1.25rem] lg:text-[1.5rem] font-bold tracking-tight text-foreground">
            {activeProject.title}
          </h3>
          <p className="text-[13px] text-muted-foreground/80">
            {activeMeta.role} · {activeMeta.year}
          </p>
        </motion.div>

        {/* Subtle active indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-4 bg-white/90"
                  : "w-1.5 bg-white/20 hover:bg-white/40 cursor-pointer"
              }`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
