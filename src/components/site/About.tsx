import { motion } from "motion/react";
import portrait from "@/assets/portrait.jpg.png";

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────
export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 mt-24 lg:mt-32 pb-12 lg:pb-24">
      <div className="container-px mx-auto max-w-6xl">
        
        {/* Simple single entrance animation for the entire section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start"
        >
          
          {/* ── Left: Portrait (approx 40-45% on desktop) ── */}
          <div className="w-full lg:w-[42%] shrink-0">
            <div className="relative rounded-xl overflow-hidden w-full max-w-[500px] mx-auto lg:mx-0">
              <img
                src={portrait}
                alt="Arpit Sharma"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: "4/5" }}
                loading="lazy"
              />
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div className="w-full lg:w-[58%] pt-2 lg:pt-8 space-y-8">
            
            <div className="space-y-6">
              <h3 className="text-base font-medium text-muted-foreground">
                About
              </h3>
              
              <h2 className="text-[2rem] lg:text-[2.75rem] font-bold leading-[1.1] text-foreground tracking-tight">
                Hi, I'm Arpit.
              </h2>
            </div>

            <div className="space-y-5">
              <p className="text-[16px] lg:text-[17.5px] leading-[1.6] text-foreground/90">
                I'm a video editor and motion designer focused on cinematic editing, motion graphics and visual storytelling.
              </p>
              
              <p className="text-[16px] lg:text-[17.5px] leading-[1.6] text-foreground/90">
                I work with founders, creators and brands to turn ideas into clear, engaging and visually strong videos.
              </p>
              
              <p className="text-[16px] lg:text-[17.5px] leading-[1.6] text-foreground/90">
                My approach is simple: understand the story, find the right rhythm, then make every frame earn its place.
              </p>
            </div>

            <div className="pt-6 border-t border-border/40 space-y-4">
              <p className="text-[14px] lg:text-[15px] text-muted-foreground">
                2+ years creating and editing cinematic visual content.
              </p>
              <p className="text-[14px] lg:text-[15px] text-muted-foreground">
                DaVinci Resolve · Fusion · Fairlight · Adobe Premiere Pro
              </p>
            </div>

          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
