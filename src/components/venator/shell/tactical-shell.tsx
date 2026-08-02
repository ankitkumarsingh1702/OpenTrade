import type { ReactNode } from "react";

import { CommandCenter } from "@/components/venator/shell/command-center";
import { MobileHeader } from "@/components/venator/shell/mobile-header";
import { PrimarySidebar } from "@/components/venator/shell/primary-sidebar";

export function TacticalShell({ children }: { children: ReactNode }) {
  return (
    <div className="tactical-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <PrimarySidebar />
      <MobileHeader />
      <main className="main-canvas" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <CommandCenter />
    </div>
  );
}
