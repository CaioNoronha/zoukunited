import DetailsCard from "./details-card";

const highlights = [
  "Feb 5-9, 2026",
  "Miami Beach Zouk Festival",
  "Classes + socials + beach jams",
];

export default function DetailsSection() {
  return (
    <section className="bg-neutral-950/95 px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <DetailsCard title="Miami Beach Zouk Festival" subtitle="February 5-9, 2026" />
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            More details
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl">Dance in the sunset</h2>
          <p className="text-sm leading-relaxed text-white/70">
            Miami Beach Zouk Festival offers five days of non-stop dance,
            instructors from around the world, and socials that stretch until
            sunrise. Join us for a week of learning, healing, and staying at the
            oceanfront.
          </p>
          <div className="grid gap-3 text-sm text-white/70 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
