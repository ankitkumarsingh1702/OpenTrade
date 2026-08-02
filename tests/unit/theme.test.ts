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
});
