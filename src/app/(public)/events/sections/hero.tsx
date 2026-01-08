"use client";

import { HorizontalCarousel } from "@/components/common/horizontal-carousel";
import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const easeOut: [number, number, number, number] = [0.4, 0, 0.2, 1];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOut },
  },
};

export default function HeroSection() {
  const { t } = useTranslation();

  const handleExploreClick = () => {
    const target = document.getElementById("details");
    if (!target) return;

    const startY = window.scrollY;
    const targetY =
      target.getBoundingClientRect().top + window.scrollY - 24;
    const distance = targetY - startY;
    const duration = 1100;
    const startTime = performance.now();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      window.scrollTo({ top: targetY, behavior: "auto" });
      return;
    }

    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOut(progress);
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  return (
    <HorizontalCarousel
      slides={[
        { src: "/banner.png", alt: "Zouk United festival crowd" },
      ]}
      heightClassName="min-h-[620px] sm:min-h-[700px] lg:min-h-[760px]"
      contentClassName="pb-16 sm:pb-18 lg:pb-20"
      showArrows={false}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.85))]"
      />
      <motion.div
        className="relative z-10 max-w-none space-y-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
      >
        <motion.h1
          className="whitespace-nowrap text-[28px] font-light leading-[1.1] text-white sm:text-[40px] lg:text-[48px]"
          variants={itemVariants}
        >
          {t.festival.hero.title}
        </motion.h1>
        <motion.div variants={itemVariants}>
          <Button
            className="h-10 w-[220px] rounded-xl bg-[#F39200] text-[12px] font-semibold uppercase tracking-[0.2em] text-white hover:bg-[#ffb84d]"
            onClick={handleExploreClick}
          >
            {t.festival.button.explore}
          </Button>
        </motion.div>
      </motion.div>
    </HorizontalCarousel>
  );
}
