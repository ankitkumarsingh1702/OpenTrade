"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { commandCenterResources, operator } from "@/data/venator";

import { MaterialIcon } from "../ui/material-icon";

export function CommandCenter({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const profileCurrency = pathname === "/profile";
  const marketHeadingId = `command-center-market-${mobile ? "mobile" : "desktop"}`;
  const referralHeadingId = `command-center-referral-${mobile ? "mobile" : "desktop"}`;
  const content = (
    <>
      <div className="command-center__header">
        <h2>Command Center</h2>
        <p>Tactical Overview</p>
      </div>
      <div className="operator-card">
        <div className="operator-card__icon clip-notch-tl">
          <MaterialIcon name="person" />
        </div>
        <div>
          <strong>{operator.handle}</strong>
          <span>Level {operator.level}</span>
        </div>
      </div>
      <div className="command-center__body">
        <dl className="operator-stats">
          <div className="operator-stats__row operator-stats__row--active">
            <dt>XP Status</dt>
            <dd>{operator.xp}</dd>
          </div>
          <div className="operator-stats__row">
            <dt>Daily Streaks</dt>
            <dd>{operator.streak}</dd>
          </div>
          <div className="operator-stats__row">
            <dt>G-Coins</dt>
            <dd className={profileCurrency ? "operator-stats__currency" : undefined}>{operator.coins}</dd>
          </div>
          <div className="operator-stats__row operator-stats__row--quests">
            <dt>Active Quests</dt>
            <dd>{operator.quests}</dd>
          </div>
        </dl>

        <div className="command-center__utilities">
          <section aria-labelledby={marketHeadingId}>
            <h3 className="command-center__section-label" id={marketHeadingId}>
              Market
            </h3>
            <nav aria-label="Market" className="command-center__market-links">
              {commandCenterResources.markets.map((market) => (
                <a className="command-center__market-link clip-notch-br" href={market.href} key={market.label}>
                  <span aria-hidden="true" className="command-center__flag-frame">
                    <Image alt="" height={18} src={market.flagSrc} unoptimized width={26} />
                  </span>
                  <span>{market.label}</span>
                  <MaterialIcon name="arrow_forward" />
                </a>
              ))}
            </nav>
          </section>

          <section aria-labelledby={referralHeadingId} className="command-center__referral">
            <h3 className="command-center__section-label" id={referralHeadingId}>
              Refer a friend
            </h3>
            <a
              className="command-center__community-link"
              href={commandCenterResources.discord.href}
              rel="noopener noreferrer external"
              target="_blank"
            >
              <span>{commandCenterResources.discord.label}</span>
              <MaterialIcon name="open_in_new" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </section>

          <p className="command-center__disclosure">
            {commandCenterResources.disclosure}{" "}
            <a
              href={commandCenterResources.legal.href}
              rel="noopener noreferrer external"
              target="_blank"
            >
              {commandCenterResources.legal.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </>
  );

  if (mobile) {
    return <div className="command-center command-center--mobile">{content}</div>;
  }

  return (
    <aside aria-label="Command center sidebar" className="command-center">
      {content}
    </aside>
  );
}
