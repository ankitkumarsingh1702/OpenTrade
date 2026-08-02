/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { BUILD_INFO, OPENTRADE_PROVENANCE } from "@/lib/provenance";

const repository = OPENTRADE_PROVENANCE.canonicalRepository;

const legalLinks = [
  { label: "Source", href: repository },
  { label: "Licence", href: `${repository}/blob/main/LICENSE` },
  { label: "Copyright", href: `${repository}/blob/main/COPYRIGHT.md` },
  { label: "Trademarks", href: `${repository}/blob/main/TRADEMARKS.md` },
] as const;

export function LegalFooter() {
  const buildLabel =
    BUILD_INFO.commit === "development"
      ? "local build"
      : `build ${BUILD_INFO.commit.slice(0, 7)}`;

  return (
    <footer
      aria-label="OpenTrade legal and build information"
      className="legal-footer"
      role="contentinfo"
    >
      <p>
        © 2026 OpenTrade. Source available under AGPL-3.0-or-later. OpenTrade
        names and visual identity are separately protected.
      </p>
      <nav aria-label="OpenTrade legal resources">
        {legalLinks.map((link) => (
          <a
            href={link.href}
            key={link.label}
            rel="noopener noreferrer"
            target="_blank"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <p className="legal-footer__build">
        v{BUILD_INFO.version} · {buildLabel} · {BUILD_INFO.buildDate}
      </p>
    </footer>
  );
}
