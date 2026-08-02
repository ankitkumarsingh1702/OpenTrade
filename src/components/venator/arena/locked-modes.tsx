import { MaterialIcon } from "@/components/venator/ui/material-icon";

const lockedModes = [
  {
    title: "Arena",
    description: "Build five picks. Beat ChatGPT.",
    status: "7700 more XP to unlock",
  },
  {
    title: "Real money",
    description: "Not available yet. Complete four levels.",
    status: "Eligibility required",
  },
];

export function LockedModes() {
  return (
    <section aria-label="Locked modes" className="locked-grid">
      {lockedModes.map((mode) => (
        <article className="locked-card clip-notch-br" data-disabled="true" key={mode.title}>
          <div className="locked-card__topline">
            <MaterialIcon name="lock" />
            <span>Locked</span>
          </div>
          <h3>{mode.title}</h3>
          <p>{mode.description}</p>
          <div className="locked-card__status">{mode.status}</div>
        </article>
      ))}
    </section>
  );
}
