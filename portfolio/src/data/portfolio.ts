export const portfolio = {
  username: "thefalked",
  host: "portfolio",
  name: "Giuliano Crivelli",
  role: "Frontend Developer",
  location: "Brazil",
  stack: "TypeScript · React · Vite+ · TanStack Router · Tailwind Variants",
  email: "giuliano@thefalked.dev",
  company: "@shiftinc",
  bio: "Frontend developer focused on clean UI and developer experience.",
  socials: [
    { label: "github", href: "https://github.com/thefalked" },
    { label: "linkedin", href: "https://linkedin.com/in/giuliano-crivelli" },
    { label: "email", href: "mailto:giuliano@thefalked.dev" },
  ],
  projects: [
    {
      name: "04-design-system",
      href: "https://github.com/thefalked/04-design-system",
      description: "Monorepo for a component library and design system.",
    },
    {
      name: "02-ignite-timer",
      href: "https://github.com/thefalked/02-ignite-timer",
      description: "Pomodoro timer built with React, TypeScript, and Vite.",
    },
    {
      name: "letmeask",
      href: "https://github.com/thefalked/letmeask",
      description: "Real-time Q&A rooms with Firebase — built during NLW #06.",
    },
    {
      name: "Drink-Count",
      href: "https://github.com/thefalked/Drink-Count",
      description: "Simple app to track drink liters and costs.",
    },
  ],
} as const;

export const asciiBanner = `  ____ _       _ _                      ____      _           _ _ _
 / ___(_)_   _| (_) __ _ _ __   ___    / ___|_ __(_)_   _____| | (_)
| |  _| | | | | | |/ _\` | '_ \\ / _ \\  | |   | '__| \\ \\ / / _ \\ | | |
| |_| | | |_| | | | (_| | | | | (_) | | |___| |  | |\\ V /  __/ | | |
 \\____|_|\\__,_|_|_|\\__,_|_| |_|\\___/   \\____|_|  |_| \\_/ \\___|_|_|_|`;

export type Section = "home" | "projects";

export const navItems: { label: string; section: Section; path: string }[] = [
  { label: "cd home", section: "home", path: "/" },
  { label: "cd projects", section: "projects", path: "/projects" },
];

export const helpCommands = [
  { cmd: "ls projects", desc: "list projects" },
  { cmd: "ls socials", desc: "list social links" },
  { cmd: "cd projects", desc: "go to projects" },
  { cmd: "cd home", desc: "go to home" },
  { cmd: "whoami", desc: "who am I?" },
  { cmd: "pwd", desc: "print working directory" },
  { cmd: "clear", desc: "clear terminal" },
  { cmd: "help", desc: "show this message" },
];
