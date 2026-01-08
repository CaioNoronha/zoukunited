"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const easeOut: [number, number, number, number] = [0.4, 0, 0.2, 1];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.5, ease: easeOut, delay: 0.1 },
  },
};

export default function DetailsSection() {
  return (
    <section className="bg-neutral-950/95 px-6 py-14 lg:min-h-[500px]">
      <motion.div
        className="mx-auto max-w-6xl space-y-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.p
          className="relative w-fit text-[20px] font-semibold uppercase leading-7 tracking-[-0.005em] text-[#FAFAFA]"
          variants={itemVariants}
        >
          More details
          <motion.span
            aria-hidden="true"
            className="absolute -bottom-1 left-0 h-[2px] w-10 origin-left bg-[#F39200]"
            variants={lineVariants}
          />
        </motion.p>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
          <motion.div
            className="relative min-h-[240px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:min-h-[280px] lg:min-h-[360px]"
            variants={itemVariants}
          >
            <Image
              src="/banner.png"
              alt="Miami Beach Zouk Festival"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              priority
            />
          </motion.div>
          <motion.div
            className="space-y-6 text-sm text-white/70 lg:pt-2"
            variants={itemVariants}
          >
            <div className="grid grid-cols-2 gap-8 text-white">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                  Date
                </p>
                <p className="text-base font-semibold text-white">
                  Feb 5-9, 2026
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                  Time
                </p>
                <p className="text-base font-semibold text-white">9:30AM</p>
              </div>
            </div>
            <p className="leading-relaxed">
              Miami Beach Zouk Festival offers some of the best worldwide
              artists who deliver remarkable dance instruction, professionalism,
              creativity, and entertainment. Join us for a weekend in sunny
              Miami Beach and enjoy dancing, learning, and staying at the
              oceanfront hotel! See you soon!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
