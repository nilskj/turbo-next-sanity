"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { urlForImage } from "../../lib/sanity/image";
import type { SanityImageAsset } from "../../lib/sanity/sanity.types";

interface Book {
  title: string;
  genres: string[];
  date: string;
  description: string;
  image: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
    };
    hotspot?: {
      x?: number;
      y?: number;
      height?: number;
      width?: number;
      _type: "sanity.imageHotspot";
    };
    crop?: {
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
      _type: "sanity.imageCrop";
    };
    _type: "image";
  };
  isNewRelease: boolean;
  detailsLink: {
    type?: "internal" | "external";
    openInNewTab?: boolean;
    external?: string;
    href?: string;
  };
}

interface FeaturedBooksProps {
  heading: string;
  description: string;
  books: Book[];
  viewAllLink: {
    type?: "internal" | "external";
    openInNewTab?: boolean;
    external?: string;
    href?: string;
  };
}

export function FeaturedBooks({
  heading,
  description,
  books,
  viewAllLink,
}: FeaturedBooksProps) {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-semibold font-playfair mb-4">
            {heading}
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto mb-12">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book.title}
              className="bg-white border border-zinc-100/50 rounded-xl overflow-hidden"
            >
              <div className="relative h-64 bg-zinc-100">
                {book.image && (
                  <Image
                    src={urlForImage(
                      book.image as unknown as SanityImageAsset,
                    ).url()}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                {book.isNewRelease && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-zinc-900 text-zinc-50 text-xs font-semibold px-3 py-1.5 rounded-full">
                      New Release
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold font-playfair mb-2">
                  {book.title}
                </h3>
                <div className="flex gap-2 mb-2">
                  {book.genres.map((genre) => (
                    <span
                      key={genre}
                      className="bg-zinc-100 text-zinc-900 text-xs px-2 py-0.5 rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-zinc-500 mb-4">{book.date}</p>
                <p className="text-sm text-zinc-500 mb-6">{book.description}</p>
                <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
                  <Link
                    href={
                      book.detailsLink.href || book.detailsLink.external || "#"
                    }
                    target={
                      book.detailsLink.openInNewTab ? "_blank" : undefined
                    }
                    className="text-xs font-medium inline-flex items-center hover:text-zinc-700 transition-colors"
                  >
                    View Details
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={viewAllLink.href || viewAllLink.external || "#"}
            target={viewAllLink.openInNewTab ? "_blank" : undefined}
            className="inline-flex items-center gap-4 bg-zinc-900 text-zinc-50 px-8 py-3 rounded-full font-medium hover:bg-zinc-800 transition-colors"
          >
            View All Books
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
