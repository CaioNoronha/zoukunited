export default function LocationSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 px-6 py-16 lg:min-h-[534px]">
      <div className="absolute inset-0">
        <img
          src="/bg.png"
          alt="Holiday Inn Miami Beach Oceanfront"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
      </div>
      <div className="relative mx-auto flex min-h-[380px] w-full max-w-[1440px] flex-col justify-between px-2 py-10 text-white sm:min-h-[440px] lg:min-h-[520px] lg:px-8">
        <div className="max-w-sm space-y-4">
          <p className="relative w-fit text-[20px] font-semibold uppercase leading-7 tracking-[-0.005em] text-[#FAFAFA] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-14 after:bg-[#F39200]">
            Location
          </p>
          <h3 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Holiday Inn
            <br />
            Miami Beach-
            <br />
            Oceanfront
          </h3>
        </div>
        <div className="space-y-4 text-sm text-white/80">
          <p className="max-w-sm">
            4333 Collins Ave, Miami Beach, FL, United States, 33140
          </p>
          <button className="w-fit rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white hover:text-white">
            View on map
          </button>
        </div>
      </div>
    </section>
  );
}
