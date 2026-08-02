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

## Copyright, Licence, and Attribution

[![Licence: AGPL v3 or later](https://img.shields.io/badge/Licence-AGPL_v3_or_later-212850.svg)](LICENSE)

Copyright © 2026 Ankit Kumar Singh. Original first-party source code and documentation are available under [GNU AGPL v3 or later](LICENSE). See the [copyright statement](COPYRIGHT.md), [project notice](NOTICE), [attribution guide](ATTRIBUTION.md), [trademark policy](TRADEMARKS.md), [commercial-licensing information](COMMERCIAL-LICENSE.md), [third-party notices](THIRD_PARTY_NOTICES.md), and [citation metadata](CITATION.cff).

Public repository visibility does not place this work in the public domain. Use, modification, hosting, and redistribution are governed by the repository licence and applicable third-party notices.

The canonical and officially maintained version of OpenTrade is:

<https://github.com/ankitkumarsingh1702/OpenTrade>

Commercial and branding enquiries can be directed to the [repository owner](https://github.com/ankitkumarsingh1702) or opened as a [licensing enquiry](https://github.com/ankitkumarsingh1702/OpenTrade/issues/new). Do not include confidential information in a public issue.

Aggregate usage monitoring is documented in [Usage intelligence](docs/usage-intelligence.md). It contains no hidden frontend telemetry and cannot identify every clone, ZIP download, private copy, or off-platform deployment.
