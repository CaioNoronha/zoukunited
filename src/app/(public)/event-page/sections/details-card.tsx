type DetailsCardProps = {
  title: string;
  subtitle: string;
};

export default function DetailsCard({ title, subtitle }: DetailsCardProps) {
  return (
    <div className="relative h-full min-h-[240px] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%),linear-gradient(140deg,#10223f,#17335f_60%,#0b0f1a)]" />
      <div className="relative flex h-full flex-col justify-end p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">
          Zouk United
        </p>
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-sm text-white/70">{subtitle}</p>
      </div>
    </div>
  );
}
