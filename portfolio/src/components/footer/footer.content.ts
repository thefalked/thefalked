import { portfolio } from "../../data/portfolio";

export function getFooterContent() {
  return {
    name: portfolio.name,
    year: new Date().getFullYear(),
    socials: portfolio.socials,
  } as const;
}
