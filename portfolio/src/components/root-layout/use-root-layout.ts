import { useEffect } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import type { Section } from "../../data/portfolio";
import { getDocumentTitle } from "../../lib/document-title";
import { pathToSection, sectionToPath } from "../../lib/navigation";

export function useRootLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const section = pathToSection(pathname);

  useEffect(() => {
    document.title = getDocumentTitle(section);
  }, [section]);

  const onNavigate = (nextSection: Section) => {
    void navigate({ to: sectionToPath(nextSection) });
  };

  return { section, onNavigate };
}
