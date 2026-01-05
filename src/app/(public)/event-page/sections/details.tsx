"use client"

import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

export default function DetailsSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-neutral-950/95 px-6 py-14 lg:min-h-[500px]">
      <div className="mx-auto max-w-6xl space-y-6">
        <p className="relative w-fit text-[20px] font-semibold uppercase leading-7 tracking-[-0.005em] text-[#FAFAFA] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-10 after:bg-[#F39200]">
          {t.festival.title.moreDetails}
        </p>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
          <div className="relative min-h-[240px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:min-h-[280px] lg:min-h-[360px]">
            <Image
              src="/banner.png"
              alt="Miami Beach Zouk Festival"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-6 text-sm text-white/70 lg:pt-2">
            <div className="grid grid-cols-2 gap-8 text-white">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                  {t.festival.info.date}
                </p>
                <p className="text-base font-semibold text-white">
                  Feb 5-9, 2026
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                  {t.festival.info.time}
                </p>
                <p className="text-base font-semibold text-white">9:30AM</p>
              </div>
            </div>
            <p className="leading-relaxed">
              {t.festival.info.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
