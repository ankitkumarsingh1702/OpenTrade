/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

const canonicalSource = "https://github.com/ankitkumarsingh1702/OpenTrade";
const outputPath = join(process.cwd(), "src", "generated", "build-info.ts");
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

const args = process.argv.slice(2);
const check = args.includes("--check");
const shaIndex = args.indexOf("--sha");
const requestedSha =
  shaIndex >= 0 ? args.at(shaIndex + 1) : process.env.GITHUB_SHA;

const git = (...gitArgs) =>
  execFileSync("git", gitArgs, { encoding: "utf8" }).trim();

const commit = git("rev-parse", requestedSha || "HEAD");
if (!/^[0-9a-f]{40}$/.test(commit)) {
  throw new Error(`Unable to resolve a full Git commit SHA: ${commit}`);
}

const buildDate = git("show", "-s", "--format=%cI", commit);
const generated = `/*
 * Generated build provenance. Do not edit by hand.
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export interface BuildInfo {
  readonly version: string;
  readonly commit: string;
  readonly buildDate: string;
  readonly source: string;
}

export const BUILD_INFO: BuildInfo = {
  version: ${JSON.stringify(packageJson.version)},
  commit: ${JSON.stringify(commit)},
  buildDate: ${JSON.stringify(buildDate)},
  source: ${JSON.stringify(canonicalSource)},
} as const;
`;

if (check) {
  const current = readFileSync(outputPath, "utf8");
  if (current !== generated) {
    throw new Error(
      `Build provenance does not match ${commit}. Run npm run provenance:generate -- --sha ${commit}.`,
    );
  }
  console.log(`Build provenance matches ${commit}.`);
} else {
  writeFileSync(outputPath, generated);
  console.log(`Generated build provenance for ${commit}.`);
}
