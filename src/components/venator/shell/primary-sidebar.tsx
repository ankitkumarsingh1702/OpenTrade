import Image from "next/image";

import { NavLinks } from "@/components/venator/shell/nav-links";
import { ActionButton } from "@/components/venator/ui/action-button";

export function PrimarySidebar() {
  return (
    <aside aria-label="Primary navigation sidebar" className="primary-sidebar">
      <LinklessBrand />
      <NavLinks />
      <div className="primary-sidebar__footer">
        <ActionButton icon="bolt" label="Go Pro" />
      </div>
    </aside>
  );
}

export function LinklessBrand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "brand brand--compact" : "brand"}>
      <Image
        alt="OpenTrade Tactical Logo"
        height={512}
        priority
        sizes={compact ? "44px" : "256px"}
        src="/assets/opentrade-tactical-logo.jpg"
        width={512}
      />
    </div>
  );
}
