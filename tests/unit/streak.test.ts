import { describe, expect, it } from "vitest";

import { getStreakPresentation } from "@/lib/streak";

describe("streak presentation", () => {
  it("turns the shared operator snapshot into a truthful seven-day target", () => {
    expect(getStreakPresentation({ currentDays: 2, targetDays: 7 })).toEqual({
      completedNodes: 2,
      currentDays: 2,
      description: "One Daily Drill keeps your momentum going.",
      milestone: "5 days to 7-day target",
      remainingDays: 5,
      targetDays: 7,
      title: "2-day streak",
    });
  });

  it("uses singular copy and clamps negative progress", () => {
    expect(getStreakPresentation({ currentDays: 1, targetDays: 7 }).title).toBe(
      "1-day streak",
    );
    expect(
      getStreakPresentation({ currentDays: -4, targetDays: 7 }),
    ).toMatchObject({
      completedNodes: 0,
      currentDays: 0,
      remainingDays: 7,
      title: "Start your streak",
    });
  });

  it("never shows invalid or negative milestone progress", () => {
    expect(
      getStreakPresentation({ currentDays: Number.NaN, targetDays: 0 }),
    ).toMatchObject({
      completedNodes: 0,
      currentDays: 0,
      remainingDays: 7,
      targetDays: 7,
      title: "Start your streak",
    });
    expect(
      getStreakPresentation({ currentDays: 12, targetDays: 7 }),
    ).toMatchObject({
      completedNodes: 7,
      currentDays: 12,
      milestone: "7-day target reached",
      remainingDays: 0,
      title: "12-day streak",
    });
  });
});
