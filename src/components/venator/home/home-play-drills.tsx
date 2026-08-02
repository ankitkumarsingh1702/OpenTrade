import { homeExternalGames } from "@/data/venator";

import { MaterialIcon } from "../ui/material-icon";

export function HomePlayDrills() {
  return (
    <div aria-label="OpenTrade game drills" className="home-play-grid">
      {homeExternalGames.map((game) => (
        <article className="home-play-card-shell" key={game.id}>
          <a
            className={`home-play-card home-play-card--${game.id} clip-notch-br`}
            data-tactical-sound="launch"
            href={game.href}
          >
            <span className="home-play-card__topline">
              <span aria-hidden="true" className="home-play-card__icon">
                <MaterialIcon name={game.icon} />
              </span>
              <strong>{game.index}</strong>
            </span>
            <span className="home-play-card__title">{game.title}</span>
            <span className="home-play-card__description">
              {game.description}
            </span>
            <span aria-hidden="true" className="home-play-card__track">
              <i />
            </span>
            <span className="home-play-card__meta">
              <span>
                Elo <strong>{game.elo}</strong>
              </span>
              <span>
                {game.difficulty} <strong>{game.level}</strong>
              </span>
            </span>
            <span className="home-play-card__cta">
              Play <MaterialIcon name="arrow_forward" />
            </span>
          </a>
        </article>
      ))}
    </div>
  );
}
