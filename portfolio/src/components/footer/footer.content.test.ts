import { describe, expect, it } from "vite-plus/test";
import { getFooterContent } from "./footer.content";
import { portfolio } from "../../data/portfolio";

describe("getFooterContent", () => {
  it("maps portfolio data to footer props", () => {
    const content = getFooterContent();

    expect(content.name).toBe(portfolio.name);
    expect(content.socials).toEqual(portfolio.socials);
    expect(content.year).toBe(new Date().getFullYear());
  });
});
