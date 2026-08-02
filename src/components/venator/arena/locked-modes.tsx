/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { MaterialIcon } from "@/components/venator/ui/material-icon";

const lockedModes = [
  {
    id: "arena",
    title: "Arena",
    description: "Build five picks. Beat ChatGPT.",
    status: "7500 more XP to unlock",
  },
  {
    id: "real-money",
    title: "Real money",
    description: "Not available yet",
    status: "Complete four levels. Eligibility required.",
  },
];

export function LockedModes() {
  return (
    <section aria-label="Locked modes" className="locked-grid">
      {lockedModes.map((mode) => (
        <article
          className={`locked-card locked-card--${mode.id} clip-notch-br`}
          data-disabled="true"
          key={mode.title}
        >
          <span aria-hidden="true" className="locked-card__art" />
          <div className="locked-card__content">
            <div className="locked-card__topline">
              <MaterialIcon name="lock" />
              <span>Locked</span>
            </div>
            <h3>{mode.title}</h3>
            <p>{mode.description}</p>
            <div className="locked-card__status">{mode.status}</div>
          </div>
        </article>
      ))}
    </section>
  );
}
