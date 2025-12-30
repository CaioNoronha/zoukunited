 "use client";

import ContentSection from "@/components/common/content-section";
import { useTranslation } from "@/hooks/useTranslation";

export default function Intro() {
  const { t } = useTranslation();

  return (
    <ContentSection
      id="intro"
      title={t.home.intro.title}
      description={t.home.intro.description}
      buttonLabel={t.home.intro.button}
      buttonHref="/example"
      images={["/images/home/home_1.jpg", "/images/home/home_2.jpg"]}
    />
  );
}
