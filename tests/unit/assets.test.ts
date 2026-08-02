/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const flags = ["us.svg", "india.svg"];

describe("local flag assets", () => {
  it.each(flags)("keeps %s deterministic and passive", (filename) => {
    const source = readFileSync(
      join(process.cwd(), "public", "assets", "flags", filename),
      "utf8",
    );

    expect(source).toMatch(/<svg[^>]+viewBox=/);
    expect(source).not.toMatch(/<script|<foreignObject|<image/i);
    expect(source).not.toMatch(/\son[a-z]+\s*=/i);
    expect(source).not.toMatch(/href=["']https?:|url\(\s*["']?https?:/i);
  });
});

describe("OpenTrade identity asset", () => {
  it("vendors the canonical passive SVG and removes competing browser icons", () => {
    const source = readFileSync(
      join(process.cwd(), "public", "favicon.svg"),
      "utf8",
    );

    expect(createHash("sha256").update(source).digest("hex")).toBe(
      "920750a9116314f7635ca028078b8e103e369d12d3f1e2fc1d098f7a192ca616",
    );
    expect(source).toMatch(/<svg[^>]+viewBox="0 0 1024 1024"/);
    expect(source).toContain('aria-label="OpenTrade dog logo"');
    expect(source).toContain('fill="#000000"');
    expect(source).not.toMatch(/<script|<foreignObject|<image/i);
    expect(source).not.toMatch(/\son[a-z]+\s*=/i);
    expect(source).not.toMatch(/href=["']https?:|url\(\s*["']?https?:/i);
    expect(existsSync(join(process.cwd(), "src", "app", "icon.png"))).toBe(
      false,
    );
    expect(existsSync(join(process.cwd(), "src", "app", "favicon.ico"))).toBe(
      false,
    );
  });

  it("uses the canonical SVG in the shared shell instead of the checkerboard JPEG", () => {
    const component = readFileSync(
      join(
        process.cwd(),
        "src",
        "components",
        "venator",
        "shell",
        "primary-sidebar.tsx",
      ),
      "utf8",
    );

    expect(component).toContain('src="/favicon.svg"');
    expect(component).not.toContain("opentrade-tactical-logo.jpg");
  });
});
