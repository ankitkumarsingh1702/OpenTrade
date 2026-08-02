# OpenTrade Venator

A faithful, responsive Next.js implementation of the supplied OpenTrade Venator gaming-interface references.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality gates

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

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
