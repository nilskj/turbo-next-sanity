import Link from "next/link";

import { sanityFetch } from "@/lib/sanity/live";
import { queryFooterData } from "@/lib/sanity/query";
import type { QueryFooterDataResult } from "@/lib/sanity/sanity.types";
import { cn } from "@workspace/ui/lib/utils";

import { Logo } from "./logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "./social-icons";

interface SocialLinksProps {
  data: NonNullable<QueryFooterDataResult>["socialLinks"];
}

interface FooterProps {
  data?: QueryFooterDataResult;
}

async function fetchFooterData() {
  const response = await sanityFetch({
    query: queryFooterData,
  });
  return response;
}

export async function FooterServer() {
  const footer = await sanityFetch({
    query: queryFooterData,
  });
  return <Footer data={footer.data} />;
}

function SocialLinks({ data }: SocialLinksProps) {
  if (!data) return null;

  const { facebook, twitter, instagram, youtube, linkedin } = data;

  const socialLinks = [
    {
      url: instagram,
      Icon: InstagramIcon,
      label: "Follow us on Instagram",
    },
    { url: facebook, Icon: FacebookIcon, label: "Follow us on Facebook" },
    { url: twitter, Icon: XIcon, label: "Follow us on Twitter" },
    { url: linkedin, Icon: LinkedinIcon, label: "Follow us on LinkedIn" },
    {
      url: youtube,
      Icon: YoutubeIcon,
      label: "Subscribe to our YouTube channel",
    },
  ].filter((link) => link.url);

  return (
    <ul className="flex items-center space-x-6 text-muted-foreground">
      {socialLinks.map(({ url, Icon, label }, index) => (
        <li
          key={`social-link-${url}-${index.toString()}`}
          className="font-medium hover:text-primary"
        >
          <Link
            href={url ?? "#"}
            target="_blank"
            prefetch={false}
            rel="noopener noreferrer"
            aria-label={label}
          >
            <Icon className="fill-muted-foreground hover:fill-primary/80 dark:fill-zinc-400 dark:hover:fill-primary" />
            <span className="sr-only">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FooterSkeleton() {
  return <div className="h-20 bg-zinc-50 dark:bg-zinc-900" />;
}

export function Footer({ data }: FooterProps) {
  const year = new Date().getFullYear();
  const siteName = "Author Website";

  return (
    <footer className="mt-auto bg-zinc-50 dark:bg-zinc-900 py-8 md:py-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div>
            <Logo alt={siteName} />
            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
              &copy; {year} {siteName}. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="https://twitter.com/"
              className={cn(
                "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Twitter</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/"
              className={cn(
                "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Instagram</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
