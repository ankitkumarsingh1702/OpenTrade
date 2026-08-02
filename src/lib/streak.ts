/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { StreakSnapshot } from "@/types/venator";

const DEFAULT_TARGET_DAYS = 7;

function normalizeWholeNumber(value: number, fallback: number) {
  if (!Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(0, Math.floor(value));
}

export function getStreakPresentation(streak: StreakSnapshot) {
  const currentDays = normalizeWholeNumber(streak.currentDays, 0);
  const requestedTarget = normalizeWholeNumber(
    streak.targetDays,
    DEFAULT_TARGET_DAYS,
  );
  const targetDays = requestedTarget || DEFAULT_TARGET_DAYS;
  const completedNodes = Math.min(currentDays, targetDays);
  const remainingDays = Math.max(targetDays - currentDays, 0);

  return {
    completedNodes,
    currentDays,
    description:
      currentDays === 0
        ? "Play one Daily Drill today to begin."
        : "One Daily Drill keeps your momentum going.",
    milestone:
      remainingDays === 0
        ? `${targetDays}-day target reached`
        : `${remainingDays} ${remainingDays === 1 ? "day" : "days"} to ${targetDays}-day target`,
    remainingDays,
    targetDays,
    title:
      currentDays === 0 ? "Start your streak" : `${currentDays}-day streak`,
  };
}
