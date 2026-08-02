# Build and release provenance

OpenTrade records public, non-sensitive provenance; it does not use provenance as copy protection or telemetry.

## Frontend build information

`scripts/generate-build-info.mjs` deterministically derives:

- package version from `package.json`;
- full commit SHA from the requested Git revision;
- build date from that commit's recorded Git date; and
- canonical source repository.

Pull-request and deployment workflows generate and verify the module before the production build. The deployed legal footer exposes the version, short commit SHA, commit date, and canonical source. No secret or user data is included.

## Reproducing a build

Use Node.js 22 and the lockfile:

```bash
npm ci
npm run provenance:generate -- --sha COMMIT_SHA
npm run provenance:check -- --sha COMMIT_SHA
npm run build
```

Container output can still contain platform-specific metadata from the base image and Cloud Build. Reproducibility therefore means deterministic application inputs, not a claim that every container layer is byte-identical across builders.

## Releases

Semantic release tags trigger a workflow that:

1. verifies that the tag commit is contained in protected `main`;
2. runs compliance, quality, security, and production-build gates;
3. creates a source/runtime archive;
4. generates an SPDX dependency SBOM;
5. records SHA-256 checksums;
6. creates GitHub artifact attestations; and
7. publishes the archive, SBOM, checksums, licence, copyright, canonical source, date, and commit SHA in a GitHub Release.

The current local environment has no configured signing key, so the release process must not claim a cryptographically signed Git tag. GitHub artifact attestations and protected-branch provenance provide separate verifiable evidence. Configure a human-controlled signing key before making signed-tag claims.
