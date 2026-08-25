import { motion } from "motion/react";
import portrait from "@/assets/portrait.jpg.png";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const TIMELINE = [
  { year: "2024 — Now",  role: "Freelance Creative Editor",    company: "Founders, Creators & Studios" },
  { year: "2023 — 2024", role: "Finishing & Color Specialist", company: "Obscura Motion Lab"            },
  { year: "2022 — 2023", role: "Fusion Motion Compositor",     company: "Parallel Agencies"             },
];

const VALUES = [
  { k: "Story First",  v: "If a frame doesn't serve the story, it doesn't belong in the timeline." },
  { k: "Rhythm",       v: "Cuts timed precisely to breath shifts, vocal drops and organic visual weights." },
  { k: "Color",        v: "Hand-rolled color matching, scene consistency, and realistic grain composite." },
  { k: "Partnership",  v: "No account managers. Direct creative link from reference to final delivery." },
];

const SOFTWARE = ["DaVinci Resolve", "Fusion Studio", "Fairlight"];

const ease = [0.16, 1, 0.3, 1] as const;

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────
export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 mt-28 lg:mt-40">
      <div className="container-px mx-auto max-w-6xl">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="font-mono text-[10px] lg:text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
        >
          About
        </motion.p>

        {/* Single responsive grid — portrait left, content right */}
        <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start">

          {/* ── Left: Portrait ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.0, ease }}
            className="relative"
          >
            <div className="relative rounded-md overflow-hidden aspect-[3/4] w-full max-w-[400px] mx-auto lg:mx-0">
              <img
                src={portrait}
                alt="Arpit Sharma — Creative Video Editor"
                className="absolute inset-0 w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* ── Right: Content ── */}
          <div className="space-y-12 lg:space-y-14">

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease }}
            >
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[0.94] tracking-tighter text-foreground">
                timing isn't just edits —{" "}
                <span className="text-muted-foreground font-normal italic">
                  timing is emotion.
                </span>
              </h2>
              <div className="mt-6 space-y-4">
                <p className="text-[14px] lg:text-[15px] leading-relaxed text-muted-foreground">
                  Every great video starts with structure — not style. I build cinematic
                  timelines combining color grading, audio finishing and motion design
                  under a single DaVinci Resolve session.
                </p>
                <p className="text-[14px] lg:text-[15px] leading-relaxed text-muted-foreground">
                  I partner with founders, creators and startups who want work that
                  captures attention, builds authority and converts viewers into customers.
                  Zero generic styling. Zero account managers.
                </p>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-5">
                Timeline
              </p>
              <div className="divide-y divide-border">
                {TIMELINE.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-4 py-4"
                  >
                    <div>
                      <p className="font-display text-[14px] lg:text-[15px] font-semibold text-foreground leading-tight">
                        {item.role}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                        {item.year}
                      </p>
                    </div>
                    <p className="text-[12px] lg:text-[13px] text-muted-foreground text-right max-w-[45%] leading-snug shrink-0">
                      {item.company}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Editorial Values */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-5">
                Editorial Values
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {VALUES.map((val) => (
                  <div key={val.k}>
                    <p className="font-display text-[14px] font-semibold text-foreground">
                      {val.k}
                    </p>
                    <p className="mt-1 text-[12px] lg:text-[13px] leading-relaxed text-muted-foreground">
                      {val.v}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Software */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.25, ease }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Tools
              </p>
              <p className="text-[13px] lg:text-[14px] text-muted-foreground">
                {SOFTWARE.join(" · ")}
              </p>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
