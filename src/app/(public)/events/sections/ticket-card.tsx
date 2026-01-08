type TicketCardProps = {
  price: string;
  title: string;
  availability: string;
  description: string;
  tag?: string;
};

export default function TicketCard({
  price,
  title,
  availability,
  description,
  tag,
}: TicketCardProps) {
  return (
    <a
      href="https://www.danceplace.com/book/it/15077"
      className="relative flex h-full min-h-[340px] w-full max-w-[360px] flex-col rounded-[14px] border border-white/10 bg-[#0d0d0f] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] transition-transform transition-colors duration-200 hover:-translate-y-1 hover:border-[#F39200] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F39200]/70 lg:p-7"
    >
      {tag && (
        <span className="absolute right-5 top-5 rounded-full border border-[#F39200]/30 bg-[#F39200]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F39200]">
          {tag}
        </span>
      )}
      <div className="min-h-[88px] space-y-2">
        <span className="text-[15px] font-semibold text-[#F39200]">
          {price}
        </span>
        <h3 className="min-h-[34px] text-[13px] font-semibold leading-snug text-white line-clamp-2">
          {title}
        </h3>
        <p className="text-[10px] text-white/45">{availability}</p>
      </div>
      <div className="mt-5 border-t border-white/10 pt-4">
        <div className="text-[11px] font-medium text-[#FAFAFA]">
          <span>Ticket details</span>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-white/45">
          {description}
        </p>
      </div>
    </a>
  );
}
