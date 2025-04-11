import { Badge } from "@workspace/ui/components/badge";
import Image from "next/image";
import type { Hero } from "@/lib/sanity/sanity.types";

import { RichText } from "../richtext";
import { SanityButtons } from "../sanity-buttons";
import { SanityImage } from "../sanity-image";
import { NewsletterSignup } from "../newsletter-signup";

type HeroBlockProps = Hero;

export function HeroBlock({
  title,
  buttons = [],
  badge,
  image,
  richText,
  showNewsletterSignup,
  newsletterSection,
}: HeroBlockProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center py-0 -mt-[72px] pt-[72px] w-screen max-w-none"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 w-full">
        <Image
          src="/images/hero-background.png"
          alt="Background"
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          {badge && (
            <div className="bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-full mb-4 md:mb-6">
              <span className="text-white text-xs md:text-sm font-medium uppercase tracking-widest">
                {badge}
              </span>
            </div>
          )}

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-[1.15] md:leading-tight font-serif">
            {title}
          </h1>

          {/* Description */}
          {richText && (
            <div className="text-white text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mb-6 md:mb-8">
              <RichText
                richText={richText}
                className="prose-invert prose-p:text-white/90 prose-headings:text-white prose-a:text-white"
              />
            </div>
          )}

          {/* Newsletter and Buttons */}
          <div className="w-full max-w-md space-y-4 md:space-y-6">
            {showNewsletterSignup && newsletterSection && (
              <div className="space-y-3 md:space-y-4">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <input
                    type="email"
                    placeholder={
                      newsletterSection.placeholder ||
                      "Enter your email address"
                    }
                    className="flex-1 bg-white/10 border border-white/20 backdrop-blur-md rounded-md px-4 py-2.5 text-sm md:text-base text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <button className="bg-white text-black dark:bg-zinc-200 dark:text-zinc-900 font-medium rounded-md px-6 py-2.5 hover:bg-white/90 dark:hover:bg-zinc-300 transition-colors text-sm md:text-base whitespace-nowrap">
                    {newsletterSection.buttonText || "Subscribe"}
                  </button>
                </div>
                <p className="text-white/80 text-xs text-center px-2">
                  Join my newsletter for exclusive updates and special offers.
                </p>
              </div>
            )}

            {buttons.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <SanityButtons
                  buttons={buttons}
                  buttonClassName="w-full sm:w-auto text-sm md:text-base py-2.5"
                  className="w-full sm:w-fit grid gap-2 sm:grid-flow-col sm:gap-3"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
