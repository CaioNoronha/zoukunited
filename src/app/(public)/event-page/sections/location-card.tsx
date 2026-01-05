import { useTranslation } from "@/hooks/useTranslation";

type LocationCardProps = {
  title: string;
  subtitle: string;
  address: string;
};

export default function LocationCard({
  title,
  subtitle,
  address,
}: LocationCardProps) {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.18),transparent_55%),linear-gradient(120deg,#1a2f57,#0b0f1a_55%,#10223f)]" />
      <div className="relative flex min-h-[220px] flex-col justify-end gap-2 p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">
          {t.festival.title.location}
        </p>
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-sm text-white/70">{subtitle}</p>
        <p className="text-xs text-white/60">{address}</p>
        <button className="mt-3 w-fit text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ds-secondary-1)]">
          {t.festival.button.viewOnMap}
        </button>
      </div>
    </div>
  );
}
