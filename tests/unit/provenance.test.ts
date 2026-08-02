/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { BUILD_INFO, OPENTRADE_PROVENANCE } from "@/lib/provenance";

describe("OpenTrade provenance", () => {
  it("publishes stable canonical identifiers without telemetry", () => {
    expect(OPENTRADE_PROVENANCE).toEqual({
      project: "OpenTrade",
      canonicalRepository: "https://github.com/ankitkumarsingh1702/OpenTrade",
      originId: "OPENTRADE-CANONICAL-ANKIT-2026",
      license: "AGPL-3.0-or-later",
      copyright: "Copyright © 2026 Ankit Kumar Singh",
    });
    expect(BUILD_INFO.source).toBe(OPENTRADE_PROVENANCE.canonicalRepository);
    expect(BUILD_INFO.version).toBe("1.0.0");
  });

  it("keeps required legal files and the complete standard licence", () => {
    const licence = readFileSync("LICENSE", "utf8");
    expect(licence).toContain("GNU AFFERO GENERAL PUBLIC LICENSE");
    expect(licence).toContain("Version 3, 19 November 2007");
    expect(licence.split("\n").length).toBeGreaterThan(650);

    for (const file of [
      "COPYRIGHT.md",
      "NOTICE",
      "ATTRIBUTION.md",
      "TRADEMARKS.md",
      "COMMERCIAL-LICENSE.md",
      "THIRD_PARTY_NOTICES.md",
      "CITATION.cff",
    ]) {
      expect(readFileSync(file, "utf8").length, file).toBeGreaterThan(100);
    }
  });
});
