# OpenTrade delivery contract

Use this reference as the current repository-specific release contract. Verify live GitHub and Google Cloud state before relying on values that can drift.

## Repository and runtime identity

| Item                              | Value                                                               |
| --------------------------------- | ------------------------------------------------------------------- |
| GitHub repository                 | `ankitkumarsingh1702/OpenTrade`                                     |
| Stable branch                     | `main`                                                              |
| Integration and deployment branch | `dev`                                                               |
| Google Cloud project              | `hushh-tech-prod`                                                   |
| Project number                    | `646258530541`                                                      |
| Cloud Run service                 | `opentrade`                                                         |
| Region                            | `us-central1`                                                       |
| Stable URL                        | `https://opentrade-646258530541.us-central1.run.app`                |
| Workload Identity pool            | `github-actions`                                                    |
| Workload Identity provider        | `opentrade`                                                         |
| Deployer service account          | `opentrade-github-deployer@hushh-tech-prod.iam.gserviceaccount.com` |
| Runtime service account           | `opentrade-frontend@hushh-tech-prod.iam.gserviceaccount.com`        |

The identity provider is restricted to this repository and `refs/heads/dev`. GitHub Actions must use its short-lived OIDC identity; no long-lived Google key belongs in GitHub or the repository.

## Protected GitHub workflow

Normal changes follow this sequence:

1. Branch from current `origin/dev`.
2. Open a ready PR into protected `dev`.
3. `.github/workflows/validate.yml` supplies the required checks:
   - `Code quality`
   - `Dependency audit`
   - `Production build`
   - `Responsive and accessibility E2E`
4. `.github/workflows/auto-merge.yml` queues eligible internal, user-authored PRs only. Required checks still gate the merge. Dependency-bot PRs remain explicit-review items.
5. `.github/workflows/deploy-dev.yml` supports a `dev` push and explicit dispatch. Merges performed by the controller's GitHub token do not recursively trigger another workflow, so the controller explicitly dispatches deployment for the exact current `dev` head. Always enumerate every run for the SHA and wait while any matching run remains queued or active.
6. Deployment authenticates through Workload Identity Federation, reruns release gates, deploys a tagged zero-traffic candidate, smokes and browser-tests it, promotes the exact revision to 100 percent, then smokes the stable URL.
7. Only a successful deployment explicitly dispatches `.github/workflows/sync-main.yml` with the verified SHA and deployment run URL.
8. Main sync creates a release branch from current `main`, merges the verified SHA, records the required `Release verification` status on the exact release head, and opens a protected PR to `main`.

Direct pushes, force pushes, and branch deletion are blocked on `dev` and `main`. Do not disable or weaken those protections to complete a release.

## Local and CI gates

The package scripts form the release gate set:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run security
npm run build
npm run test:e2e
```

`npm run security` checks high-severity production dependency findings. `npm run test:e2e` exercises responsive desktop and mobile flows plus accessibility checks. Use `npm run smoke -- URL` to verify application routes against a candidate or stable URL.

## Evidence queries

Use authenticated commands without printing tokens or credentials:

```bash
gh pr checks PR_NUMBER --repo ankitkumarsingh1702/OpenTrade
gh run list --repo ankitkumarsingh1702/OpenTrade --workflow deploy-dev.yml --limit 5
gh run list --repo ankitkumarsingh1702/OpenTrade --workflow sync-main.yml --limit 5
gcloud run services describe opentrade --project hushh-tech-prod --region us-central1 --format=json
```

The bundled audit script collects the same state consistently:

```bash
bash .agents/skills/opentrade-release-operator/scripts/audit-release-state.sh --require-live
```

Run it without an option for an informational audit. Use `--smoke` only to check the configured stable URL rather than treating Cloud Run's generated service URL as the public release URL. Use `--require-live` to smoke the stable URL and exit non-zero unless the exact `dev` SHA has a successful deployment, its revision is ready and receives 100 percent of traffic, and `main` contains that SHA. The script is intentionally read-only with respect to GitHub, Cloud Run, and application traffic.

## Failure and rollback rules

- A failed pre-promotion candidate leaves the serving revision unchanged.
- A failed stable check after promotion triggers the workflow's rollback step to the previously recorded 100-percent revision, followed by a stable smoke check.
- A manual rollback changes production traffic and therefore requires explicit user authorization. Resolve the exact target revision before executing it:

```bash
gcloud run services update-traffic opentrade \
  --project hushh-tech-prod \
  --region us-central1 \
  --to-revisions REVISION_NAME=100
npm run smoke -- https://opentrade-646258530541.us-central1.run.app
```

Retain failed workflow and browser evidence. Repair failures through a new or existing scoped PR rather than editing protected branches directly.
