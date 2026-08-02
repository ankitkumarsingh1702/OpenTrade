/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { MetadataRoute } from "next";

import { OPENTRADE_PROVENANCE } from "@/lib/provenance";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OpenTrade Venator",
    short_name: "OpenTrade",
    description: "The OpenTrade Venator tactical trading simulator frontend.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#212850",
    categories: ["finance", "games", "education"],
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    id: OPENTRADE_PROVENANCE.originId,
  };
}
