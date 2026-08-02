export const PREFERENCES_KEY = "opentrade:venator:v1";

export interface Preferences {
  darkMode: boolean;
  emailReminders: boolean;
}

export const defaultPreferences: Preferences = {
  darkMode: true,
  emailReminders: true,
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
      };
    }
  } catch {
    // Fall through to a safe, reference-matching default.
  }

  return defaultPreferences;
}
