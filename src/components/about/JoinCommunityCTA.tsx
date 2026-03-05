"use client";

import { GradientBackground } from "@/components/ui/GradientBackground";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { socialMediaLinks } from "@/config/footer";
import {
  InstagramIcon,
  XIcon,
  FacebookIcon,
  YouTubeIcon,
} from "@/components/icons/SocialIcons";
import type { CommunityCTAData } from "@/types/about";
import type { SocialMediaLink } from "@/types";

const socialIconMap: Record<
  SocialMediaLink["platform"],
  (props: { className?: string }) => React.JSX.Element
> = {
  instagram: InstagramIcon,
  x: XIcon,
  facebook: FacebookIcon,
  youtube: YouTubeIcon,
};

interface JoinCommunityCTAProps {
  data: CommunityCTAData;
}

export function JoinCommunityCTA({ data }: JoinCommunityCTAProps) {
  const visibleLinks = socialMediaLinks.filter((link) => link.url);

  return (
    <section className="relative overflow-hidden py-12 md:py-28 lg:py-32">
      <GradientBackground
        className="absolute z-0 rotate-180"
        inset="-20% -10%"
        rotate={[0, -3, 0]}
        scale={[1, 1.01, 1]}
        duration={20}
        gradient={[
          "radial-gradient(ellipse 60% 75% at 72% 25%, #faf0e6 0%, #fceaf0 40%, transparent 60%)",
          "radial-gradient(ellipse 50% 65% at 30% 30%, rgba(236, 160, 200, 0.55) 0%, rgba(248, 200, 220, 0.25) 45%, transparent 60%)",
          "radial-gradient(ellipse 80% 80% at 50% 25%, #ec8fb8 0%, #f2a5c8 12%, #f5c0d8 25%, #fce8ef 40%, #ffffff 55%, #ffffff 100%)",
        ]}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal direction="left">
          <h2 className="font-montserrat mb-4 text-2xl font-bold text-gray-900 md:mb-6 md:text-4xl lg:text-5xl">
            {data.heading}
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.15}>
          <p
            className="mx-auto max-w-2xl whitespace-pre-line text-base text-gray-700 md:mb-10 md:text-xl lg:mb-6 lg:text-2xl"
            style={{ wordSpacing: "0.25em" }}
          >
            {data.description}
          </p>
        </ScrollReveal>

        {/* 社交媒体图标暂时隐藏 */}
      </div>
    </section>
  );
}
