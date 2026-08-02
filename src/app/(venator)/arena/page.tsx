/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Metadata } from "next";

import { ArenaHero } from "@/components/venator/arena/arena-hero";
import { DrillSelector } from "@/components/venator/arena/drill-selector";
import { LockedModes } from "@/components/venator/arena/locked-modes";
import { ActionButton } from "@/components/venator/ui/action-button";
import { SectionHeading } from "@/components/venator/ui/section-heading";

export const metadata: Metadata = { title: "Arena" };

export default function ArenaPage() {
  return (
    <div className="page page--arena">
      <ArenaHero expanded />
      <div className="arena-sections">
        <SectionHeading>Daily Drills</SectionHeading>
        <section
          aria-labelledby="drill-selector-title"
          id="drill-selector"
          tabIndex={-1}
        >
          <div id="drill-selector-title">
            <SectionHeading level={3}>Pick a drill</SectionHeading>
          </div>
          <DrillSelector />
          <ActionButton
            className="add-game-button"
            icon="add_circle"
            label="Add your own game"
            notice="Custom drill creation is not connected in this local interface preview."
            variant="outline"
          />
        </section>
        <LockedModes />
      </div>
    </div>
  );
}
