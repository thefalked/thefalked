import { tv } from "tailwind-variants";

const footer = tv({
  slots: {
    root: [
      "relative z-1 flex flex-col gap-4 px-3 pt-4",
      "pb-[max(1.25rem,env(safe-area-inset-bottom))] text-terminal-sm",
      "lg:flex-row lg:items-center lg:justify-between lg:px-6 lg:pb-5 lg:text-terminal-link",
    ],
    statusGroup: "flex min-w-0 flex-wrap items-center gap-2.5",
    statusDot: ["h-[7px] w-[7px] shrink-0 rounded-full bg-neon", "shadow-neon-dot"],
    status: "text-neon",
    copyright: "text-neon-dim",
    links: "flex flex-wrap gap-3 lg:gap-4",
    link: [
      "inline-flex min-h-11 items-center text-neon-dim no-underline",
      "hover:text-neon-muted lg:min-h-0",
    ],
  },
});

const { root, statusGroup, statusDot, status, copyright, links, link } = footer();

type FooterViewProps = {
  name: string;
  year: number;
  socials: ReadonlyArray<{ label: string; href: string }>;
};

export function FooterView({ name, year, socials }: FooterViewProps) {
  return (
    <footer className={root()}>
      <div className={statusGroup()}>
        <span className={statusDot()} aria-hidden="true" />
        <span className={status()}>[session active]</span>
        <span className={copyright()}>
          {name} &copy; {year}
        </span>
      </div>

      <div className={links()}>
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className={link()}
          >
            {social.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
