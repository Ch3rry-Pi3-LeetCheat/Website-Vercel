import Link from "next/link";

type RailLink = {
  label: string;
  href: string;
};

type RailSection = {
  title: string;
  links: RailLink[];
};

type RightRailProps = {
  sections: RailSection[];
  activeHref?: string;
};

export default function RightRail({ sections, activeHref }: RightRailProps) {
  return (
    <div className="grid gap-6">
      {sections.map((section) => (
        <div key={section.title} className="glass-panel rounded-2xl px-5 py-5">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
            {section.title}
          </p>
          <div className="mt-4 grid gap-2 text-sm">
            {section.links.map((link) => {
              const isActive = link.href === activeHref;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-2 py-1 transition ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-[color:var(--color-muted)] hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
