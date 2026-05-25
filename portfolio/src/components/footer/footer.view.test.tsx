import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import { portfolio } from "../../data/portfolio";
import { FooterView } from "./footer.view";

describe("FooterView", () => {
  it("renders session status and social links", () => {
    render(<FooterView name={portfolio.name} year={2026} socials={portfolio.socials} />);

    expect(screen.getByText("[session active]")).toBeInTheDocument();
    expect(screen.getByText(`${portfolio.name} © 2026`)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "github" })).toHaveAttribute(
      "href",
      portfolio.socials[0].href,
    );
  });
});
