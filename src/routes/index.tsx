import { createFileRoute } from "@tanstack/react-router";
import React, { Suspense, lazy } from "react";

import { Hero } from "@/components/site/Hero";
import { ScrollProgress } from "@/components/site/ScrollProgress";

// Lazy load below-the-fold sections for optimized initial bundle loading
const Projects = lazy(() => import("@/components/site/Projects").then(m => ({ default: m.Projects })));
const Process = lazy(() => import("@/components/site/Process").then(m => ({ default: m.Process })));
const About = lazy(() => import("@/components/site/About").then(m => ({ default: m.About })));
const Contact = lazy(() => import("@/components/site/Contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/site/Footer").then(m => ({ default: m.Footer })));

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Arpit Sharma — Cinematic Video Editing & Motion Design" },
      {
        name: "description",
        content:
          "Cinematic editing, color grading and motion design for founders, creators and brands. Based in Chandigarh, working worldwide.",
      },
      { property: "og:title", content: "Arpit Sharma — Cinematic Video Editing & Motion Design" },
      {
        property: "og:description",
        content:
          "Cinematic editing, color grading and motion design for founders, creators and brands.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
}));

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="noise relative size-full">
        <ScrollProgress />
        <main>
          <Hero />
          <Suspense fallback={null}>
            <Projects />
            <Process />
            <About />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}
