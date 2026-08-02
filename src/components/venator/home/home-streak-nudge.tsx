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
      next: day === streak.completedNodes + 1,
    };
  });

  return (
    <section aria-label="Daily streak" className="streak-nudge clip-notch-br">
      <div className="streak-nudge__summary">
        <span aria-hidden="true" className="streak-nudge__fire clip-notch-tl">
          <MaterialIcon filled name="local_fire_department" />
        </span>
        <div>
          <h2>{streak.title}</h2>
          <p>{streak.description}</p>
        </div>
      </div>

      <div
        aria-label={`${streak.currentDays} of ${streak.targetDays} streak days complete`}
        aria-valuemax={streak.targetDays}
        aria-valuemin={0}
        aria-valuenow={streak.completedNodes}
        className="streak-nudge__progress"
        role="progressbar"
      >
        <ol aria-hidden="true" className="streak-nudge__days">
          {days.map(({ complete, day, next }) => (
            <li
              className={`streak-nudge__day${
                complete ? " streak-nudge__day--complete" : ""
              }${next ? " streak-nudge__day--next" : ""}`}
              key={day}
            >
              <span>{complete ? <MaterialIcon name="check" /> : day}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="streak-nudge__action">
        <span>{streak.milestone}</span>
        <a
          className="tactical-button tactical-button--primary streak-nudge__cta"
          data-tactical-sound="launch"
          href="#daily-drills"
        >
          Choose a Daily Drill
          <MaterialIcon name="arrow_forward" />
        </a>
      </div>
    </section>
  );
}
