import { readFileSync } from "node:fs";
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
