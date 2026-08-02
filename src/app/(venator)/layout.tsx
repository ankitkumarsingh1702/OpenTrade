import type { ReactNode } from "react";

import { TacticalShell } from "@/components/venator/shell/tactical-shell";

export default function VenatorLayout({ children }: { children: ReactNode }) {
  return <TacticalShell>{children}</TacticalShell>;
}
