# OpenTrade ownership and provenance audit

Audit date: 2026-08-02

Canonical repository: <https://github.com/ankitkumarsingh1702/OpenTrade>

This is a repository evidence report, not a legal opinion.

## Copyright-owner determination

Git history, the GitHub contributors API, repository ownership, and collaborator settings identify **Ankit Kumar Singh** as the repository owner, sole human contributor, and author of the first-party implementation. GitHub Actions bot commits only integrate already-authored release history. The open Dependabot contribution has not been merged.

On that evidence, Ankit Kumar Singh can license the original first-party code and documentation recorded in this repository. Employer, contractor, company, design-agency, and upstream asset agreements were not present in the repository and must be retained separately if they exist.

## Material classification

| Material                                                                   | Classification                                                                        | Evidence and treatment                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/**`, first-party tests, scripts, workflows, and project documentation | First-party source and documentation                                                  | Authored in the repository by Ankit Kumar Singh; licensed under `AGPL-3.0-or-later` except generated files or files carrying a different notice.                                                                                                |
| Generated release/build metadata                                           | Generated                                                                             | Produced deterministically from package version, commit SHA, and commit date; not an independent ownership claim.                                                                                                                               |
| npm dependencies                                                           | Third-party                                                                           | Exact versions are locked. Runtime and principal tooling licences are recorded in `THIRD_PARTY_NOTICES.md`; the release workflow produces an SPDX SBOM for the complete dependency graph.                                                       |
| Anybody and Lexend fonts                                                   | Third-party, redistributable                                                          | Self-hosted from Fontsource under SIL Open Font License 1.1.                                                                                                                                                                                    |
| Material Symbols                                                           | Third-party, redistributable                                                          | Bundled under Apache License 2.0.                                                                                                                                                                                                               |
| India and US SVG flags                                                     | First-party SVG implementation of public flag geometry                                | No scripts, remote references, or copied attribution were found; national-symbol rules remain separate.                                                                                                                                         |
| Official OpenTrade dog SVG                                                 | Brand asset                                                                           | Repository record says it is a byte-for-byte copy from the official OpenTrade domain. Software licensing does not grant use as another product's brand.                                                                                         |
| Arena and locked-mode JPEGs                                                | User-supplied/reference-derived visual material with unresolved underlying provenance | The adding commits and hashes are known, but repository evidence does not identify the illustrator, source contract, or redistribution licence. They are explicitly excluded from the first-party ownership claim pending written confirmation. |
| Obsolete checkerboard tactical-logo JPEG                                   | Unused opaque visual asset                                                            | Removed from the distributable tree; preserved in Git history for evidence.                                                                                                                                                                     |

No audio/video files, datasets, design-source files, or authentication/trading backend code are bundled. Interaction audio is synthesized at runtime from first-party code and contains no sample asset.

## Licence decision

The root licence is the complete, unmodified GNU Affero General Public License version 3. First-party source notices select version 3 or any later version using SPDX identifier `AGPL-3.0-or-later`.

The dependency licences found in the runtime and development graph do not prevent licensing the original first-party source under AGPL. Third-party materials remain under their own terms. Brand rights are separated in `TRADEMARKS.md`, and optional commercial terms are limited to rights the owner actually controls.

## Unresolved evidence

Before asserting ownership of or granting broader rights in the two used JPEG illustrations, preserve written confirmation of:

- the creator and commissioning party;
- assignment or licence terms;
- modification and public redistribution rights;
- whether model or stock-asset restrictions apply; and
- original source files and creation timestamps.

Until then, do not describe those images as AGPL-licensed first-party artwork. This limitation does not invalidate licensing of independently authored source code.
