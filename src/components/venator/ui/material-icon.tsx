/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { MaterialIconName } from "@/types/venator";

interface MaterialIconProps {
  name: MaterialIconName;
  filled?: boolean;
  className?: string;
}

export function MaterialIcon({
  name,
  filled = false,
  className = "",
}: MaterialIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${className}`}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  );
}
