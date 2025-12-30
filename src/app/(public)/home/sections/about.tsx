 "use client";

import ContentSection from "@/components/common/content-section";
import { useTranslation } from "@/hooks/useTranslation";

export default function About() {
  const { t } = useTranslation();

  return (
    <ContentSection
      id="about-section"
      title={t.home.about.title}
      description={t.home.about.description}
      buttonLabel={t.home.about.button}
      buttonHref="/educational"
      images={["/images/home/home_1.jpg", "/images/home/home_2.jpg"]}
    />
  );
}
