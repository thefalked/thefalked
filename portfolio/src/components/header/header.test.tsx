import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import { portfolio } from "../../data/portfolio";
import { renderWithRouter } from "../../test/test-utils";

describe("Header", () => {
  it("renders terminal prompt with username and host", async () => {
    await renderWithRouter(undefined, { initialPath: "/" });

    expect(screen.getByText(portfolio.username)).toBeInTheDocument();
    expect(screen.getByText(portfolio.host)).toBeInTheDocument();
    expect(screen.getByText(":")).toBeInTheDocument();
    expect(screen.getByText("~")).toBeInTheDocument();
    expect(screen.getByText("$", { selector: "header a span" })).toBeInTheDocument();
  });

  it("renders navigation links for each route", async () => {
    await renderWithRouter(undefined, { initialPath: "/" });

    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "cd home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "cd projects" })).toHaveAttribute("href", "/projects");
  });

  it("marks the active nav link with data-active", async () => {
    await renderWithRouter(undefined, { initialPath: "/" });

    const activeHome = screen.getByRole("link", { name: "cd home" });
    const inactiveProjects = screen.getByRole("link", { name: "cd projects" });

    expect(activeHome).toHaveAttribute("data-active", "true");
    expect(activeHome.className).toMatch(/bg-neon-soft-hover/);

    const homeNav = within(activeHome);
    expect(homeNav.getByText("cd")).toHaveClass("text-neon-secondary");
    expect(homeNav.getByText("home").className).toMatch(/text-neon/);
    expect(activeHome.querySelector('span[aria-hidden="true"]')).toBeInTheDocument();

    expect(within(inactiveProjects).getByText("projects").className).toMatch(/text-neon-muted/);
    expect(screen.getByRole("link", { name: "cd projects" })).not.toHaveAttribute("data-active");
  });
});
