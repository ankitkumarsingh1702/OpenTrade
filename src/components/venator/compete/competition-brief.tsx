/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { ActionButton } from "@/components/venator/ui/action-button";
import { MaterialIcon } from "@/components/venator/ui/material-icon";

const facts = [
  { label: "Dates", value: "1 to 7 Aug 2026", icon: "calendar_today" as const },
  { label: "Location", value: "Virtual, Australia", icon: "public" as const },
  { label: "Team Size", value: "Teams of 1 to 4", icon: "group" as const },
];

export function CompetitionBrief() {
  return (
    <section
      className="competition-brief clip-notch-both"
      aria-labelledby="competition-title"
    >
      <p className="competition-brief__host">
        <MaterialIcon name="wifi_tethering" />
        Hosted by Capital Markets Association
      </p>
      <h2 id="competition-title">
        CMA x FinTech x FINSOC OpenTrade Case Competition
      </h2>
      <p className="competition-brief__summary">
        Build a stock portfolio and test it against OpenTrade AI agents.
      </p>
      <dl className="competition-facts clip-notch-both">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>
              <MaterialIcon name={fact.icon} />
              {fact.label}
            </dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      <div className="competition-actions">
        <ActionButton
          icon="login"
          label="Event Signup"
          notice="Event registration is not connected in this local interface preview."
        />
        <ActionButton
          icon="swords"
          label="Enter Competition"
          notice="Competition gameplay is not connected in this local interface preview."
          variant="secondary"
        />
      </div>
    </section>
  );
}
