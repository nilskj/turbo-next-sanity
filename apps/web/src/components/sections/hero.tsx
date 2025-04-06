import { Badge } from "@workspace/ui/components/badge";
import Image from "next/image";
import type { PagebuilderType } from "@/types";

import { RichText } from "../richtext";
import { SanityButtons } from "../sanity-buttons";
import { SanityImage } from "../sanity-image";
import { NewsletterSignup } from "../newsletter-signup";

type HeroBlockProps = PagebuilderType<"hero">;

export function HeroBlock({
  title,
  buttons,
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

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          {badge && (
            <div className="bg-white/10 backdrop-blur-xl px-4 py-1 rounded-full mb-6">
              <span className="text-white text-sm font-medium uppercase tracking-widest">
                {badge}
              </span>
            </div>
          )}

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight font-serif">
            {title}
          </h1>

          {/* Description */}
          <div className="text-white text-base md:text-lg lg:text-xl max-w-2xl mb-8">
            <RichText
              richText={richText}
              className="prose-invert prose-p:text-white prose-headings:text-white prose-a:text-white"
            />
          </div>

          {/* Newsletter or Buttons */}
          <div className="w-full max-w-md">
            {showNewsletterSignup && newsletterSection ? (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder={
                      newsletterSection.placeholder ||
                      "Enter your email address"
                    }
                    className="flex-1 bg-white/10 border border-white/20 backdrop-blur-md rounded-md px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <button className="bg-white text-black dark:bg-zinc-200 dark:text-zinc-900 font-medium rounded-md px-6 py-3 hover:bg-white/90 dark:hover:bg-zinc-300 transition-colors">
                    {newsletterSection.buttonText || "Subscribe"}
                  </button>
                </div>
                <p className="text-white text-xs text-center">
                  Join my newsletter for exclusive updates and special offers.
                </p>
              </div>
            ) : buttons && buttons.length > 0 ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SanityButtons
                  buttons={buttons}
                  buttonClassName="w-full sm:w-auto"
                  className="w-full sm:w-fit grid gap-2 sm:grid-flow-col"
                />
                <button className="bg-white/10 backdrop-blur-xl border border-white/30 text-white font-medium rounded-full px-8 py-3 flex items-center justify-center gap-2 hover:bg-white/20 transition-colors">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white/60"
                  >
                    <path
                      d="M19.0001 12.2V13.9C19.0001 17.05 17.3201 18.4 14.7701 18.4H6.82007C4.27007 18.4 2.59009 17.05 2.59009 13.9V8.5C2.59009 5.35 4.27007 4 6.82007 4H14.7701C17.3201 4 19.0001 5.35 19.0001 8.5V10.2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 12.2H15.7C14.5 12.2 14 11.7 14 10.5V8.2C14 7 14.5 6.5 15.7 6.5H19C20.2 6.5 20.7 7 20.7 8.2V10.5C20.7 11.7 20.2 12.2 19 12.2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.29999 10.75H11.7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.29999 14.75H11.7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Support on Patreon
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
