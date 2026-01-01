import { CustomButton } from "@/components/common/custom-button";
import TicketCard from "./ticket-card";

const tickets = [
  {
    price: "$415.00",
    title: "Combo Miami Beach Zouk Festival 2026 + Zouk Conforto",
    description:
      "A full pass that includes all classes, socials, and beach jams.",
    perks: ["All workshops", "Socials access", "Beach jam access"],
    tag: "Best value",
  },
  {
    price: "$215.00",
    title: "Full Pass - Followers",
    description:
      "Perfect for followers who want the full festival experience.",
    perks: ["Classes access", "Evening socials", "Welcome kit"],
  },
  {
    price: "$215.00",
    title: "Full Pass - Leaders",
    description:
      "For leaders looking to level up and connect with the community.",
    perks: ["Classes access", "Evening socials", "Welcome kit"],
  },
];

export default function TicketsSection() {
  return (
    <section className="bg-neutral-950 px-6 pb-24 pt-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            Tickets
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Choose your pass
          </h2>
        </div>
        <div className="grid auto-rows-fr gap-6 md:grid-cols-3">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.title} {...ticket} />
          ))}
        </div>
        <div className="flex justify-center pt-4">
          <CustomButton variant="secondary">Buy tickets</CustomButton>
        </div>
      </div>
    </section>
  );
}
