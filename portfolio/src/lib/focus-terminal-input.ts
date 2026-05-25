export const TERMINAL_INPUT_ID = "terminal-input";
export const TERMINAL_REGION_LABEL = "Interactive terminal";

const MODIFIER_FOCUS_KEYS = new Set(["/", "k", "K"]);

function getTerminalScrollContainer() {
  const terminal = document.querySelector(`[aria-label="${TERMINAL_REGION_LABEL}"]`);
  return terminal?.querySelector(".terminal-scrollbar") ?? null;
}

export function scrollTerminalToEnd(behavior: ScrollBehavior = "smooth") {
  const scrollContainer = getTerminalScrollContainer();
  if (scrollContainer) {
    const top = scrollContainer.scrollHeight;

    if (typeof scrollContainer.scrollTo === "function") {
      scrollContainer.scrollTo({ top, behavior });
    } else {
      scrollContainer.scrollTop = top;
    }

    return;
  }

  document
    .querySelector(`[aria-label="${TERMINAL_REGION_LABEL}"] [data-terminal-end]`)
    ?.scrollIntoView({ behavior, block: "nearest" });
}

export function focusTerminalInput() {
  scrollTerminalToEnd();

  const input = document.getElementById(TERMINAL_INPUT_ID);
  input?.focus({ preventScroll: true });
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;

  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

export function isTerminalFocusHotkey(event: KeyboardEvent) {
  const key = event.key;
  if (!MODIFIER_FOCUS_KEYS.has(key) || event.altKey || event.repeat) return false;

  if (event.metaKey || event.ctrlKey) return true;

  if (key !== "/") return false;

  if (event.target instanceof HTMLElement && event.target.id === TERMINAL_INPUT_ID) {
    return false;
  }

  return !isEditableTarget(event.target);
}
