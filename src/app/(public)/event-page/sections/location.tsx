import LocationCard from "./location-card";

export default function LocationSection() {
  return (
    <section className="bg-neutral-950 px-6 py-16">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            Location
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Holiday Inn Miami Beach Oceanfront
          </h2>
        </div>
        <LocationCard
          title="Holiday Inn"
          subtitle="Miami Beach - Oceanfront"
          address="4333 Collins Ave, Miami Beach, FL 33140"
        />
      </div>
    </section>
  );
}
