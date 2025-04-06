import { sanityFetch } from "@/lib/sanity/live";
import { queryNavbarData } from "@/lib/sanity/query";
import type { QueryNavbarDataResult } from "@/lib/sanity/sanity.types";

import { Logo } from "./logo";
import { NavbarClient, NavbarSkeletonResponsive } from "./navbar-client";

export async function NavbarServer() {
  const navbarData = await sanityFetch({ query: queryNavbarData });
  return <Navbar navbarData={navbarData.data} />;
}

export function Navbar({ navbarData }: { navbarData: QueryNavbarDataResult }) {
  const { logo, siteTitle } = navbarData ?? {};

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/95 backdrop-blur-xl shadow-sm dark:shadow-zinc-800/10">
      <div className="container mx-auto px-6 py-5">
        <nav className="flex justify-between items-center">
          <Logo alt={siteTitle} />

          <NavbarClient navbarData={navbarData} />
        </nav>
      </div>
    </header>
  );
}

export function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/95 backdrop-blur-xl shadow-sm dark:shadow-zinc-800/10">
      <div className="container mx-auto px-6 py-5">
        <nav className="flex justify-between items-center">
          <div className="h-[32px] w-[120px] rounded animate-pulse bg-muted" />
          <NavbarSkeletonResponsive />
        </nav>
      </div>
    </header>
  );
}
