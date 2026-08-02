/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ReactNode } from "react";

import { InteractionEffects } from "@/components/venator/effects/interaction-effects";
import { LegalFooter } from "@/components/venator/legal/legal-footer";
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
      <div className="main-canvas">
        <main className="main-canvas__content" id="main-content" tabIndex={-1}>
          {children}
        </main>
        <LegalFooter />
      </div>
      <CommandCenter />
      <InteractionEffects />
    </div>
  );
}
