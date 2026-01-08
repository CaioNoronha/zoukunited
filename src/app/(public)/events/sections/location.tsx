export default function LocationSection() {
  const mapsHref =
    "https://www.google.com/maps/search/?api=1&query=4333%20Collins%20Ave%2C%20Miami%20Beach%2C%20FL%2C%20United%20States%2C%2033140";

  return (
    <section className="relative overflow-hidden bg-neutral-950 px-6 py-14 lg:min-h-[500px]">
      <div className="absolute inset-0">
        <img
          src="/bg.png"
          alt="Holiday Inn Miami Beach Oceanfront "
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
      </div>
      <div className="relative mx-auto flex min-h-[360px] w-full max-w-6xl flex-col justify-between py-9 text-white sm:min-h-[420px] lg:min-h-[500px]">
        <div className="max-w-sm space-y-4">
          <p className="relative w-fit text-[20px] font-semibold uppercase leading-7 tracking-[-0.005em] text-[#FAFAFA] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-10 after:bg-[#F39200]">
            Location
          </p>
          <h3 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            <span className="block">Holiday Inn</span>
            <span className="block whitespace-nowrap">
              Miami Beach-Oceanfront
            </span>
          </h3>
        </div>
        <div className="space-y-4 text-[20px] text-white/80">
          <p className="max-w-sm">
            4333 Collins Ave, Miami Beach, FL, United States, 33140
          </p>
          <a
            href={mapsHref}
            className="inline-block w-fit border-b border-white/40 pb-1 text-[20px] font-medium tracking-[0.18em] text-white/80 transition-transform transition-colors duration-200 hover:-translate-y-0.5 hover:border-[#F39200] hover:text-[#F39200] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F39200]/70"
          >
            View on map
          </a>
        </div>
      </div>
    </section>
  );
}
