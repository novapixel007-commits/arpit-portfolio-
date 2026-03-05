import { useEffect, useRef } from "react";

const skillCards = [
  {
    title: "Artificial Intelligence",
    text: "Building practical systems, workflow automations, and AI-assisted products for modern teams.",
  },
  {
    title: "Photography",
    text: "Composing visual stories with clarity, texture, and an eye for brand-driven imagery.",
  },
  {
    title: "Cinematography",
    text: "Creating motion-led narratives that feel polished, intentional, and emotionally sharp.",
  },
  {
    title: "UI / UX Design",
    text: "Designing digital experiences that balance function, flow, and a memorable visual identity.",
  },
];

const links = [
  {
    label: "Email",
    href: "mailto:arpit.work007@gmail.com",
    value: "arpit.work007@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arpit-sharma-484457379",
    value: "linkedin.com/in/arpit-sharma-484457379",
  },
  {
    label: "Portfolio",
    href: "https://portfolioarpit.my.canva.site/",
    value: "portfolioarpit.my.canva.site",
  },
];

export function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let animationFrame = 0;
    const particleCount = window.innerWidth < 768 ? 36 : 80;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.8 + 0.2,
    }));

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > window.innerWidth) {
          particle.vx *= -1;
        }

        if (particle.y < 0 || particle.y > window.innerHeight) {
          particle.vy *= -1;
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(245, 240, 225, 0.48)";
        context.fill();
      });

      for (let index = 0; index < particles.length; index += 1) {
        for (let innerIndex = index + 1; innerIndex < particles.length; innerIndex += 1) {
          const first = particles[index];
          const second = particles[innerIndex];
          const dx = first.x - second.x;
          const dy = first.y - second.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            context.beginPath();
            context.strokeStyle = `rgba(245, 240, 225, ${0.09 - distance / 2000})`;
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.stroke();
          }
        }
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--page-bg)] text-[var(--text-primary)]">
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 -z-10 opacity-80"
        aria-hidden="true"
      />

      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,_rgba(226,119,62,0.22),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(170,196,166,0.2),_transparent_26%),linear-gradient(180deg,_#090909_0%,_#11110f_45%,_#0c0d0e_100%)]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-80 bg-[linear-gradient(180deg,rgba(244,232,201,0.08),transparent)]" />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-5 pb-16 pt-6 sm:px-8 lg:px-10">
        <section className="reveal relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 px-6 py-8 backdrop-blur-md sm:px-8 sm:py-10 lg:min-h-[76vh] lg:px-12 lg:py-14">
          <div className="absolute inset-x-6 top-5 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.35em] text-[var(--text-muted)] sm:inset-x-8 lg:inset-x-12">
            <span>Arpit Sharma</span>
            <span>Creative Technologist</span>
          </div>

          <div className="grid gap-12 pt-14 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:pt-20">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-black/20 px-4 py-2 text-xs tracking-[0.22em] text-[var(--text-muted)] uppercase">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_18px_var(--accent)]" />
                Open to creative and technical collaborations
              </div>

              <div className="space-y-4">
                <p className="font-[var(--font-display)] text-sm uppercase tracking-[0.32em] text-[var(--accent-soft)]">
                  Video Editor | UI/UX Designer | AI Developer
                </p>
                <h1 className="max-w-4xl font-[var(--font-display)] text-5xl leading-none text-[var(--text-primary)] sm:text-6xl lg:text-8xl">
                  I build sharp digital systems with a cinematic point of view.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                  I work where creativity meets technology, helping founders shape better digital experiences,
                  automate workflows, and create high-impact visual content that feels intentional from first
                  frame to final interaction.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--button-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent-soft)]"
                  href="mailto:arpit.work007@gmail.com?subject=Let%27s%20work%20together"
                >
                  Start a Conversation
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white/5 px-6 py-3 text-sm font-medium text-[var(--text-primary)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-soft)] hover:bg-white/10"
                  href="https://portfolioarpit.my.canva.site/"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Portfolio
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <article className="reveal rounded-[1.6rem] border border-[var(--line)] bg-black/25 p-6 [animation-delay:120ms]">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Education</p>
                <h2 className="mt-4 font-[var(--font-display)] text-2xl text-[var(--accent-soft)]">
                  B.Tech Artificial Intelligence
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  I.K. Gujral Punjab Technical University
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">2025 - 2029</p>
              </article>

              <article className="reveal rounded-[1.6rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(247,197,72,0.12),rgba(255,255,255,0.03))] p-6 [animation-delay:220ms]">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Focus</p>
                <p className="mt-4 text-lg leading-8 text-[var(--text-primary)]">
                  Designing interfaces, crafting motion, and applying AI where it simplifies real work.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="reveal rounded-[1.8rem] border border-[var(--line)] bg-white/6 p-6 backdrop-blur-md sm:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Approach</p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl text-[var(--text-primary)] sm:text-4xl">
              The goal is not more noise. It is more clarity, more feeling, and better systems.
            </h2>
          </div>

          <div className="reveal rounded-[1.8rem] border border-[var(--line)] bg-black/20 p-6 text-[var(--text-secondary)] backdrop-blur-md [animation-delay:100ms] sm:p-8">
            <p className="max-w-3xl text-base leading-8 sm:text-lg">
              My work sits at the intersection of design, storytelling, and technical execution. Whether I am
              shaping a product interface, editing a visual narrative, or building AI-assisted workflows, I aim
              to make the end result feel clean, useful, and distinctly human.
            </p>
          </div>
        </section>

        <section className="space-y-8">
          <div className="reveal flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Skills</p>
              <h2 className="mt-2 font-[var(--font-display)] text-4xl text-[var(--text-primary)] sm:text-5xl">
                Built across image, interface, and intelligence.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--text-secondary)] sm:text-right">
              A cross-disciplinary toolkit shaped for founders, teams, and projects that need both aesthetics and execution.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {skillCards.map((skill, index) => (
              <article
                key={skill.title}
                className="reveal rounded-[1.8rem] border border-[var(--line)] bg-white/6 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-soft)] hover:bg-white/8 sm:p-7"
                style={{ animationDelay: `${index * 110}ms` }}
              >
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
                  0{index + 1}
                </p>
                <h3 className="mt-4 font-[var(--font-display)] text-2xl text-[var(--text-primary)]">
                  {skill.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">{skill.text}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="reveal rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-6 py-8 backdrop-blur-md sm:px-8 sm:py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Contact</p>
              <h2 className="mt-3 font-[var(--font-display)] text-4xl text-[var(--text-primary)] sm:text-5xl">
                Let&apos;s make the next project feel polished before it even launches.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:min-w-[620px]">
              {links.map((link) => (
                <a
                  key={link.label}
                  className="rounded-[1.4rem] border border-[var(--line)] bg-black/20 p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-soft)] hover:bg-black/30"
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">{link.label}</p>
                  <p className="mt-3 break-all text-sm leading-6 text-[var(--text-primary)]">{link.value}</p>
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
