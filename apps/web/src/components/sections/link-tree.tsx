import Image from "next/image";
import Link from "next/link";
import type { PagebuilderType } from "@/types";

import { SanityImage } from "../sanity-image";

// Define the expected format for cards from Sanity
interface LinkCard {
  _key?: string; // Make _key optional since we'll generate one if missing
  title: string;
  description?: string;
  icon?: any;
  href: string;
  badge?: string;
}

// Define default cards
const DEFAULT_CARDS = [
  {
    _key: "release",
    title: "Latest Release",
    description: "Check out my newest book",
    icon: "/images/icons/book-icon.svg",
    href: "/books/latest",
  },
  {
    _key: "bookclub",
    title: "Book Club",
    description: "Join our monthly discussions",
    icon: "/images/icons/bookclub-icon.svg",
    href: "/book-club",
    badge: "New",
  },
  {
    _key: "newsletter",
    title: "Newsletter",
    description: "Get updates in your inbox",
    icon: "/images/icons/newsletter-icon-1.svg",
    href: "/newsletter",
  },
  {
    title: "Blog",
    description: "Read my latest thoughts",
    icon: "/images/icons/blog-icon-1.svg",
    href: "/blog",
    badge: "Updated",
  },
  {
    title: "Events",
    description: "Book signings & appearances",
    icon: "/images/icons/events-icon-1.svg",
    href: "/events",
    badge: "Live",
  },
  {
    title: "Free Chapter",
    description: "Sample my writing",
    icon: "/images/icons/chapter-icon-1.svg",
    href: "/free-chapter",
  },
  {
    title: "Twitter",
    description: "@authorhandle",
    icon: "/images/icons/twitter-icon.svg",
    href: "https://twitter.com/authorhandle",
    badge: "Follow",
  },
  {
    title: "Instagram",
    description: "@authorhandle",
    icon: "/images/icons/instagram-icon-1.svg",
    href: "https://instagram.com/authorhandle",
    badge: "Follow",
  },
  {
    title: "Contact",
    description: "Get in touch with me",
    icon: "/images/icons/contact-icon.svg",
    href: "/contact",
  },
];

export function LinkTreeSection(props: Record<string, any> = {}) {
  const { title = "Connect & Discover", cards = DEFAULT_CARDS } = props;

  return (
    <section className="py-24 bg-white dark:bg-zinc-900 -mt-1">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-semibold font-serif text-center mb-14 text-zinc-900 dark:text-zinc-50">
            {title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {cards.map((card: Partial<LinkCard>, index: number) => {
              // Skip rendering if required fields are missing
              if (!card.title || !card.href) {
                console.warn(
                  `Card at index ${index} is missing required fields:`,
                  card,
                );
                return null;
              }

              // Generate a key if none exists
              const key = card._key || `link-tree-${index}`;

              return (
                <Link
                  key={key}
                  href={card.href}
                  className="flex flex-col p-6 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700/30 rounded-xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] dark:shadow-[0_1px_2px_0_rgba(0,0,0,0.4)] hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-zinc-50 dark:bg-zinc-700/50 rounded-lg flex-shrink-0">
                      {card.icon && typeof card.icon === "string" ? (
                        <Image
                          src={card.icon}
                          alt={card.title}
                          width={24}
                          height={24}
                          className="w-5 h-5 dark:invert"
                        />
                      ) : card.icon && typeof card.icon === "object" ? (
                        <SanityImage
                          asset={card.icon}
                          width={24}
                          height={24}
                          className="w-5 h-5 dark:invert"
                          alt={card.title}
                        />
                      ) : null}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif font-medium text-lg text-zinc-900 dark:text-zinc-50">
                          {card.title}
                        </h3>
                        {card.badge && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-zinc-50 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-300 rounded-full">
                            {card.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
