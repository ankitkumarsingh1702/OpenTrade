/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

interface TacticalToggleProps {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
  compact?: boolean;
}

export function TacticalToggle({
  checked,
  disabled = false,
  label,
  onChange,
  compact = false,
}: TacticalToggleProps) {
  return (
    <label
      className={`tactical-toggle${compact ? " tactical-toggle--compact" : ""}`}
    >
      <span className="sr-only">{label}</span>
      <input
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        role="switch"
        type="checkbox"
      />
      <span aria-hidden="true" className="tactical-toggle__track">
        <i />
      </span>
    </label>
  );
}
