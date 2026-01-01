type TicketCardProps = {
  price: string;
  title: string;
  description: string;
  perks: string[];
  tag?: string;
};

export default function TicketCard({
  price,
  title,
  description,
  perks,
  tag,
}: TicketCardProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ds-secondary-1)]">
          {price}
        </span>
        {tag && (
          <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60">
            {tag}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/65 line-clamp-3">{description}</p>
      <div className="mt-4 flex-1 space-y-2 text-xs text-white/60">
        {perks.map((perk) => (
          <p key={perk} className="rounded-lg border border-white/5 bg-white/5 px-3 py-2">
            {perk}
          </p>
        ))}
      </div>
    </div>
  );
}
