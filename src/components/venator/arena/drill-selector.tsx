/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

"use client";

import { useState } from "react";

import { MaterialIcon } from "@/components/venator/ui/material-icon";
import { drills } from "@/data/venator";

export function DrillSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="drill-grid">
      {drills.map((drill) => {
        const isSelected = drill.id === selected;

        return (
          <button
            aria-pressed={isSelected}
            className={`drill-card drill-card--button clip-notch-br${isSelected ? " is-selected" : ""}`}
            key={drill.id}
            onClick={() => setSelected(isSelected ? null : drill.id)}
            type="button"
          >
            <span className="drill-card__topline">
              <span className="drill-card__badge">{drill.index}</span>
              <MaterialIcon className="drill-card__icon" name={drill.icon} />
            </span>
            <span className="drill-card__title">{drill.title}</span>
            <span className="drill-card__description">{drill.description}</span>
            <span className="drill-card__meta">
              <span>Elo {drill.elo}</span>
              <strong>{drill.difficulty}</strong>
            </span>
          </button>
        );
      })}
    </div>
  );
}
