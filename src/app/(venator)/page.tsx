import { ArenaHero } from "@/components/venator/arena/arena-hero";
import { LockedModes } from "@/components/venator/arena/locked-modes";
import { HomePlayDrills } from "@/components/venator/home/home-play-drills";
import { HomeResourceLinks } from "@/components/venator/home/home-resource-links";
import { HomeStreakNudge } from "@/components/venator/home/home-streak-nudge";
import { ProgressDrills } from "@/components/venator/arena/progress-drills";
import { ActionButton } from "@/components/venator/ui/action-button";
import { SectionHeading } from "@/components/venator/ui/section-heading";

export default function DashboardPage() {
  return (
    <div className="page page--arena page--home">
      <ArenaHero />
      <HomeStreakNudge />
      <section
        aria-labelledby="daily-drills-heading"
        id="daily-drills"
        tabIndex={-1}
      >
        <div id="daily-drills-heading">
          <SectionHeading>Daily Drills</SectionHeading>
        </div>
        <ProgressDrills />
        <HomePlayDrills />
      </section>
      <div className="home-add-game-wrap">
        <ActionButton
          className="add-game-button home-add-game"
          eyebrow="Product preview"
          icon="add_circle"
          label="Add your own game"
          notice="Game submissions are not available in this product preview yet."
          variant="outline"
        />
      </div>
      <LockedModes />
      <HomeResourceLinks />
    </div>
  );
}
