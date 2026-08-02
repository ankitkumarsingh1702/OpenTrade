/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export function isValidEmail(value: string): boolean {
  const normalized = value.trim();

  if (normalized.length > 254 || normalized.length === 0) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(normalized);
}
