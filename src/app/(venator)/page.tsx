import { ArenaHero } from "@/components/venator/arena/arena-hero";
import { ProgressDrills } from "@/components/venator/arena/progress-drills";
import { SectionHeading } from "@/components/venator/ui/section-heading";

export default function DashboardPage() {
  return (
    <div className="page page--arena">
      <ArenaHero />
      <section aria-labelledby="daily-drills-heading">
        <div id="daily-drills-heading">
          <SectionHeading>Daily Drills</SectionHeading>
        </div>
        <ProgressDrills />
      </section>
    </div>
  );
}
