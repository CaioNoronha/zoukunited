import { CustomButton } from "@/components/common/custom-button";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_55%),linear-gradient(120deg,#0b0f1a,#1a2f57_55%,#0b0f1a)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75),rgba(0,0,0,0.15)_55%,rgba(0,0,0,0.8))]" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-end px-6 pb-20 pt-28 lg:items-center lg:pt-32">
        <div className="max-w-xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Zouk United
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Miami Beach
            <br />
            Zouk Festival 2026
          </h1>
          <p className="text-base text-white/75 sm:text-lg">
            Summer vibes, feet on the sand, and three days of classes with the
            best Zouk artists in the world.
          </p>
          <div className="flex flex-wrap gap-4">
            <CustomButton variant="secondary">Explore the classes</CustomButton>
            <CustomButton variant="dark">View the schedule</CustomButton>
          </div>
        </div>
      </div>
    </section>
  );
}
