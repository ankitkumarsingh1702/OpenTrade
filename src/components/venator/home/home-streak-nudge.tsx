/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { operator } from "@/data/venator";
import { getStreakPresentation } from "@/lib/streak";

import { MaterialIcon } from "../ui/material-icon";

export function HomeStreakNudge() {
  const streak = getStreakPresentation(operator.streak);
  const days = Array.from({ length: streak.targetDays }, (_, index) => {
    const day = index + 1;
    return {
      complete: day <= streak.completedNodes,
      day,
      latestComplete:
        day === streak.completedNodes && streak.completedNodes > 0,
      next: day === streak.completedNodes + 1,
    };
  });

  return (
    <section aria-label="Daily streak" className="streak-nudge clip-notch-br">
      <div className="streak-nudge__summary">
        <span aria-hidden="true" className="streak-nudge__fire">
          <MaterialIcon filled name="local_fire_department" />
        </span>
        <h2>{streak.title}</h2>
        <p className="sr-only">{streak.description}</p>
      </div>

      <div
        aria-label={`${streak.currentDays} of ${streak.targetDays} streak days complete`}
        aria-valuemax={streak.targetDays}
        aria-valuemin={0}
        aria-valuenow={streak.completedNodes}
        className="streak-nudge__progress"
        role="progressbar"
      >
        <span aria-hidden="true" className="streak-nudge__progress-label">
          {streak.currentDays} / {streak.targetDays}
        </span>
        <ol aria-hidden="true" className="streak-nudge__days">
          {days.map(({ complete, day, latestComplete, next }) => (
            <li
              className={`streak-nudge__day${
                complete ? " streak-nudge__day--complete" : ""
              }${latestComplete ? " streak-nudge__day--latest" : ""}${
                next ? " streak-nudge__day--next" : ""
              }`}
              key={day}
            >
              <span>
                {latestComplete ? <MaterialIcon name="check" /> : day}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <a
        aria-label={`Play today. ${streak.milestone}.`}
        className="tactical-button tactical-button--primary streak-nudge__cta"
        data-tactical-sound="launch"
        href="#daily-drills"
      >
        <span className="streak-nudge__cta-copy">
          <strong>Play today</strong>
          <small>{streak.milestone}</small>
        </span>
        <MaterialIcon name="arrow_forward" />
      </a>
    </section>
  );
}
