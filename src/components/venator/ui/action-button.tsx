"use client";

import { useRef } from "react";

import { MaterialIcon } from "@/components/venator/ui/material-icon";
import type { MaterialIconName } from "@/types/venator";

interface ActionButtonProps {
  label: string;
  icon?: MaterialIconName;
  variant?: "primary" | "secondary" | "outline" | "text";
  className?: string;
  notice?: string;
}

export function ActionButton({
  label,
  icon,
  variant = "primary",
  className = "",
  notice = "This external workflow is not connected in the local Venator preview.",
}: ActionButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
      <dialog className="action-dialog clip-notch-both" ref={dialogRef}>
        <div className="action-dialog__eyebrow">Local preview</div>
        <h2>{label}</h2>
        <p>{notice}</p>
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
