# OpenTrade Venator

A faithful, responsive Next.js implementation of the supplied OpenTrade Venator gaming-interface references.

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality gates

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run security
npm run test:e2e
npm run build
```

Pull requests into `dev` run every gate above, including desktop/mobile browser coverage and accessibility checks. Successful internal PRs are squash-merged automatically. Every `dev` merge is deployed to an isolated Cloud Run candidate revision, exercised through the public candidate URL, and promoted only after the smoke and browser suites pass. A verified `dev` revision is then proposed and merged into protected `main`.

See [Automated delivery](docs/delivery.md) for the branch, deployment, rollback, and recovery model.

The app is intentionally frontend-only. Competition, payments, authentication, trading, reminder delivery, and other external workflows are represented honestly as local demo interactions.

## Cloud Run

Live service: [https://opentrade-646258530541.us-central1.run.app](https://opentrade-646258530541.us-central1.run.app)

The production container listens on Cloud Run's port `8080`. Deploy it with the stable service name `opentrade` and its dedicated runtime identity:

```bash
gcloud run deploy opentrade \
  --source . \
  --project hushh-tech-prod \
  --region us-central1 \
  --service-account opentrade-frontend@hushh-tech-prod.iam.gserviceaccount.com \
  --allow-unauthenticated
```

Routine releases use GitHub's short-lived OIDC identity rather than a stored service-account key. The command above is retained for an authorized operator recovery only.
