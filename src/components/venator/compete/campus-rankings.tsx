import { MaterialIcon } from "@/components/venator/ui/material-icon";
import { rankings } from "@/data/venator";

export function CampusRankings() {
  return (
    <section className="rankings" aria-labelledby="rankings-title">
      <div className="rankings__heading">
        <h2 id="rankings-title">Campus rankings</h2>
        <span aria-hidden="true" />
      </div>
      <ol className="rankings__list">
        {rankings.map((ranking, index) => (
          <li className={`ranking-row clip-notch-tr${index < 2 ? " ranking-row--top" : ""}`} key={ranking.rank}>
            {ranking.score ? <i aria-hidden="true" style={{ width: `${ranking.score}%` }} /> : null}
            <span className="ranking-row__name">
              <strong>{ranking.rank}</strong>
              {ranking.name}
            </span>
            <span className="ranking-row__interest">{ranking.interest}</span>
          </li>
        ))}
      </ol>
      <p className="rankings__note">
        <MaterialIcon name="info" />
        Includes launch interest.
      </p>
    </section>
  );
}
