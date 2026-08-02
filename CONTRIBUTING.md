# Contributing to OpenTrade

Contributions must preserve the frontend-only scope, existing behaviour, protected delivery path, legal notices, and third-party rights.

## Contribution authority

By submitting a contribution, you confirm that:

- you created it or are authorised to submit it;
- it contains no undisclosed third-party source, confidential employer material, or restricted asset;
- it is provided under the repository's applicable community licence;
- relevant licence, copyright, and attribution notices are preserved;
- generated, commissioned, externally sourced, or reference-derived code and assets are disclosed with their source and permission; and
- your contribution satisfies the [Developer Certificate of Origin](DCO).

Sign every commit using Git's sign-off trailer:

```bash
git commit --signoff
```

The sign-off records contribution authority; it is not an authorship credit for tools. Do not add an AI system as author, co-author, contributor, copyright owner, or licence owner.

## Third-party and visual material

Before adding a package, font, icon, image, illustration, audio, video, dataset, or design export, include:

- copyright owner;
- original source URL or contract reference;
- exact licence or written permission;
- modification and redistribution rights;
- required notices; and
- whether the material is bundled or fetched dynamically.

Do not copy material merely because it is publicly visible. Files with unclear provenance must not be represented as first-party or silently placed under the root licence.

## Delivery

Create a short-lived branch from current `dev`, open a ready pull request into `dev`, and allow all required checks to complete. Do not push directly to `dev` or `main`. See [docs/delivery.md](docs/delivery.md).

Future commercial relicensing of an external contribution requires a separate contributor agreement. DCO sign-off alone does not grant that right.
