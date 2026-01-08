import Image from "next/image"

type ResultsBackgroundProps = {
  image?: string
  gradientClassName?: string
}

/**
 * Fixed background for results pages.
 * Mirrors the home video feel using a cover image + soft gradient.
 */
export default function ResultsBackground({
  image = "/images/background.jpeg",
  gradientClassName = "bg-gradient-to-b from-[var(--ds-primary-1)]/55 via-black/55 to-[var(--ds-secondary-1)]/45",
}: ResultsBackgroundProps) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      <Image
        src={image}
        alt="Background"
        fill
        priority
        className="object-cover"
      />
      <div className={`absolute inset-0 ${gradientClassName} blur-[1px]`} />
    </div>
  )
}
