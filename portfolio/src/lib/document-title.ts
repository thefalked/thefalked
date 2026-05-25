import { portfolio, type Section } from "../data/portfolio";

export function getDocumentTitle(section: Section) {
  return section === "home" ? portfolio.name : `Projects — ${portfolio.name}`;
}
