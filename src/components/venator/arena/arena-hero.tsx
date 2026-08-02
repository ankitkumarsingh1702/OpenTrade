import Link from "next/link";

import { MaterialIcon } from "@/components/venator/ui/material-icon";

export function ArenaHero({ expanded = false }: { expanded?: boolean }) {
  return (
    <section className="arena-hero clip-hero" aria-labelledby="arena-title">
      <div aria-hidden="true" className="arena-hero__media" />
      <div className="arena-hero__content">
        <p>Live Event Active</p>
        <h1 id="arena-title">
          Global
          <br />
          Trading
          <br />
          <span>Arena</span>
        </h1>
        <Link
          className="tactical-button tactical-button--primary arena-hero__cta"
          href={expanded ? "#drill-selector" : "/arena"}
        >
          Enter Arena
          <MaterialIcon name="arrow_forward" />
        </Link>
      </div>
    </section>
  );
}
