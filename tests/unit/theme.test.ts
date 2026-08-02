/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const themeCss = readFileSync(
  new URL("../../src/app/globals.css", import.meta.url),
  "utf8",
);

describe("OpenTrade brand palette", () => {
  it("keeps the approved Outer Space and Perfect White tokens exact", () => {
    expect(themeCss).toMatch(/--accent:\s*#212850;/i);
    expect(themeCss).toMatch(/--accent-rgb:\s*33 40 80;/i);
    expect(themeCss).toMatch(/--accent-soft:\s*#ffffff;/i);
    expect(themeCss).toMatch(/--accent-soft-rgb:\s*255 255 255;/i);
    expect(themeCss).toMatch(/--accent-foreground:\s*#ffffff;/i);
  });

  it("does not reintroduce the retired pink theme values", () => {
    expect(themeCss).not.toMatch(
      /#ea4c89|#ffb1c6|rgba\(\s*234\s*,\s*76\s*,\s*137/i,
    );
  });

  it("keeps Home free of retired game accents and decorative motion", () => {
    expect(themeCss).not.toMatch(/#536dfe|#2aa7c6/i);
    expect(themeCss).not.toMatch(
      /streak-node-pulse|arena-card-scan|arena-card-reveal/i,
    );
    expect(themeCss).not.toMatch(/\.page--home\s+\.home-play-card::after/i);
    expect(themeCss).toMatch(
      /\.page--home\s+\.home-play-card\s*{[\s\S]*?--game-accent:\s*var\(--accent\)/i,
    );
  });

  it("keeps the Command Center flat and free of decorative HUD effects", () => {
    expect(themeCss).not.toMatch(
      /\.operator-stats__row--active\s*\{[^}]*background(?:-color)?:\s*var\(--accent\)/i,
    );
    expect(themeCss).not.toMatch(
      /\.command-center__utilities\s*\{[^}]*margin-top:\s*auto/i,
    );
    expect(themeCss).not.toMatch(
      /\.command-center__flag-frame\s*\{[^}]*(?:box-shadow|transform|border:)/i,
    );
    expect(themeCss).not.toMatch(
      /\.command-center__market-link:(?:hover|focus-visible)\s+\.command-center__flag-frame/i,
    );
  });

  it("keeps Compete and Profile in the restrained tactical system", () => {
    expect(themeCss).toMatch(
      /\.page--compete\s+\.competition-brief[\s\S]*?border:\s*1px solid var\(--border-strong\);[\s\S]*?box-shadow:\s*none;/i,
    );
    expect(themeCss).toMatch(
      /\.page--compete\s+\.ranking-row--top\s+\.ranking-row__interest\s*\{[\s\S]*?background:\s*transparent;[\s\S]*?border:\s*0;/i,
    );
    expect(themeCss).toMatch(
      /\.page--profile::before\s*\{\s*content:\s*none;/i,
    );
    expect(themeCss).toMatch(
      /\.page--profile\s+\.hud-panel\s*\{[\s\S]*?background:\s*var\(--surface-card\);[\s\S]*?box-shadow:\s*none;/i,
    );
    expect(themeCss).toMatch(
      /\.page--profile\s+\.hud-panel::after\s*\{\s*content:\s*none;/i,
    );
    expect(themeCss).toMatch(
      /\.page--profile\s+\.milestone-card:hover\s*\{[\s\S]*?box-shadow:\s*none;[\s\S]*?transform:\s*none;/i,
    );
    expect(themeCss).not.toMatch(
      /\.page--profile::before\s*\{[^}]*radial-gradient/i,
    );
    expect(themeCss).not.toMatch(
      /\.page--profile\s+\.hud-panel\s*\{[^}]*linear-gradient/i,
    );
    expect(themeCss).not.toMatch(
      /\.page--(?:compete|profile)[^{]*\{[^}]*(?:text-shadow:\s*0|box-shadow:\s*(?:0|inset|4px)|border-left:\s*4px)/i,
    );
  });
});
