import { HorizontalCarousel } from "@/components/common/horizontal-carousel";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <HorizontalCarousel
      slides={[
        { src: "/banner.png", alt: "Zouk United festival crowd" },
        { src: "/bg.png", alt: "Zouk United festival highlight" },
      ]}
      heightClassName="min-h-[500px] lg:min-h-[500px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75),rgba(0,0,0,0.2)_55%,rgba(0,0,0,0.8))]"
      />
      <div className="relative z-10 mt-6 max-w-none space-y-5 sm:mt-8">
        <h1 className="whitespace-nowrap text-[28px] font-light leading-[1.1] text-white sm:text-[40px] lg:text-[48px]">
          Miami Beach Zouk Festival 2026
        </h1>
        <Button className="h-10 w-[220px] rounded-md bg-[#F39200] text-[12px] font-semibold uppercase tracking-[0.2em] text-black hover:bg-[#d97f00]">
          Explore
        </Button>
      </div>
    </HorizontalCarousel>
  );
}
