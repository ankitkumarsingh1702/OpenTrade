/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ReactNode } from "react";

import { TacticalShell } from "@/components/venator/shell/tactical-shell";

export default function VenatorLayout({ children }: { children: ReactNode }) {
  return <TacticalShell>{children}</TacticalShell>;
}
