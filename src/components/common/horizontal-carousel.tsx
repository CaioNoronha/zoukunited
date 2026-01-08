"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type CarouselSlide = {
  src: string;
  alt: string;
};

type HorizontalCarouselProps = {
  slides: CarouselSlide[];
  className?: string;
  children?: React.ReactNode;
  heightClassName?: string;
  showArrows?: boolean;
  contentClassName?: string;
};

export function HorizontalCarousel({
  slides,
  className,
  children,
  heightClassName = "min-h-[70vh] lg:min-h-[620px]",
  showArrows,
  contentClassName,
}: HorizontalCarouselProps) {
  const shouldShowArrows = showArrows ?? slides.length > 1;

  return (
    <section className={cn("relative w-full overflow-hidden", className)}>
      <Carousel opts={{ loop: true }} className="relative">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={`${slide.src}-${index}`}>
              <div className={cn("relative w-full", heightClassName)}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {shouldShowArrows && (
          <>
            <CarouselPrevious
              variant="ghost"
              className="left-6 z-20 size-9 rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/60"
            />
            <CarouselNext
              variant="ghost"
              className="right-6 z-20 size-9 rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/60"
            />
          </>
        )}
      </Carousel>
      {children && (
        <div className="pointer-events-none absolute inset-0 z-10">
          <div
            className={cn(
              "mx-auto flex h-full w-full max-w-6xl items-end px-6 pb-20 pt-28 lg:px-0 lg:pt-32",
              contentClassName,
            )}
          >
            <div className="pointer-events-auto">{children}</div>
          </div>
        </div>
      )}
    </section>
  );
}
