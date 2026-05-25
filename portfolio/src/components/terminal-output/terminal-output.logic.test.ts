import { describe, expect, it } from "vite-plus/test";
import {
  getLineDataAttributes,
  isAsciiBlock,
  isKeyInfoLine,
  parseKeyInfoLine,
} from "./terminal-output.logic";

describe("isAsciiBlock", () => {
  it("detects figlet-style ascii banners", () => {
    expect(isAsciiBlock("   ____ _       _ _")).toBe(true);
    expect(isAsciiBlock("  / ___(_)_   _| (_)")).toBe(true);
  });

  it("returns false for regular terminal output", () => {
    expect(isAsciiBlock("ROLE\tFrontend Developer")).toBe(false);
    expect(isAsciiBlock("Available commands:")).toBe(false);
  });
});

describe("getLineDataAttributes", () => {
  it("maps command lines to data-type command", () => {
    expect(getLineDataAttributes({ type: "command", text: "help" })).toEqual({
      "data-type": "command",
    });
  });

  it("maps error lines to data-type error", () => {
    expect(getLineDataAttributes({ type: "error", text: "not found" })).toEqual({
      "data-type": "error",
    });
  });

  it("maps link lines to data-type link", () => {
    expect(getLineDataAttributes({ type: "link" })).toEqual({ "data-type": "link" });
  });

  it("maps empty output to data-type empty", () => {
    expect(getLineDataAttributes({ type: "output", text: "" })).toEqual({ "data-type": "empty" });
  });

  it("maps hint output lines with data-variant hint", () => {
    expect(getLineDataAttributes({ type: "output", text: "hint", variant: "hint" })).toEqual({
      "data-type": "output",
      "data-variant": "hint",
    });
  });

  it("maps help rows with data-variant help-row", () => {
    expect(
      getLineDataAttributes({
        type: "output",
        text: "cd home         go home",
        variant: "help-row",
      }),
    ).toEqual({
      "data-type": "output",
      "data-variant": "help-row",
    });
  });
});

describe("isKeyInfoLine", () => {
  it("detects portfolio metadata lines", () => {
    expect(isKeyInfoLine("ROLE\tFrontend Developer")).toBe(true);
    expect(isKeyInfoLine("Projects")).toBe(false);
  });
});

describe("parseKeyInfoLine", () => {
  it("splits label and value on tab", () => {
    expect(parseKeyInfoLine("ROLE\tFrontend Developer")).toEqual({
      label: "ROLE",
      value: "Frontend Developer",
    });
    expect(parseKeyInfoLine("STACK\tTypeScript · React")).toEqual({
      label: "STACK",
      value: "TypeScript · React",
    });
  });

  it("returns null for non key-info lines", () => {
    expect(parseKeyInfoLine("Projects")).toBeNull();
  });
});
