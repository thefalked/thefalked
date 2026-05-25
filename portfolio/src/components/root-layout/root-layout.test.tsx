import { screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import { portfolio } from "../../data/portfolio";
import { renderWithRouter } from "../../test/test-utils";

describe("RootLayout", () => {
  it("renders header, terminal, and footer on home route", async () => {
    await renderWithRouter(undefined, { initialPath: "/" });

    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Interactive terminal" })).toBeInTheDocument();
    expect(screen.getByText("[session active]")).toBeInTheDocument();
    expect(document.title).toBe(portfolio.name);
  });

  it("updates document title on projects route", async () => {
    await renderWithRouter(undefined, { initialPath: "/projects" });

    expect(document.title).toBe(`Projects — ${portfolio.name}`);
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });
});
