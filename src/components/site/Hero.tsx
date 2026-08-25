import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { Play } from "lucide-react";
import { useState } from "react";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const ease = [0.16, 1, 0.3, 1] as const;

// ─── LINE REVEAL ─────────────────────────────────────────────────────────────
function LineReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.0, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 400], [0, 60]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col overflow-hidden pt-24 pb-0 lg:pt-36 lg:pb-0"
    >
      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      <div className="container-px mx-auto w-full max-w-6xl relative z-10">

        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="text-[13px] font-medium text-muted-foreground"
        >
          Resolve Editor&nbsp;&amp;&nbsp;Motion Designer&nbsp;—&nbsp;Chandigarh, India
        </motion.p>

        {/* Headline */}
        <motion.div style={{ y: textY, opacity: textOpacity }} className="will-change-transform">
          <h1 className="mt-5 lg:mt-7 text-[clamp(2.6rem,8vw,6.5rem)] font-bold leading-[0.92] tracking-tight text-foreground">
            <LineReveal delay={0.18}>Cinematic videos</LineReveal>
            <LineReveal delay={0.30}>that people</LineReveal>
            <LineReveal delay={0.42}>
              <span className="bg-gradient-to-r from-[#6EE7FF] via-[#8B7CFF] to-[#6EE7FF] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                actually watch.
              </span>
            </LineReveal>
          </h1>

          {/* Positioning line */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            className="mt-6 lg:mt-8 max-w-[520px] text-[14px] lg:text-[16px] leading-relaxed text-muted-foreground"
          >
            Cinematic editing, color grading and motion design — built inside a
            single DaVinci Resolve session. For founders, creators and brands
            who need work that converts.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease }}
            className="mt-7 lg:mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-7 py-3 text-[13px] font-semibold text-background transition-all duration-300 hover:opacity-85 hover:scale-[1.02] active:scale-[0.98]"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-border px-7 py-3 text-[13px] font-semibold text-foreground transition-all duration-300 hover:border-foreground/40 hover:bg-surface/50 active:scale-[0.98]"
            >
              Book a Call
            </a>
          </motion.div>
        </motion.div>

        {/* ── REEL — full-width 16:9, no device frame ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.3, ease }}
          className="mt-14 lg:mt-20 w-full"
        >
          <div
            className="relative w-full overflow-hidden rounded-lg border border-border/60"
            style={{ aspectRatio: "16/9" }}
          >
            {isPlaying ? (
              <iframe
                src="https://www.youtube.com/embed/4fFSQCw_SOA?autoplay=1&mute=1&loop=1&playlist=4fFSQCw_SOA&controls=1&modestbranding=1&rel=0&playsinline=1"
                allow="autoplay; encrypted-media; picture-in-picture"
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
                title="Cinematic reel — Arpit Sharma"
                loading="eager"
              />
            ) : (
              <button
                onClick={() => setIsPlaying(true)}
                aria-label="Play cinematic reel"
                className="group absolute inset-0 w-full h-full cursor-pointer"
              >
                <img
                  src="https://img.youtube.com/vi/4fFSQCw_SOA/maxresdefault.jpg"
                  alt="Cinematic reel — Arpit Sharma"
                  className="absolute inset-0 w-full h-full object-cover brightness-75 transition-all duration-500 group-hover:brightness-[0.65]"
                  loading="eager"
                />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center justify-center size-16 lg:size-20 rounded-full border border-white/30 bg-black/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-white/60">
                    <Play className="size-6 lg:size-7 fill-white text-white translate-x-[2px]" />
                  </div>
                </div>
                {/* Label */}
                <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
                  <span className="text-[12px] font-medium text-white/60">
                    Cinematic Reel — 2024
                  </span>
                </div>
              </button>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
