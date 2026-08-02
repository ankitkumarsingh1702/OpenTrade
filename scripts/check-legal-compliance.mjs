/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createHash } from "node:crypto";
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { extname, join, relative } from "node:path";
import process from "node:process";

const canonical = "https://github.com/ankitkumarsingh1702/OpenTrade";
const spdx = "SPDX-License-Identifier: AGPL-3.0-or-later";
const copyright = "Copyright © 2026 Ankit Kumar Singh";
const expectedLicenseHash =
  "0d96a4ff68ad6d4b6f1f30f713b18d5184912ba8dd389f86aa7710db079abcb0";
const expectedThirdPartyLicenseHashes = {
  "third_party_licenses/ANYBODY-OFL.txt":
    "fbf4989c530207d87121e7df169c403eaf51ecf70c35a6c4f9c586379b1c8d35",
  "third_party_licenses/LEXEND-OFL.txt":
    "cdfed8f91b0660b004befb744757918b7c7d40dc2201b6c6d0a86b2fab9408f8",
  "third_party_licenses/MATERIAL-SYMBOLS-APACHE-2.0.txt":
    "cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30",
  "third_party_licenses/NEXT.md":
    "ee765244e2d59f5234d474f62e0766fa0c8b99af967fdd4c0cb8dcb0c76ea224",
  "third_party_licenses/REACT.txt":
    "da6d3703ed11cbe42bd212c725957c98da23cbff1998c05fa4b3d976d1a58e93",
};
const fixHeaders = process.argv.includes("--fix-headers");
const failures = [];

const requiredFiles = [
  "LICENSE",
  "COPYRIGHT.md",
  "NOTICE",
  "ATTRIBUTION.md",
  "TRADEMARKS.md",
  "COMMERCIAL-LICENSE.md",
  "THIRD_PARTY_NOTICES.md",
  "CITATION.cff",
  "CONTRIBUTING.md",
  "DCO",
];

for (const file of requiredFiles) {
  if (!existsSync(file)) failures.push(`Missing required file: ${file}`);
}

const licenseHash = createHash("sha256")
  .update(readFileSync("LICENSE"))
  .digest("hex");
if (licenseHash !== expectedLicenseHash) {
  failures.push("LICENSE is not the expected unmodified GNU AGPLv3 text.");
}

for (const [file, expectedHash] of Object.entries(
  expectedThirdPartyLicenseHashes,
)) {
  if (!existsSync(file)) {
    failures.push(`Missing exact third-party licence: ${file}`);
    continue;
  }
  const actualHash = createHash("sha256")
    .update(readFileSync(file))
    .digest("hex");
  if (actualHash !== expectedHash) {
    failures.push(
      `Third-party licence has drifted from package metadata: ${file}`,
    );
  }
}

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const packageExpectations = {
  license: "AGPL-3.0-or-later",
  private: true,
  "repository.url": "git+https://github.com/ankitkumarsingh1702/OpenTrade.git",
  homepage: `${canonical}#readme`,
};
if (packageJson.license !== packageExpectations.license) {
  failures.push("package.json licence metadata is incorrect.");
}
if (packageJson.private !== packageExpectations.private) {
  failures.push("The application package must remain private.");
}
if (packageJson.repository?.url !== packageExpectations["repository.url"]) {
  failures.push("package.json canonical repository metadata is incorrect.");
}
if (packageJson.homepage !== packageExpectations.homepage) {
  failures.push("package.json homepage metadata is incorrect.");
}

const citation = readFileSync("CITATION.cff", "utf8");
const citationLines = new Set(
  citation.split(/\r?\n/u).map((line) => line.trim()),
);
for (const required of [
  "cff-version: 1.2.0",
  "title: OpenTrade Venator",
  "- family-names: Singh",
  "given-names: Ankit Kumar",
  "version: 1.0.0",
  "date-released: 2026-08-02",
  `repository-code: ${canonical}`,
  "license: AGPL-3.0-or-later",
]) {
  if (!citationLines.has(required)) {
    failures.push(`CITATION.cff is missing: ${required}`);
  }
}

const canonicalLines = {
  "ATTRIBUTION.md": `> Canonical source: <${canonical}>`,
  "CITATION.cff": `repository-code: ${canonical}`,
  "COPYRIGHT.md": `<${canonical}>`,
  NOTICE: canonical,
  "README.md": `<${canonical}>`,
};
for (const [file, expectedLine] of Object.entries(canonicalLines)) {
  const source = readFileSync(file, "utf8");
  const lines = new Set(source.split(/\r?\n/u).map((line) => line.trim()));
  if (!lines.has(expectedLine)) {
    failures.push(`${file} is missing the canonical repository.`);
  }
}

const notice = readFileSync("THIRD_PARTY_NOTICES.md", "utf8");
const dependencyNoticeNames = {
  "@fontsource-variable/anybody": "Anybody Variable font",
  "@fontsource/lexend": "Lexend font",
  "material-symbols": "Material Symbols package",
  next: "Next.js",
  react: "React and React DOM",
  "react-dom": "React and React DOM",
};
for (const dependency of Object.keys(packageJson.dependencies)) {
  if (!notice.includes(dependencyNoticeNames[dependency])) {
    failures.push(`THIRD_PARTY_NOTICES.md does not cover ${dependency}.`);
  }
}

if (existsSync("public/assets/opentrade-tactical-logo.jpg")) {
  failures.push(
    "Unused opaque tactical logo remains in the distributable tree.",
  );
}

const sourceExtensions = new Set([".ts", ".tsx", ".mjs", ".css"]);
const candidates = [];
const walk = (directory) => {
  if (!existsSync(directory)) return;
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (sourceExtensions.has(extname(path))) candidates.push(path);
  }
};

for (const root of ["src", "tests", "scripts", ".github/scripts"]) walk(root);
for (const file of [
  "eslint.config.mjs",
  "next.config.ts",
  "playwright.config.ts",
  "vitest.config.ts",
]) {
  if (existsSync(file)) candidates.push(file);
}

const commentHeader = `/*\n * ${copyright}\n * ${spdx}\n */\n\n`;
for (const file of [...new Set(candidates)].sort()) {
  const source = readFileSync(file, "utf8");
  if (source.includes(copyright) && source.includes(spdx)) continue;
  if (fixHeaders) writeFileSync(file, `${commentHeader}${source}`);
  else failures.push(`Missing copyright/SPDX header: ${relative(".", file)}`);
}

const dockerfile = readFileSync("Dockerfile", "utf8");
if (!dockerfile.includes(copyright) || !dockerfile.includes(spdx)) {
  if (fixHeaders) {
    writeFileSync("Dockerfile", `# ${copyright}\n# ${spdx}\n\n${dockerfile}`);
  } else {
    failures.push("Missing copyright/SPDX header: Dockerfile");
  }
}
if (!dockerfile.includes("THIRD_PARTY_NOTICES.md ./legal/")) {
  failures.push(
    "Production container does not retain the legal notice bundle.",
  );
}
if (
  !dockerfile.includes(
    "/app/third_party_licenses ./legal/third_party_licenses/",
  )
) {
  failures.push(
    "Production container does not retain exact third-party licences.",
  );
}

if (fixHeaders) {
  console.log("Applied legal headers to eligible first-party source files.");
} else if (failures.length > 0) {
  throw new Error(failures.join("\n"));
} else {
  console.log(`Legal compliance passed for ${candidates.length} source files.`);
}
