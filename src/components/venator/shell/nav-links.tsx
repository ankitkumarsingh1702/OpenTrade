"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MaterialIcon } from "@/components/venator/ui/material-icon";
import type { MaterialIconName } from "@/types/venator";

const navigation: Array<{ href: "/" | "/compete" | "/profile"; label: string; icon: MaterialIconName }> = [
  { href: "/", label: "Arena", icon: "sports_esports" },
  { href: "/compete", label: "Compete", icon: "military_tech" },
  { href: "/profile", label: "Profile", icon: "person" },
];

export function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className={mobile ? "mobile-nav-links" : "primary-nav"}>
      {navigation.map((item) => {
        const active = item.href === "/" ? pathname === "/" || pathname === "/arena" : pathname === item.href;

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={`nav-link${active ? " nav-link--active" : ""}`}
            href={item.href}
            key={item.href}
          >
            <MaterialIcon filled={active} name={item.icon} />
            <span>{item.label}</span>
          </Link>
        );
      })}
      <Link className="nav-link nav-link--settings" href="/profile#appearance">
        <MaterialIcon name="settings" />
        <span>Settings</span>
      </Link>
    </nav>
  );
}
