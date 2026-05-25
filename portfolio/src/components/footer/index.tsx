import { getFooterContent } from "./footer.content";
import { FooterView } from "./footer.view";

export function Footer() {
  return <FooterView {...getFooterContent()} />;
}
