import { describe, expect, it } from "vite-plus/test";
import { getDocumentTitle } from "./document-title";
import { portfolio } from "../data/portfolio";

describe("getDocumentTitle", () => {
  it("returns profile name on home", () => {
    expect(getDocumentTitle("home")).toBe(portfolio.name);
  });

  it("returns projects title on projects section", () => {
    expect(getDocumentTitle("projects")).toBe(`Projects — ${portfolio.name}`);
  });
});
