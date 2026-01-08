import DetailsSection from "./sections/details";
import HeroSection from "./sections/hero";
import LocationSection from "./sections/location";
import TicketsSection from "./sections/tickets";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function EventPage() {
  return (
    <div className={`${montserrat.className} bg-[var(--ds-background)] text-white`}>
      <HeroSection />
      <DetailsSection />
      <LocationSection />
      <TicketsSection />
    </div>
  );
}
