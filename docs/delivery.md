# Automated delivery

## Branch model

- `main` is the protected, stable release history.
- `dev` is the protected integration and deployment branch.
- Work starts from current `dev` on a short-lived `feature/`, `fix/`, or `chore/` branch.
- Internal pull requests into `dev` are squash-merged only after all required checks pass. The merge controller then dispatches the deployment workflow for the exact current `dev` head.
- Dependency-bot pull requests run the same gates but stay open for explicit review.
- Direct pushes, force pushes, and branch deletion are blocked on `main` and `dev`.

## Validation and deployment

The pull-request workflow runs formatting, linting, type checking, unit tests, a high-severity production dependency audit, the production build, responsive browser tests, and Axe accessibility checks. Browser screenshots, traces, and the HTML report are retained as workflow artifacts.

A merge into `dev` authenticates to Google Cloud with a short-lived GitHub OIDC token. The identity provider accepts only this repository's `refs/heads/dev` subject; no service-account key is stored in GitHub.

The deployment workflow:

1. Re-runs the release gates.
2. Records the revision currently receiving 100 percent of traffic.
3. deploys the commit as a tagged, zero-traffic candidate revision.
4. checks all application routes and runs the desktop/mobile browser suite against the candidate URL.
5. promotes that exact revision to 100 percent.
6. checks the stable service URL.
7. restores the previous revision if the post-promotion check fails.

After the stable check passes, automation creates a temporary release branch from current `main`, merges the verified `dev` SHA into it, and opens the protected release pull request. This keeps the release head strictly up to date without merging release-only history back into `dev`. The required `Release verification` status is attached to the exact release-head SHA and links to its successful deployment run.

## Recovery

If a deployment fails before promotion, production traffic is unchanged. If the stable check fails after promotion, the workflow routes 100 percent back to the previously recorded revision and verifies the stable URL again. An operator can also recover explicitly with:

```bash
gcloud run services update-traffic opentrade \
  --project hushh-tech-prod \
  --region us-central1 \
  --to-revisions REVISION_NAME=100
```

Never commit or paste service-account keys, GitHub tokens, environment files, or generated `gha-creds-*.json` files.
