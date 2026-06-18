import { PageContainer } from "@/components/layout/PageContainer";

type LandingHeroProps = {
  title?: string;
  description?: string;
};

export function LandingHero({
  title = "บทความทั้งหมด",
  description = "สำรวจบทความล่าสุดของเราเกี่ยวกับเทคโนโลยี การออกแบบ และไลฟ์สไตล์ เพื่อสร้างแรงบันดาลใจและพัฒนาทักษะของคุณ",
}: LandingHeroProps) {
  return (
    <section aria-labelledby="landing-hero-title">
      <PageContainer className="py-12 text-center sm:py-16">
        <h1 id="landing-hero-title" className="text-headline text-4xl sm:text-5xl">
          {title}
        </h1>
        <p className="text-body mx-auto mt-4 max-w-2xl text-muted-foreground">
          {description}
        </p>
      </PageContainer>
    </section>
  );
}
