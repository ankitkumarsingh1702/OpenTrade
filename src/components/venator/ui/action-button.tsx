/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

"use client";

import { useId, useRef } from "react";

import { MaterialIcon } from "@/components/venator/ui/material-icon";
import type { MaterialIconName } from "@/types/venator";

interface ActionButtonProps {
  label: string;
  icon?: MaterialIconName;
  variant?: "primary" | "secondary" | "outline" | "text";
  className?: string;
  notice?: string;
  eyebrow?: string;
}

export function ActionButton({
  label,
  icon,
  variant = "primary",
  className = "",
  notice = "This external workflow is not connected in the local Venator preview.",
  eyebrow = "Local preview",
}: ActionButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  return (
    <>
      <button
        className={`tactical-button tactical-button--${variant} ${className}`}
        onClick={() => dialogRef.current?.showModal()}
        type="button"
      >
        {icon ? <MaterialIcon name={icon} /> : null}
        {label}
      </button>
      <dialog
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        className="action-dialog clip-notch-both"
        ref={dialogRef}
      >
        <div className="action-dialog__eyebrow">{eyebrow}</div>
        <h2 id={titleId}>{label}</h2>
        <p id={descriptionId}>{notice}</p>
        <button
          className="tactical-button tactical-button--primary"
          onClick={() => dialogRef.current?.close()}
          type="button"
        >
          Close
        </button>
      </dialog>
    </>
  );
}
