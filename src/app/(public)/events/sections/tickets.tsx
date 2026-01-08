import TicketCard from "./ticket-card";

const tickets = [
  {
    price: "275.00",
    title: "Full Pass - Followers",
    availability: "Available until 2026/08/12 23:59",
    description:
      `Miami Beach Zouk Festival offers some of the best worldwide artists who deliver remarkable dance instruction, professionalism, creativity, and entertainment.
      Join us for a weekend in Sunny Miami Beach and enjoy dancing, learning, and staying at the oceanfront hotel! See you soon!
      `
  },
  {
    price: "$275.00",
    title: "Full Pass - Leaders",
    availability: "Available until 2026/02/07 23:59",
    description:
      `Miami Beach Zouk Festival offers some of the best worldwide artists who deliver remarkable dance instruction, professionalism, creativity, and entertainment.
      Join us for a weekend in Sunny Miami Beach and enjoy dancing, learning, and staying at the oceanfront hotel! See you soon!
      `
  },
  {
    price: "$520.00",
    title: "Buddy Pass - Leader + Follower or 2 Leaders Ticket",
    availability: "Available until 2026/02/04 23:59",
    description: "Buddy Pass - Leader + Follower or 2 Leaders Ticket",
  },
  {
    price: "$30.00",
    title: "BZDC Jack & Jill",
    availability: "Available until 2026/02/06 23:59",
    description: "Official BZDC Jack & Jill - All Levels. In order to participate you must have FULL PASS.",
  },
  {
    price: "$30.00",
    title: "Pre-Party Pass",
    availability: "Available until 2026/01/31 23:59",
    description: "Pre-Party Pass for TWO workshops and party on Thursday (Feb 5th)",
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
