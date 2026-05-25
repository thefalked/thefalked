import { headerContent } from "./header.content";
import { HeaderView } from "./header.view";

export function Header() {
  return <HeaderView {...headerContent} />;
}
