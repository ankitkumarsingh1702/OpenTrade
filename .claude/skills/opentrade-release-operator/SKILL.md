---
name: opentrade-release-operator
description: Operate OpenTrade's protected GitHub and Cloud Run delivery workflow from scoped feature work through validated dev deployment and verified main synchronization. Use when working in the OpenTrade repository to push or publish changes, create or merge pull requests, configure or repair CI/CD, deploy to Cloud Run, verify live revisions, diagnose release failures, roll back traffic, or report GitHub and deployment status.
---

# OpenTrade Release Operator

Ship OpenTrade changes through the repository's protected delivery path and prove each release state independently.

## Establish scope and authority

1. Read [references/delivery-contract.md](references/delivery-contract.md) before any push, merge, deployment, rollback, or CI/CD change.
2. Confirm the repository root, `origin`, current branch, worktree status, and latest `origin/dev` and `origin/main` SHAs.
3. Treat a status, review, audit, or diagnosis request as read-only. Push, merge, deploy, or roll back only when the user authorizes that action. A request to push and report when the change is live authorizes the normal protected PR, automatic deployment, and automatic main-sync path; it does not authorize bypasses, manual production traffic changes, or protection edits.
4. Preserve unrelated and pre-existing changes. Use an isolated worktree based on current `origin/dev` when the active worktree is dirty, on an unrelated branch, or needed by the user. Before isolating, enumerate the intended paths and commits, transfer only that intended patch, then verify the branch diff plus intended untracked files. Never commit all dirty files wholesale.
5. Keep credentials out of commands, output, commits, PR text, and artifacts. Use the configured GitHub OIDC and Google Workload Identity Federation path; never create or store a service-account key.

## Choose the delivery path

- For a normal feature, fix, documentation, or maintenance change, create a short-lived `feature/`, `fix/`, `docs/`, or `chore/` branch from current `origin/dev`.
- For CI/CD repair, change only the smallest necessary workflow, script, or documentation files and use the same protected PR path.
- For status or release verification, do not modify files. Run `bash .agents/skills/opentrade-release-operator/scripts/audit-release-state.sh --require-live` from the repository root when GitHub and GCP access are available. Use `--smoke` only for a stable-route check, not as complete release proof.
- Never push directly to `dev` or `main`, force-push a protected branch, weaken protections, fabricate checks, or bypass the candidate verification sequence.

## Validate the change

Inspect the diff and run the gates proportional to the touched surface. Before publishing application or workflow changes, run the full local release suite:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run security
npm run build
npm run test:e2e
```

For changes to this skill, run `quick_validate.py` on both skill directories, `bash -n` on both audit scripts, `diff -r` between the Codex and Claude copies, and `npm run format:check`. For other skill- or documentation-only changes, validate their native format and scripts. Do not claim a gate passed unless its command completed successfully in the current worktree.

## Publish through protected GitHub branches

1. Stage only intended paths and review the staged diff.
2. Preserve the user's configured Git author identity. Do not add AI attribution or alter author metadata.
3. Commit with a scoped conventional message and push the short-lived branch.
4. Open a ready pull request into `dev`; do not use a draft when the request is to ship.
5. Monitor all required PR checks and the protected merge. Eligible internal user-authored PRs are queued automatically and merge only after the required checks pass; dependency-bot PRs remain open for explicit review.
6. If validation fails, inspect the failing job, reproduce it when practical, patch the same branch, rerun local checks, and let protections reevaluate it. Do not manually mark or describe a failed check as successful.

## Verify deployment and release

After the `dev` PR merges:

1. Record the merge SHA and verify it is the current `dev` head.
2. Enumerate and monitor every `Deploy dev` run for that exact SHA. The push and explicit-dispatch triggers must still produce one authoritative serving state; do not treat the first completion as sufficient if another matching run remains queued or active.
3. Require proof that release gates reran, a zero-traffic candidate was created, candidate smoke and browser tests passed, the exact candidate received 100 percent traffic, and stable-route smoke passed.
4. Verify Cloud Run independently: the ready revision, the revision receiving 100 percent traffic, the stable service URL, and the deployed SHA suffix must agree. Use the audit script's `--require-live` mode; a successful smoke alone is not release proof.
5. Monitor the explicitly dispatched `Sync verified dev to main` run and its protected release PR.
6. Verify the release PR merged and the deployed `dev` SHA is an ancestor of `main`.

If a failure occurs before promotion, confirm production traffic remained unchanged. If the stable check fails after promotion, confirm the workflow restored the previously recorded revision. Perform a manual rollback only with explicit authorization and verify the stable URL afterward.

## Report proof precisely

Keep these states distinct in every update:

- **Pushed:** branch exists on GitHub.
- **PR validated:** required checks passed.
- **Merged to dev:** protected PR merged; deployment may still be pending.
- **Deployed:** the exact candidate was promoted after candidate verification.
- **Live verified:** the stable URL passed smoke and Cloud Run shows the expected revision at 100 percent.
- **Synced to main:** the verified dev SHA is contained in protected `main`.

Report the branch, commit SHA, PR URL, workflow run URL and conclusion, Cloud Run revision and traffic, stable URL result, main-sync PR, and any remaining open or failing work. Never collapse these into a single unsupported claim such as “done” or “live.”
