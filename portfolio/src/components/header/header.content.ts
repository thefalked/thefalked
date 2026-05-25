import { navItems, portfolio } from "../../data/portfolio";

export const headerContent = {
  username: portfolio.username,
  host: portfolio.host,
  navItems,
} as const;
