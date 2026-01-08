"use client";

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

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.8, ease: easeOut, delay: 0.15 },
  },
};

export default function LocationSection() {
  const { t } = useTranslation();
  const address = t.event.location.address;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
  )}`;

  return (
    <section className="relative overflow-hidden bg-neutral-950 px-6 py-14 lg:min-h-[620px]">
      <div className="absolute inset-0">
        <img
          src="/bg.png"
          alt="Holiday Inn Miami Beach Oceanfront "
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
      </div>
      <motion.div
        className="relative mx-auto flex min-h-[360px] w-full max-w-6xl flex-col justify-between py-9 text-white sm:min-h-[420px] lg:min-h-[500px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div className="max-w-sm space-y-4" variants={itemVariants}>
          <p className="relative w-fit text-[20px] font-semibold uppercase leading-7 tracking-[-0.005em] text-[#FAFAFA]">
            {t.event.location.title}
            <motion.span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-[2px] w-10 origin-left bg-[#F39200]"
              variants={lineVariants}
            />
          </p>
          <h3 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            <span className="block">{t.event.location.nameLine1}</span>
            <span className="block whitespace-nowrap">
              {t.event.location.nameLine2}
            </span>
          </h3>
        </motion.div>
        <motion.div className="space-y-4 text-[20px] text-white/80" variants={itemVariants}>
          <p className="max-w-sm">
            {address}
          </p>
          <a
            href={mapsHref}
            target="_blank"
            rel="noreferrer"
            className="inline-block w-fit border-b border-white/40 pb-1 text-[20px] font-medium tracking-[0.18em] text-white/80 transition-transform transition-colors duration-200 hover:-translate-y-0.5 hover:border-[#F39200] hover:text-[#F39200] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F39200]/70"
          >
            {t.event.location.viewOnMap}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
