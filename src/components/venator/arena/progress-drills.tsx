import { MaterialIcon } from "@/components/venator/ui/material-icon";

const progressDrills = [
  {
    category: "Intel",
    title: "Higher / Lower",
    description: "Predict asset movement sequences to earn multiplier bonuses.",
    current: 3,
    total: 5,
    icon: "monitoring" as const,
  },
  {
    category: "Endurance",
    title: "Runway",
    description: "Maintain portfolio delta within acceptable parameters during high volatility.",
    current: 1,
    total: 3,
    icon: "flight_takeoff" as const,
  },
];

export function ProgressDrills() {
  return (
    <div className="drill-grid drill-grid--progress">
      {progressDrills.map((drill) => (
        <article className="drill-card clip-notch-br" key={drill.title}>
          <div className="drill-card__topline">
            <span className="drill-card__badge">{drill.category}</span>
            <MaterialIcon className="drill-card__icon" name={drill.icon} />
          </div>
          <h3>{drill.title}</h3>
          <p>{drill.description}</p>
          <div className="progress-card__label">
            <span>Progression</span>
            <strong>
              {drill.current}/{drill.total}
            </strong>
          </div>
          <div aria-label={`${drill.current} of ${drill.total} complete`} className="segmented-progress" role="img">
            {Array.from({ length: drill.total }, (_, index) => (
              <span className={index < drill.current ? "is-complete" : ""} key={index} />
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
