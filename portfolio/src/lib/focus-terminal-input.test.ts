import { afterEach, describe, expect, it, vi } from "vite-plus/test";
import {
  TERMINAL_INPUT_ID,
  TERMINAL_REGION_LABEL,
  focusTerminalInput,
  isTerminalFocusHotkey,
  scrollTerminalToEnd,
} from "./focus-terminal-input";

function mountTerminalDom() {
  document.body.innerHTML = `
    <section aria-label="${TERMINAL_REGION_LABEL}">
      <div class="terminal-scrollbar" style="height: 100px; overflow: auto">
        <div style="height: 400px">output</div>
        <div data-terminal-end></div>
      </div>
      <input id="${TERMINAL_INPUT_ID}" />
    </section>
  `;

  const scrollContainer = document.querySelector(".terminal-scrollbar") as HTMLDivElement;
  Object.defineProperty(scrollContainer, "scrollHeight", { value: 400, configurable: true });
  scrollContainer.scrollTo = vi.fn();
}

describe("isTerminalFocusHotkey", () => {
  it("matches slash when focus is outside inputs", () => {
    const event = new KeyboardEvent("keydown", { key: "/", bubbles: true });
    Object.defineProperty(event, "target", { value: document.body });

    expect(isTerminalFocusHotkey(event)).toBe(true);
  });

  it("matches meta or ctrl slash from the terminal input", () => {
    const input = document.createElement("input");
    input.id = TERMINAL_INPUT_ID;

    const metaEvent = new KeyboardEvent("keydown", { key: "/", metaKey: true, bubbles: true });
    Object.defineProperty(metaEvent, "target", { value: input });
    const ctrlEvent = new KeyboardEvent("keydown", { key: "/", ctrlKey: true, bubbles: true });
    Object.defineProperty(ctrlEvent, "target", { value: input });

    expect(isTerminalFocusHotkey(metaEvent)).toBe(true);
    expect(isTerminalFocusHotkey(ctrlEvent)).toBe(true);
  });

  it("matches meta or ctrl k from the terminal input", () => {
    const input = document.createElement("input");
    input.id = TERMINAL_INPUT_ID;

    const metaEvent = new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true });
    Object.defineProperty(metaEvent, "target", { value: input });
    const ctrlEvent = new KeyboardEvent("keydown", { key: "K", ctrlKey: true, bubbles: true });
    Object.defineProperty(ctrlEvent, "target", { value: input });

    expect(isTerminalFocusHotkey(metaEvent)).toBe(true);
    expect(isTerminalFocusHotkey(ctrlEvent)).toBe(true);
  });

  it("ignores plain k without modifiers", () => {
    const event = new KeyboardEvent("keydown", { key: "k", bubbles: true });
    Object.defineProperty(event, "target", { value: document.body });

    expect(isTerminalFocusHotkey(event)).toBe(false);
  });

  it("ignores plain slash while typing in the terminal input", () => {
    const input = document.createElement("input");
    input.id = TERMINAL_INPUT_ID;
    const event = new KeyboardEvent("keydown", { key: "/", bubbles: true });
    Object.defineProperty(event, "target", { value: input });

    expect(isTerminalFocusHotkey(event)).toBe(false);
  });
});

describe("scrollTerminalToEnd", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("scrolls the terminal output container to the bottom", () => {
    mountTerminalDom();
    const scrollContainer = document.querySelector(".terminal-scrollbar") as HTMLDivElement;

    scrollTerminalToEnd("auto");

    expect(scrollContainer.scrollTo).toHaveBeenCalledWith({ top: 400, behavior: "auto" });
  });
});

describe("focusTerminalInput", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("scrolls output and focuses the terminal input", () => {
    mountTerminalDom();
    const input = document.getElementById(TERMINAL_INPUT_ID) as HTMLInputElement;
    const focusSpy = vi.spyOn(input, "focus");

    focusTerminalInput();

    expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });
  });
});
