import { RootLayoutView } from "./root-layout.view";
import { useRootLayout } from "./use-root-layout";

export function RootLayout() {
  const { section, onNavigate } = useRootLayout();

  return <RootLayoutView section={section} onNavigate={onNavigate} />;
}
