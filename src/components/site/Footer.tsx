export function Footer() {
  return (
    <footer className="mt-20 lg:mt-32 border-t border-border">
      <div className="container-px mx-auto max-w-6xl flex flex-col items-start justify-between gap-6 py-8 lg:py-12 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-foreground" />
          <span className="text-[14px] font-semibold">
            ARPIT SHARMA
          </span>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-muted-foreground">
          <a href="#work" className="hover:text-foreground transition-colors">Work</a>
          <a href="#process" className="hover:text-foreground transition-colors">Process</a>
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
      </div>
      <div className="container-px mx-auto max-w-6xl flex items-center justify-between border-t border-border py-5 text-[11px] text-muted-foreground/60">
        <span>© 2024 Arpit Sharma. All rights reserved.</span>
        <a
          href="#contact"
          className="text-[13px] font-medium hover:text-foreground transition-colors"
        >
          Open to new projects →
        </a>
      </div>
    </footer>
  );
}
