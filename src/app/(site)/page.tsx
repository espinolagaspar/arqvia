import { HeroImage } from "@/components/home/hero-image";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Services } from "@/components/home/services";
import { MaterialsStrip } from "@/components/home/materials-strip";
import { ProcessSteps } from "@/components/home/process-steps";
import { AboutBlock } from "@/components/home/about-block";
import { ContactCTA } from "@/components/shared/contact-cta";
import {
  getProjects,
  pickFeatured,
  projectCover,
} from "@/lib/projects/store";
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  SITE_URL,
  WHATSAPP_NUMBER,
} from "@/lib/utils";

export const dynamic = "force-dynamic";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ARQVIA",
  url: SITE_URL,
  email: CONTACT_EMAIL,
  telephone: `+${WHATSAPP_NUMBER}`,
  areaServed: ["CABA", "GBA"],
  sameAs: [INSTAGRAM_URL],
};

export default async function HomePage() {
  const featured = pickFeatured(await getProjects());
  const hero = featured[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HeroImage project={hero} cover={hero ? projectCover(hero) : null} />
      <FeaturedProjects projects={featured} />
      <Services />
      <MaterialsStrip />
      <ProcessSteps />
      <AboutBlock />
      <ContactCTA />
    </>
  );
}
