"use client";

import { useEffect, useState } from "react";

import { TacticalToggle } from "@/components/venator/profile/tactical-toggle";
import { defaultPreferences, parsePreferences, PREFERENCES_KEY } from "@/lib/preferences";

export function PreferencesPanel() {
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setPreferences(parsePreferences(window.localStorage.getItem(PREFERENCES_KEY)));
      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
    }
  }, [hydrated, preferences]);

  return (
    <>
      <section id="appearance">
        <h2 className="profile-section-title">
          <span aria-hidden="true" />
          Appearance
        </h2>
        <div className="hud-panel clip-notch-br appearance-panel">
          <span>Light</span>
          <TacticalToggle
            checked={preferences.darkMode}
            label="Use dark appearance"
            onChange={(darkMode) => setPreferences((current) => ({ ...current, darkMode }))}
          />
          <span className={preferences.darkMode ? "is-active" : ""}>Dark</span>
        </div>
      </section>

      <section>
        <h2 className="profile-section-title profile-section-title--tight">
          <span aria-hidden="true" />
          Daily Reminders
        </h2>
        <p className="profile-section-description">Gary checks in twice a day to deliver your streak supplies.</p>
        <div className="reminder-list">
          <div className="hud-panel clip-notch-br reminder-row">
            <span>Email</span>
            <TacticalToggle
              checked={preferences.emailReminders}
              compact
              label="Email reminders"
              onChange={(emailReminders) => setPreferences((current) => ({ ...current, emailReminders }))}
            />
          </div>
          <div className="hud-panel clip-notch-br reminder-row">
            <div>
              <span>Text</span>
              <strong>Verification Required</strong>
            </div>
            <TacticalToggle checked={false} compact disabled label="Text reminders require verification" />
          </div>
        </div>
      </section>
    </>
  );
}
