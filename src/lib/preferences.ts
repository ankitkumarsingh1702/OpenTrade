/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export const PREFERENCES_KEY = "opentrade:venator:v1";

export interface Preferences {
  darkMode: boolean;
  emailReminders: boolean;
  soundEffects: boolean;
}

export const defaultPreferences: Preferences = {
  darkMode: true,
  emailReminders: true,
  soundEffects: true,
};

export function parsePreferences(value: string | null): Preferences {
  if (!value) {
    return defaultPreferences;
  }

  try {
    const parsed: unknown = JSON.parse(value);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "darkMode" in parsed &&
      "emailReminders" in parsed &&
      typeof parsed.darkMode === "boolean" &&
      typeof parsed.emailReminders === "boolean"
    ) {
      return {
        darkMode: parsed.darkMode,
        emailReminders: parsed.emailReminders,
        soundEffects:
          "soundEffects" in parsed && typeof parsed.soundEffects === "boolean"
            ? parsed.soundEffects
            : defaultPreferences.soundEffects,
      };
    }
  } catch {
    // Fall through to a safe, reference-matching default.
  }

  return defaultPreferences;
}
