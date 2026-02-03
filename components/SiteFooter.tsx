import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[rgba(9,12,18,0.92)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-[color:var(--color-muted)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-white">Leet-Cheat</p>
          <p className="mt-2 max-w-md text-xs leading-6">
            Practical coding, systems design, and applied AI curriculum built
            for modern interviews and real-world delivery.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.2em]">
          <Link href="/tutorials" className="transition hover:text-white">
            Tutorials
          </Link>
          <Link href="/roadmap" className="transition hover:text-white">
            Roadmap
          </Link>
          <Link href="/contact" className="transition hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
