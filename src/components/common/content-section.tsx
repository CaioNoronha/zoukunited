"use client";

import { CustomButton } from "@/components/common/custom-button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type ExtraButton = {
  label: string;
  onClick?: () => void;
  href?: string;
};

type ContentSectionProps = {
  id?: string;
  title: string;
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
  buttonOnClick?: () => void;
  images?: [string, string];
  extraButtons?: ExtraButton[];
  paddingTop?: string;
  paddingBottom?: string;
  hideImages?: boolean;
  minHeight?: string;
  alignTextBottom?: boolean;
};

export default function ContentSection({
  id,
  title,
  description,
  buttonLabel,
  buttonHref,
  buttonOnClick,
  images,
  extraButtons,
  paddingTop = "pt-24",
  paddingBottom = "pb-24",
  hideImages = false,
  minHeight,
  alignTextBottom = false,
}: ContentSectionProps) {
  return (
    <section
      id={id}
      className={`relative z-10 w-full bg-neutral-100 flex ${alignTextBottom ? "items-stretch" : "items-center"} ${paddingTop} ${paddingBottom} ${minHeight ?? ""}`}
    >
      <div
        className={`max-w-[1600px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-28
        flex flex-col lg:flex-row lg:flex-nowrap
        items-center lg:items-center
        lg:gap-24 ${alignTextBottom ? "h-full" : ""}`}
      >
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className={`min-w-[300px] max-w-xl space-y-6 ${alignTextBottom ? "self-end" : ""}`}
        >
          <h2 className="text-5xl sm:text-6xl font-extrabold text-[var(--ds-neutral-1)]">
            {title}
          </h2>
          <p className="text-lg text-[var(--ds-neutral-2)]">{description}</p>

          {buttonLabel && (
            buttonHref ? (
              <Link href={buttonHref}>
                <CustomButton variant="secondary">{buttonLabel}</CustomButton>
              </Link>
            ) : buttonOnClick ? (
              <CustomButton variant="secondary" onClick={buttonOnClick}>{buttonLabel}</CustomButton>
            ) : (
              <CustomButton variant="secondary">{buttonLabel}</CustomButton>
            )
          )}

          {extraButtons && extraButtons.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-6 justify-center lg:justify-start text-center">
              {extraButtons.map((btn, index) =>
                btn.href ? (
                  <Link key={index} href={btn.href}>
                    <CustomButton variant="secondary">{btn.label}</CustomButton>
                  </Link>
                ) : (
                  <CustomButton key={index} variant="secondary" onClick={btn.onClick}>
                    {btn.label}
                  </CustomButton>
                )
              )}
            </div>
          )}
        </motion.div>

        {/* Images */}
        {!hideImages && images?.length === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-[400px] sm:max-w-[500px] aspect-square mx-auto lg:mx-0 lg:ml-auto mt-8 lg:mt-0"
          >
            <div className="absolute top-0 left-0 w-[60%] h-[65%] rounded-xl overflow-hidden border border-[var(--ds-neutral-4)] bg-[var(--ds-neutral-4)]">
              <Image
                src={images[0]}
                alt="Image 1"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-0 right-0 w-[60%] h-[65%] rounded-xl overflow-hidden border border-[var(--ds-neutral-4)] bg-[var(--ds-neutral-4)]">
              <Image
                src={images[1]}
                alt="Image 2"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
