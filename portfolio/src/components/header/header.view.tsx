import { Link } from "@tanstack/react-router";
import { tv } from "tailwind-variants";
import type { Section } from "../../data/portfolio";

const header = tv({
  slots: {
    root: "relative z-1 flex flex-col gap-4 px-3 py-4 max-sm:gap-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5",
    prompt:
      "min-w-0 max-w-full text-[0.8rem] no-underline hover:text-neon-secondary sm:text-[0.9rem] sm:whitespace-nowrap",
    username: "text-neon",
    host: "text-neon-secondary",
    symbolDim: "text-neon-dim",
    path: "text-neon-muted",
    nav: "flex w-full min-w-0 flex-wrap gap-2 sm:w-auto sm:justify-end sm:gap-1.5",
    navLink: [
      "group relative inline-flex min-h-11 items-center gap-2 rounded-md px-3 py-2.5 text-[0.85rem] no-underline transition-colors sm:min-h-0 sm:py-1.5 sm:text-[0.9rem]",
      "hover:bg-neon-soft-hover data-[active=true]:bg-neon-soft-hover",
    ],
    navDot: [
      "hidden h-1.5 w-1.5 shrink-0 rounded-full bg-neon shadow-[0_0_6px_rgb(110_43_145/0.9)]",
      "group-data-[active=true]:inline-block",
    ],
    navPrefix: "text-neon-secondary",
    navSection: "text-neon-muted group-hover:!text-neon group-data-[active=true]:!text-neon",
  },
});

const {
  root,
  prompt,
  username: usernameSlot,
  host: hostSlot,
  symbolDim,
  path,
  nav,
  navLink,
  navDot,
  navPrefix,
  navSection,
} = header();

type HeaderViewProps = {
  username: string;
  host: string;
  navItems: ReadonlyArray<{ label: string; path: string; section: Section }>;
};

export function HeaderView({ username, host, navItems }: HeaderViewProps) {
  return (
    <header className={root()}>
      <Link to="/" className={prompt()}>
        <span className={usernameSlot()}>{username}</span>
        <span className={symbolDim()}>@</span>
        <span className={hostSlot()}>{host}</span>
        <span className={symbolDim()}>:</span>
        <span className={path()}>~</span>
        <span className={path()}>$</span>
      </Link>

      <nav className={nav()} aria-label="Main navigation">
        {navItems.map(({ label, path, section }) => (
          <Link
            key={path}
            to={path}
            className={navLink()}
            activeProps={{ "data-active": true }}
            activeOptions={path === "/" ? { exact: true } : undefined}
            aria-label={label}
          >
            <span className={navDot()} aria-hidden="true" />
            <span className={navPrefix()}>cd </span>
            <span className={navSection()}>{section}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
