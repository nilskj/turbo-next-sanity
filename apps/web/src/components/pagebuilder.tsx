"use client";
import { useOptimistic } from "@sanity/visual-editing/react";
import { createDataAttribute, type SanityDocument } from "next-sanity";
import type { ComponentType } from "react";

import { dataset, projectId, studioUrl } from "@/lib/sanity/api";
import type { QueryHomePageDataResult } from "@/lib/sanity/sanity.types";
import type { PagebuilderType } from "@/types";

import { CTABlock } from "./sections/cta";
import { FaqAccordion } from "./sections/faq-accordion";
import { FeatureCardsWithIcon } from "./sections/feature-cards-with-icon";
import { HeroBlock } from "./sections/hero";
import { ImageLinkCards } from "./sections/image-link-cards";
import { LinkTreeSection } from "./sections/link-tree";
import { SubscribeNewsletter } from "./sections/subscribe-newsletter";
import { FeaturedBooks } from "./sections/featured-books";

type PageBlock = NonNullable<
  NonNullable<QueryHomePageDataResult>["pageBuilder"]
>[number];

export type PageBuilderProps = {
  pageBuilder: PageBlock[];
  id: string;
  type: string;
};

type PageData = {
  _id: string;
  _type: string;
  pageBuilder?: PageBlock[];
};

const BLOCK_COMPONENTS = {
  cta: CTABlock,
  faqAccordion: FaqAccordion,
  hero: HeroBlock,
  featureCardsIcon: FeatureCardsWithIcon,
  subscribeNewsletter: SubscribeNewsletter,
  imageLinkCards: ImageLinkCards,
  linkTree: LinkTreeSection,
  featuredBooks: FeaturedBooks,
} as const;

type BlockType = keyof typeof BLOCK_COMPONENTS;

export function PageBuilder({
  pageBuilder: initialPageBuilder = [],
  id,
  type,
}: PageBuilderProps) {
  const pageBuilder = useOptimistic<PageBlock[], SanityDocument<PageData>>(
    initialPageBuilder,
    (currentPageBuilder, action) => {
      if (action.id === id && action.document.pageBuilder) {
        return action.document.pageBuilder;
      }

      return currentPageBuilder;
    },
  );

  return (
    <main
      className="flex flex-col dark:bg-zinc-900"
      data-sanity={createDataAttribute({
        id: id,
        baseUrl: studioUrl,
        projectId: projectId,
        dataset: dataset,
        type: type,
        path: "pageBuilder",
      }).toString()}
    >
      {pageBuilder.map((block) => {
        const Component = BLOCK_COMPONENTS[block._type] as ComponentType<
          PagebuilderType<BlockType>
        >;

        if (!Component) {
          return (
            <div
              key={`${block._type}-${block._key}`}
              className="flex items-center justify-center p-8 text-center text-muted-foreground bg-muted dark:bg-zinc-800 dark:text-zinc-400 rounded-lg max-w-7xl mx-auto"
            >
              Component not found for block type: <code>{block._type}</code>
            </div>
          );
        }

        // Check if it's a hero block - no max-width if so
        const isHeroBlock = block._type === "hero";

        return (
          <div
            key={`${block._type}-${block._key}`}
            className={`w-full ${!isHeroBlock ? "max-w-7xl mx-auto" : ""}`}
            data-sanity={createDataAttribute({
              id: id,
              baseUrl: studioUrl,
              projectId: projectId,
              dataset: dataset,
              type: type,
              path: `pageBuilder[_key=="${block._key}"]`,
            }).toString()}
          >
            <Component {...block} />
          </div>
        );
      })}
    </main>
  );
}
