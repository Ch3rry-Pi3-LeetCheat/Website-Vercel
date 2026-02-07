import Link from "next/link";

const navLinks = [
  { label: "Library", href: "/topics" },
  { label: "Algorithms", href: "/algorithms-data-structures" },
  { label: "LLMs", href: "/llms" },
  { label: "Courses", href: "/courses" },
  { label: "Practice", href: "/practice" },
  { label: "Roadmap", href: "/roadmap" },
];

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[rgba(9,12,18,0.86)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--color-surface-2)] text-sm font-semibold text-white shadow-[var(--shadow-glow)]">
            LC
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white">Leet-Cheat</p>
            <p className="text-[11px] uppercase tracking-[0.35em] text-[color:var(--color-muted)]">
              Interview Studio
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[color:var(--color-muted)] md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="rounded-full border border-white/10 bg-[color:var(--color-surface-2)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-accent-2)]">
            Pro
          </span>
          <Link
            href="/signin"
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white/40"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
