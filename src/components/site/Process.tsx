import { motion } from "motion/react";

const STEPS = [
  {
    n: "01",
    title: "Discovery",
    body: "Brief, references, audience and goals. I map the why before the what — so every cut has a reason.",
  },
  {
    n: "02",
    title: "Direction",
    body: "Story arc, format and pacing strategy aligned to a single goal. Approved before a single cut.",
  },
  {
    n: "03",
    title: "Craft",
    body: "Story-first editing, color grading, motion design and sound — all inside a single DaVinci Resolve session. Up to two structured revision rounds.",
  },
  {
    n: "04",
    title: "Delivery",
    body: "All formats, all aspect ratios, ready for launch. Clear handoff, no loose ends.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative mt-28 lg:mt-40 scroll-mt-24">
      <div className="container-px mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <p className="text-[14px] font-medium text-muted-foreground">
            The Process
          </p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.94] tracking-tight text-foreground">
            A calm, deliberate<br />
            way of working.
          </h2>
        </div>

        {/* Steps — horizontal divider list */}
        <div className="divide-y divide-border">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-[3rem_1fr] lg:grid-cols-[6rem_1fr_2fr] items-start gap-6 lg:gap-12 py-8 lg:py-10"
            >
              {/* Number */}
              <span className="text-[13px] font-medium text-muted-foreground/50 pt-1 lg:pt-2">
                {s.n}
              </span>

              {/* Title */}
              <h3 className="text-[1.5rem] lg:text-[2rem] font-bold tracking-tight text-foreground leading-none pt-0.5 lg:col-start-2">
                {s.title}
              </h3>

              {/* Body — sits in 3rd col on desktop, full-width below number on mobile */}
              <p className="col-span-2 lg:col-span-1 lg:col-start-3 text-[14px] lg:text-[15px] leading-relaxed text-muted-foreground pl-[calc(3rem+1.5rem)] lg:pl-0">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
