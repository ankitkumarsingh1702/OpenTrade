/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { ActionButton } from "@/components/venator/ui/action-button";
import { MaterialIcon } from "@/components/venator/ui/material-icon";
import { milestones } from "@/data/venator";

import { PreferencesPanel } from "./preferences-panel";

export function ProfileContent() {
  return (
    <div className="profile-stack">
      <section>
        <h2 className="profile-section-title">
          <span aria-hidden="true" />
          Account
        </h2>
        <div className="hud-panel clip-notch-br account-panel">
          <p>Signed in as</p>
          <strong>ankitkumarsingh97593@gmail.com</strong>
        </div>
      </section>

      <PreferencesPanel />

      <section>
        <p className="inventory-label">Inventory</p>
        <h2 className="profile-section-title rewards-title">
          <span aria-hidden="true" />
          Rewards
        </h2>
        <div className="hud-panel clip-notch-br rewards-panel">
          <div>
            <span className="rewards-panel__icon">
              <MaterialIcon name="ac_unit" />
            </span>
            <strong>Freezes</strong>
          </div>
          <b>0</b>
        </div>
      </section>

      <section>
        <h2 className="profile-section-title milestones-title">
          <span aria-hidden="true" />
          Milestones
        </h2>
        <div className="milestone-grid">
          {milestones.map((milestone) => (
            <article
              className="milestone-card clip-notch-tr"
              key={milestone.name}
            >
              <MaterialIcon name="lock" />
              <h3>{milestone.name}</h3>
              <p>Unlocks at Level {milestone.level}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-actions">
        <ActionButton
          icon="open_in_new"
          label="View OpenTrade gear"
          notice="The OpenTrade gear store is not connected in this local interface preview."
          variant="text"
        />
        <ActionButton
          icon="logout"
          label="Sign out"
          notice="Authentication is not connected in this local interface preview, so no session was changed."
          variant="outline"
        />
      </section>
    </div>
  );
}
