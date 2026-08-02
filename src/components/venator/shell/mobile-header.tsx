"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { CommandCenter } from "@/components/venator/shell/command-center";
import { NavLinks } from "@/components/venator/shell/nav-links";
import { LinklessBrand } from "@/components/venator/shell/primary-sidebar";
import { MaterialIcon } from "@/components/venator/ui/material-icon";

export function MobileHeader() {
  const pathname = usePathname();
  const navDialog = useRef<HTMLDialogElement>(null);
  const hudDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    navDialog.current?.close();
    hudDialog.current?.close();
  }, [pathname]);

  return (
    <header className="mobile-header">
      <button aria-label="Open navigation" onClick={() => navDialog.current?.showModal()} type="button">
        <MaterialIcon name="menu" />
      </button>
      <LinklessBrand compact />
      <button aria-label="View command center" onClick={() => hudDialog.current?.showModal()} type="button">
        <MaterialIcon name="person" />
      </button>

      <dialog aria-label="Navigation" className="mobile-drawer mobile-drawer--nav" ref={navDialog}>
        <div className="mobile-drawer__toolbar">
          <span>Navigation</span>
          <button aria-label="Close navigation" onClick={() => navDialog.current?.close()} type="button">
            <MaterialIcon name="close" />
          </button>
        </div>
        <NavLinks mobile />
      </dialog>

      <dialog aria-label="Command center" className="mobile-drawer mobile-drawer--hud" ref={hudDialog}>
        <div className="mobile-drawer__toolbar">
          <span>Operator HUD</span>
          <button aria-label="Close command center" onClick={() => hudDialog.current?.close()} type="button">
            <MaterialIcon name="close" />
          </button>
        </div>
        <CommandCenter mobile />
      </dialog>
    </header>
  );
}
