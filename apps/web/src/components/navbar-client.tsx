"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@workspace/ui/components/navigation-menu";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet";
import { Sheet, SheetTrigger } from "@workspace/ui/components/sheet";
import { cn } from "@workspace/ui/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useIsMobile } from "@/hooks/use-is-mobile";
import type { QueryNavbarDataResult } from "@/lib/sanity/sanity.types";

import { Logo } from "./logo";
import { SanityButtons } from "./sanity-buttons";
import { SanityIcon } from "./sanity-icon";
import { ModeToggle } from "./mode-toggle";

interface MenuItem {
  title: string;
  description: string;
  icon: JSX.Element;
  href?: string;
}

function MenuItemLink({
  item,
  setIsOpen,
}: {
  item: MenuItem;
  setIsOpen?: (isOpen: boolean) => void;
}) {
  return (
    <Link
      className={cn(
        "flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground items-center focus:bg-accent focus:text-accent-foreground",
      )}
      aria-label={`Link to ${item.title ?? item.href}`}
      onClick={() => setIsOpen?.(false)}
      href={item.href ?? "/"}
    >
      {item.icon}
      <div className="">
        <div className="text-sm font-semibold">{item.title}</div>
        <p className="text-sm leading-snug text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </div>
    </Link>
  );
}

function MobileNavbarAccordionColumn({
  column,
  setIsOpen,
}: {
  column: NonNullable<NonNullable<QueryNavbarDataResult>["columns"]>[number];
  setIsOpen: (isOpen: boolean) => void;
}) {
  if (column.type !== "column") return null;
  return (
    <AccordionItem value={column.title ?? column._key} className="border-b-0">
      <AccordionTrigger className="mb-4 py-0 font-semibold hover:no-underline hover:bg-accent hover:text-accent-foreground pr-2 rounded-md">
        <div
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
        >
          {column.title}
        </div>
      </AccordionTrigger>
      <AccordionContent className="mt-2">
        {column.links?.map((item) => (
          <MenuItemLink
            key={item._key}
            setIsOpen={setIsOpen}
            item={{
              description: item.description ?? "",
              href: item.href ?? "",
              icon: <SanityIcon icon={item.icon} className="size-5 shrink-0" />,
              title: item.name ?? "",
            }}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

function MobileNavbar({ navbarData }: { navbarData: QueryNavbarDataResult }) {
  const { logo, siteTitle, columns, buttons } = navbarData ?? {};
  const [isOpen, setIsOpen] = useState(false);

  const path = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: This is intentional
  useEffect(() => {
    setIsOpen(false);
  }, [path]);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-end">
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            <Logo src={logo} alt={siteTitle} priority />
          </SheetTitle>
        </SheetHeader>

        <div className="mb-8 mt-8 flex flex-col gap-4">
          {columns?.map((item) => {
            if (item.type === "link") {
              return (
                <Link
                  key={`column-link-${item.name}-${item._key}`}
                  href={item.href ?? ""}
                  onClick={() => setIsOpen(false)}
                  className="text-sm uppercase tracking-wider font-medium text-[#09090B]"
                >
                  {item.name}
                </Link>
              );
            }
            return (
              <Accordion
                type="single"
                collapsible
                className="w-full"
                key={item._key}
              >
                <MobileNavbarAccordionColumn
                  column={item}
                  setIsOpen={setIsOpen}
                />
              </Accordion>
            );
          })}
        </div>

        <div className="border-t pt-4">
          {buttons && buttons.length > 0 && (
            <Button className="w-full bg-[#18181B] text-white hover:bg-black rounded-full px-5 py-2 h-9 text-sm font-medium mt-4">
              Subscribe
            </Button>
          )}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm font-medium dark:text-zinc-300">
            Toggle theme
          </span>
          <ModeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function getColumnLayoutClass(itemCount: number) {
  if (itemCount <= 4) return "w-80";
  if (itemCount <= 8) return "grid grid-cols-2 gap-2 w-[500px]";
  return "grid grid-cols-3 gap-2 w-[700px]";
}

export function NavbarColumn({
  column,
}: {
  column: Extract<
    NonNullable<NonNullable<QueryNavbarDataResult>["columns"]>[number],
    { type: "column" }
  >;
}) {
  const layoutClass = useMemo(
    () => getColumnLayoutClass(column.links?.length ?? 0),
    [column.links?.length],
  );

  return (
    <NavigationMenuList>
      <NavigationMenuItem className="text-muted-foreground dark:text-neutral-300">
        <NavigationMenuTrigger>{column.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className={cn("p-3", layoutClass)}>
            {column.links?.map((item) => (
              <li key={item._key}>
                <MenuItemLink
                  item={{
                    title: item.name ?? "",
                    description: item.description ?? "",
                    href: item.href ?? "",
                    icon: (
                      <SanityIcon
                        icon={item.icon}
                        className="size-5 shrink-0"
                      />
                    ),
                  }}
                />
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}

export function DesktopNavbar({
  navbarData,
}: {
  navbarData: QueryNavbarDataResult;
}) {
  const { columns, buttons } = navbarData ?? {};
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-8">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-8">
          {columns?.map((column) => {
            if (column.type === "link") {
              const isActive = pathname === (column.href ?? "/");
              return (
                <Link
                  key={`column-link-${column.name}-${column._key}`}
                  href={column.href ?? "/"}
                  className={`text-sm tracking-wider uppercase transition-all ${
                    isActive
                      ? "font-semibold text-zinc-900 dark:text-zinc-100"
                      : "font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {column.name}
                </Link>
              );
            }
            return <NavbarColumn key={column._key} column={column} />;
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-3">
        {buttons && buttons.length > 0 && (
          <Button className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-white rounded-full px-5 py-2 h-9 text-sm font-medium">
            Subscribe
          </Button>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}

export function NavbarClient({
  navbarData,
}: {
  navbarData: QueryNavbarDataResult;
}) {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely use isMobile
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only show content after first mount to avoid hydration mismatch
  if (!mounted) {
    return <NavbarSkeletonResponsive />;
  }

  return isMobile ? (
    <MobileNavbar navbarData={navbarData} />
  ) : (
    <DesktopNavbar navbarData={navbarData} />
  );
}

function SkeletonMobileNavbar() {
  return (
    <div className="md:hidden">
      <div className="flex justify-end">
        <div className="h-10 w-10 rounded-md bg-muted animate-pulse" />
      </div>
    </div>
  );
}

function SkeletonDesktopNavbar() {
  return (
    <div className="hidden md:flex items-center gap-8">
      <div className="flex items-center gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`nav-item-skeleton-${index}`}
            className="h-4 w-20 rounded bg-muted animate-pulse"
          />
        ))}
      </div>

      <div>
        <div className="h-9 w-28 rounded-full bg-muted animate-pulse" />
      </div>
    </div>
  );
}

export function NavbarSkeletonResponsive() {
  return (
    <>
      <SkeletonMobileNavbar />
      <SkeletonDesktopNavbar />
    </>
  );
}
