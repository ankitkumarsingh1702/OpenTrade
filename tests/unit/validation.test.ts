import { describe, expect, it } from "vitest";

import { commandCenterResources, drills, rankings } from "@/data/venator";
import { defaultPreferences, parsePreferences } from "@/lib/preferences";
import { isValidEmail } from "@/lib/validation";

describe("campus email validation", () => {
  it.each(["student@unimelb.edu.au", "operator+campus@iitm.ac.in"])("accepts %s", (value) => {
    expect(isValidEmail(value)).toBe(true);
  });

  it.each(["", "student", "student@campus", "student campus@example.com"])("rejects %s", (value) => {
    expect(isValidEmail(value)).toBe(false);
  });
});

describe("preference storage safety", () => {
  it("restores a valid snapshot", () => {
    expect(parsePreferences('{"darkMode":false,"emailReminders":false}')).toEqual({
      darkMode: false,
      emailReminders: false,
    });
  });

  it("falls back for malformed or incomplete data", () => {
    expect(parsePreferences("not json")).toEqual(defaultPreferences);
    expect(parsePreferences('{"darkMode":true}')).toEqual(defaultPreferences);
  });
});

describe("reference fixture invariants", () => {
  it("keeps all supplied drills and campus rows", () => {
    expect(drills.map((drill) => drill.title)).toEqual(["Higher / Lower", "Runway", "News", "Tickerdle"]);
    expect(rankings).toHaveLength(9);
    expect(rankings.at(-1)?.name).toBe("University of New South Wales");
  });

  it("keeps the approved Command Center resource contract exact and safe", () => {
    expect(commandCenterResources.markets).toEqual([
      { label: "US", flag: "🇺🇸", href: "https://www.opentrade.live/?market=us" },
      { label: "India", flag: "🇮🇳", href: "https://www.opentrade.live/?market=india" },
    ]);
    expect(commandCenterResources.discord.href).toBe("https://discord.gg/bt2YuTNcbK");
    expect(commandCenterResources.disclosure).toBe(
      "OpenTrade is a product preview, not investment advice. Investing involves risk, including possible loss of principal.",
    );
    expect(commandCenterResources.legal.href).toBe("https://www.opentrade.live/legal");

    const destinations = [
      ...commandCenterResources.markets.map((market) => market.href),
      commandCenterResources.discord.href,
      commandCenterResources.legal.href,
    ];

    expect(destinations.every((destination) => new URL(destination).protocol === "https:")).toBe(true);
    expect(new URL(commandCenterResources.discord.href).hostname).toBe("discord.gg");
  });
});
