/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { homeResources } from "@/data/venator";

export function HomeResourceLinks() {
  return (
    <footer className="home-resources">
      <nav aria-label="OpenTrade resources">
        {homeResources.map((resource) => (
          <a href={resource.href} key={resource.label}>
            {resource.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
