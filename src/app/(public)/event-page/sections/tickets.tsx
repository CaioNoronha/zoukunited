"use client"

import { CustomButton } from "@/components/common/custom-button";
import TicketCard from "./ticket-card";
import { useTranslation } from "@/hooks/useTranslation";

export default function TicketsSection() {
  const { t } = useTranslation();

  const tickets = [
    {
      price: "$415.00",
      title: t.festival.info.conforto,
      availability: t.festival.info.available,
      description: t.festival.info.conforto,
    },
    {
      price: "$215.00",
      title: t.festival.info.fullPassFollowers,
      availability: t.festival.info.available,
      description: t.festival.info.fullPassFollowers,
    },
    {
      price: "$215.00",
      title: t.festival.info.fullPassLeaders,
      availability: t.festival.info.available,
      description: t.festival.info.fullPassLeaders,
    },
  ];

  return (
    <section className="bg-neutral-950 px-6 py-14 lg:min-h-[500px]">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="space-y-2">
          <p className="relative w-fit text-[20px] font-semibold uppercase leading-7 tracking-[-0.005em] text-[#FAFAFA] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-10 after:bg-[#F39200]">
            {t.festival.title.tickets}
          </p>
        </div>
        <div className="mx-auto grid auto-rows-fr gap-6 md:grid-cols-3 md:justify-items-center">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.title} {...ticket} />
          ))}
        </div>
      </div>
    </section>
  );
}
