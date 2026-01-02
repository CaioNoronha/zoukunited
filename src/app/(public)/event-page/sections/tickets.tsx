import { CustomButton } from "@/components/common/custom-button";
import TicketCard from "./ticket-card";

const tickets = [
  {
    price: "$415.00",
    title: "Combo Miami Beach Zouk Festival 2026 + Zouk Conforto",
    availability: "Available until 2026/08/12 23:59",
    description:
      "A full pass that includes all classes, socials, and beach jams.",
  },
  {
    price: "$215.00",
    title: "Full Pass - Followers",
    availability: "Available until 2026/08/12 23:59",
    description:
      "Perfect for followers who want the full festival experience.",
  },
  {
    price: "$215.00",
    title: "Full Pass - Leaders",
    availability: "Available until 2026/08/12 23:59",
    description:
      "For leaders looking to level up and connect with the community.",
  },
];

export default function TicketsSection() {
  return (
    <section className="bg-neutral-950 px-6 py-14 lg:min-h-[500px]">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="space-y-2">
          <p className="relative w-fit text-[20px] font-semibold uppercase leading-7 tracking-[-0.005em] text-[#FAFAFA] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-10 after:bg-[#F39200]">
            Tickets
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
