import { motion, useInView } from "motion/react";
import { Play, ArrowUpRight } from "lucide-react";
import { useState, useRef, useEffect, useCallback, memo } from "react";
import { PROJECTS, type Project } from "@/data/projects";

// Extract YouTube ID safely
function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:embed\/|watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

// Year, Duration, Role mapping for projects
const PROJECT_METADATA: Record<
  number,
  { year: string; duration: string; role: string }
> = {
  7: { year: "2024", duration: "0:45", role: "Motion Designer" },
  2: { year: "2023", duration: "0:58", role: "Senior Editor" },
  3: { year: "2023", duration: "1:15", role: "Lead Editor" },
  4: { year: "2024", duration: "1:30", role: "Fusion Compositor" },
  5: { year: "2024", duration: "0:52", role: "Lead Editor" },
  1: { year: "2023", duration: "1:05", role: "Senior Editor" },
};

// ─── HERO PROJECT (HORIZONTAL CARD) ────────────────────────────────────────────
const HeroProjectCard = memo(function HeroProjectCard({
  project,
  isPlaying,
  onPlay,
  onClosePlay,
}: {
  project: Project;
  isPlaying: boolean;
  onPlay: () => void;
  onClosePlay: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, { once: false, margin: "-100px" });

  const youtubeId = project.video ? getYouTubeId(project.video) : null;
  const isYouTube = Boolean(youtubeId);
  const meta = PROJECT_METADATA[project.id] || { year: "2024", duration: "1:00", role: "Editor" };

  const thumbnailSrc = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : project.thumbnail ?? project.image;

  // Auto-pause video when scrolled out of viewport
  useEffect(() => {
    if (!isCardInView && isPlaying) {
      onClosePlay();
    }
  }, [isCardInView, isPlaying, onClosePlay]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {/* Video frame */}
      <div className="group relative rounded-md border border-border/50 overflow-hidden aspect-[16/9] w-full bg-black cursor-pointer transition-all duration-300 hover:border-border">
        {/* Thumbnail */}
        {(!isPlaying || !isYouTube) && thumbnailSrc && (
          <img
            src={thumbnailSrc}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}

        {/* HTML5 video */}
        {isCardInView && !isYouTube && (
          <video
            src={project.video}
            poster={thumbnailSrc}
            controls={isPlaying}
            loop
            playsInline
            muted
            autoPlay={isPlaying}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${
              isPlaying ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* YouTube iframe — only when visible and playing */}
        {isCardInView && isYouTube && isPlaying && (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&playsinline=1&controls=1&modestbranding=1&rel=0&fs=1`}
            className="absolute inset-0 w-full h-full pointer-events-auto z-40"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            style={{ border: "none" }}
            title={project.title}
            loading="lazy"
          />
        )}

        {/* Bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10" />

        {/* Play button */}
        {!isPlaying && (
          <button
            onClick={onPlay}
            aria-label={`Play ${project.title}`}
            className="absolute inset-0 w-full h-full flex items-center justify-center z-20"
          >
            <div className="flex items-center justify-center size-14 lg:size-16 rounded-full border border-white/25 bg-black/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-white/50">
              <Play className="size-5 fill-white text-white translate-x-[2px]" />
            </div>
          </button>
        )}
      </div>

      {/* Details below frame */}
      <div className="mt-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {project.category} · {meta.year} · {meta.duration}
          </p>
          <h3 className="mt-1.5 font-display font-bold text-[1.3rem] lg:text-[1.6rem] text-foreground leading-tight tracking-tight">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground/60 uppercase tracking-wider">
            {meta.role}
          </p>
        </div>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-200 shrink-0"
        >
          Enquire <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </motion.div>
  );
});

// ─── VERTICAL PROJECT (9:16) ───────────────────────────────────────────────────
const VerticalProjectCard = memo(function VerticalProjectCard({
  project,
  isPlaying,
  onPlay,
  onClosePlay,
}: {
  project: Project;
  isPlaying: boolean;
  onPlay: () => void;
  onClosePlay: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, { once: false, margin: "-100px" });

  const youtubeId = project.video ? getYouTubeId(project.video) : null;
  const isYouTube = Boolean(youtubeId);
  const meta = PROJECT_METADATA[project.id] || { year: "2024", duration: "1:00", role: "Editor" };

  const thumbnailSrc = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : project.thumbnail ?? project.image;

  useEffect(() => {
    if (!isCardInView && isPlaying) {
      onClosePlay();
    }
  }, [isCardInView, isPlaying, onClosePlay]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {/* Video frame */}
      <div className="group relative rounded-md border border-border/50 overflow-hidden aspect-[9/16] w-full bg-black cursor-pointer transition-all duration-300 hover:border-border">
        {/* Thumbnail */}
        {(!isPlaying || !isYouTube) && thumbnailSrc && (
          <img
            src={thumbnailSrc}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}

        {/* HTML5 video */}
        {isCardInView && !isYouTube && (
          <video
            src={project.video}
            poster={thumbnailSrc}
            controls={isPlaying}
            loop
            playsInline
            muted
            autoPlay={isPlaying}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${
              isPlaying ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* YouTube iframe */}
        {isCardInView && isYouTube && isPlaying && (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&playsinline=1&controls=1&modestbranding=1&rel=0&fs=1`}
            className="absolute inset-0 w-full h-full pointer-events-auto z-40"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            style={{ border: "none" }}
            title={project.title}
            loading="lazy"
          />
        )}

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none z-10" />

        {/* Play button */}
        {!isPlaying && (
          <button
            onClick={onPlay}
            aria-label={`Play ${project.title}`}
            className="absolute inset-0 w-full h-full flex items-center justify-center z-20"
          >
            <div className="flex items-center justify-center size-12 rounded-full border border-white/25 bg-black/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-white/50">
              <Play className="size-4 fill-white text-white translate-x-[1px]" />
            </div>
          </button>
        )}
      </div>

      {/* Details below frame */}
      <div className="mt-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {project.category} · {meta.year} · {meta.duration}
        </p>
        <h3 className="mt-1.5 font-display font-semibold text-[1.1rem] lg:text-[1.2rem] text-foreground leading-tight tracking-tight">
          {project.title}
        </h3>
        <p className="mt-0.5 font-mono text-[10px] text-muted-foreground/60 uppercase tracking-wider">
          {meta.role}
        </p>
      </div>
    </motion.div>
  );
});

// ─── PROJECTS SECTION ─────────────────────────────────────────────────────────
export function Projects() {
  const [playingId, setPlayingId] = useState<number | null>(null);

  const handleClosePlay = useCallback((id: number) => {
    setPlayingId((current) => (current === id ? null : current));
  }, []);

  const hero1 = PROJECTS[0];
  const pair1_left = PROJECTS[1];
  const pair1_right = PROJECTS[2];
  const hero2 = PROJECTS[3];
  const pair2_left = PROJECTS[4];
  const pair2_right = PROJECTS[5];

  return (
    <section
      id="work"
      className="relative mt-20 lg:mt-28 scroll-mt-24"
    >
      <div className="container-px mx-auto max-w-6xl">

        {/* Section Header */}
        <div className="mb-12 lg:mb-16 border-b border-border pb-6">
          <p className="font-mono text-[10px] lg:text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Selected Work
          </p>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.94] tracking-tighter text-foreground">
            Featured Projects
          </h2>
        </div>

        {/* Projects layout */}
        <div className="flex flex-col gap-16 lg:gap-20">

          {/* Row 1: Hero (16:9) */}
          <HeroProjectCard
            project={hero1}
            isPlaying={playingId === hero1.id}
            onPlay={() => setPlayingId(hero1.id)}
            onClosePlay={() => handleClosePlay(hero1.id)}
          />

          {/* Row 2: Pair (9:16) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            <VerticalProjectCard
              project={pair1_left}
              isPlaying={playingId === pair1_left.id}
              onPlay={() => setPlayingId(pair1_left.id)}
              onClosePlay={() => handleClosePlay(pair1_left.id)}
            />
            <VerticalProjectCard
              project={pair1_right}
              isPlaying={playingId === pair1_right.id}
              onPlay={() => setPlayingId(pair1_right.id)}
              onClosePlay={() => handleClosePlay(pair1_right.id)}
            />
          </div>

          {/* Row 3: Hero (16:9) */}
          <HeroProjectCard
            project={hero2}
            isPlaying={playingId === hero2.id}
            onPlay={() => setPlayingId(hero2.id)}
            onClosePlay={() => handleClosePlay(hero2.id)}
          />

          {/* Row 4: Pair (9:16) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            <VerticalProjectCard
              project={pair2_left}
              isPlaying={playingId === pair2_left.id}
              onPlay={() => setPlayingId(pair2_left.id)}
              onClosePlay={() => handleClosePlay(pair2_left.id)}
            />
            <VerticalProjectCard
              project={pair2_right}
              isPlaying={playingId === pair2_right.id}
              onPlay={() => setPlayingId(pair2_right.id)}
              onClosePlay={() => handleClosePlay(pair2_right.id)}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
