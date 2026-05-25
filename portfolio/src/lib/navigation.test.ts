import { describe, expect, it } from "vite-plus/test";
import { getWindowPath, pathToSection, sectionToPath } from "./navigation";

describe("pathToSection", () => {
  it("maps root path to home", () => {
    expect(pathToSection("/")).toBe("home");
  });

  it("maps projects path to projects", () => {
    expect(pathToSection("/projects")).toBe("projects");
  });
});

describe("sectionToPath", () => {
  it("maps sections to route paths", () => {
    expect(sectionToPath("home")).toBe("/");
    expect(sectionToPath("projects")).toBe("/projects");
  });
});

describe("getWindowPath", () => {
  it("maps sections to terminal window labels", () => {
    expect(getWindowPath("home")).toBe("~");
    expect(getWindowPath("projects")).toBe("projects");
  });
});
