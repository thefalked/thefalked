import type { Section } from "../data/portfolio";

export function pathToSection(pathname: string): Section {
  return pathname.startsWith("/projects") ? "projects" : "home";
}

export function sectionToPath(section: Section) {
  return section === "projects" ? "/projects" : "/";
}

export function getWindowPath(section: Section) {
  return section === "home" ? "~" : section;
}
