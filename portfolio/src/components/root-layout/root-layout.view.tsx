import { Footer } from "../footer";
import { Header } from "../header";
import { ParticleCanvas } from "../particle-canvas";
import { Terminal } from "../terminal";
import type { Section } from "../../data/portfolio";
import { tv } from "tailwind-variants";

const rootLayout = tv({
  slots: {
    root: "relative grid h-dvh max-h-dvh grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden",
    glowLeft: [
      "pointer-events-none fixed top-[10%] -left-[120px] z-0",
      "hidden h-[320px] w-[320px] rounded-full opacity-25 blur-[100px]",
      "bg-[radial-gradient(circle,rgb(110_43_145/0.3),transparent_70%)]",
      "sm:block sm:h-[420px] sm:w-[420px] sm:opacity-35 sm:blur-[120px]",
    ],
    glowRight: [
      "pointer-events-none fixed right-[-80px] bottom-[5%] z-0",
      "hidden h-[320px] w-[320px] rounded-full opacity-25 blur-[100px]",
      "bg-[radial-gradient(circle,rgb(110_43_145/0.3),transparent_70%)]",
      "sm:block sm:h-[420px] sm:w-[420px] sm:opacity-35 sm:blur-[120px]",
    ],
    main: [
      "relative z-1 flex h-full min-h-0 w-full min-w-0 flex-1",
      "flex-col items-center overflow-hidden",
      "px-3 py-3 sm:px-4 sm:py-4",
    ],
  },
});

const { root, glowLeft, glowRight, main } = rootLayout();

type RootLayoutViewProps = {
  section: Section;
  onNavigate: (section: Section) => void;
};

export function RootLayoutView({ section, onNavigate }: RootLayoutViewProps) {
  return (
    <div className={root()}>
      <ParticleCanvas />
      <div className={glowLeft()} aria-hidden="true" />
      <div className={glowRight()} aria-hidden="true" />

      <Header />

      <main className={main()}>
        <Terminal section={section} onNavigate={onNavigate} />
      </main>

      <Footer />
    </div>
  );
}
