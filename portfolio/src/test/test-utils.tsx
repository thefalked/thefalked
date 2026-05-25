import { render, type RenderOptions } from "@testing-library/react";
import { RouterProvider, createMemoryHistory, createRouter } from "@tanstack/react-router";
import type { ReactElement } from "react";
import { routeTree } from "../routeTree.gen";

export async function renderWithRouter(
  ui?: ReactElement,
  { initialPath = "/" }: { initialPath?: string } = {},
  options?: Omit<RenderOptions, "wrapper">,
) {
  const history = createMemoryHistory({ initialEntries: [initialPath] });
  const router = createRouter({
    routeTree,
    history,
    defaultPendingMinMs: 0,
  });

  await router.load();

  if (ui) {
    return render(ui, options);
  }

  return render(<RouterProvider router={router} />, options);
}
