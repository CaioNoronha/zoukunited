import DetailsSection from "./sections/details";
import HeroSection from "./sections/hero";
import LocationSection from "./sections/location";
import TicketsSection from "./sections/tickets";

export default function EventPage() {
  return (
    <div className="bg-[var(--ds-background)] text-white">
      <HeroSection />
      <DetailsSection />
      <LocationSection />
      <TicketsSection />
    </div>
  );
}
