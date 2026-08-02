/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { execFileSync } from "node:child_process";
import process from "node:process";

const [base, head = "HEAD"] = process.argv.slice(2);
if (!base) {
  throw new Error("Usage: node scripts/check-dco.mjs BASE_SHA [HEAD_SHA]");
}

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const commits = git("rev-list", "--reverse", `${base}..${head}`)
  .split("\n")
  .filter(Boolean);

if (commits.length === 0) {
  throw new Error(`No commits found in ${base}..${head}.`);
}

const failures = [];
for (const commit of commits) {
  const authorEmail = git("show", "-s", "--format=%ae", commit);
  const authorName = git("show", "-s", "--format=%an", commit);
  const message = git("show", "-s", "--format=%B", commit);
  const trustedBot =
    authorName === "dependabot[bot]" || authorName === "github-actions[bot]";

  if (!trustedBot && !/^Signed-off-by: .+ <[^<>]+>$/im.test(message)) {
    failures.push(`${commit.slice(0, 12)} ${authorName} <${authorEmail}>`);
  }
}

if (failures.length > 0) {
  throw new Error(
    `Missing Developer Certificate of Origin sign-off:\n${failures.join("\n")}`,
  );
}

console.log(`DCO sign-off verified for ${commits.length} commit(s).`);
