/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@fontsource-variable/anybody";
import "@fontsource/lexend/400.css";
import "@fontsource/lexend/600.css";
import "@fontsource/lexend/700.css";
import "material-symbols/outlined.css";
import "./globals.css";

import { OPENTRADE_PROVENANCE } from "@/lib/provenance";

export const metadata: Metadata = {
  metadataBase: new URL("https://opentrade-646258530541.us-central1.run.app"),
  applicationName: "OpenTrade",
  title: {
    default: "OpenTrade — Elite Simulator",
    template: "%s — OpenTrade",
  },
  description: "The OpenTrade Venator tactical trading simulator interface.",
  creator: "Ankit Kumar Singh",
  publisher: "OpenTrade",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ type: "image/svg+xml", url: "/favicon.svg" }],
  },
  manifest: "/manifest.webmanifest",
  other: {
    "application-origin": `OpenTrade canonical source: ${OPENTRADE_PROVENANCE.canonicalRepository}`,
    "opentrade-origin-id": OPENTRADE_PROVENANCE.originId,
    "source-code": OPENTRADE_PROVENANCE.canonicalRepository,
    "software-license": OPENTRADE_PROVENANCE.license,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body>{children}</body>
    </html>
  );
}
