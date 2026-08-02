import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@fontsource-variable/anybody";
import "@fontsource/lexend/400.css";
import "@fontsource/lexend/600.css";
import "@fontsource/lexend/700.css";
import "material-symbols/outlined.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OpenTrade — Elite Simulator",
    template: "%s — OpenTrade",
  },
  description: "The OpenTrade Venator tactical trading simulator interface.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body>{children}</body>
    </html>
  );
}
