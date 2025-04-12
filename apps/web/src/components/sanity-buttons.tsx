import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import type { Button as SanityButton } from "@/lib/sanity/sanity.types";
import { HeartIcon } from "lucide-react";

type SanityButtonWithKey = SanityButton & { _key: string };

type SanityButtonsProps = {
  buttons: SanityButtonWithKey[] | null;
  className?: string;
  buttonClassName?: string;
  size?: "sm" | "lg" | "default" | "icon" | null | undefined;
};

export function SanityButtons({
  buttons,
  className,
  buttonClassName,
  size = "default",
}: SanityButtonsProps) {
  if (!buttons?.length) return null;

  return (
    <div className={cn("flex flex-col sm:flex-row gap-4", className)}>
      {buttons.map((button) => (
        <Button
          key={`button-${button._key}`}
          variant={button.variant || "default"}
          size={size}
          asChild
          className={cn(
            "bg-white/10 backdrop-blur-xl border border-white/30 text-white hover:bg-white/20 transition-colors rounded-full py-3 px-8 gap-2 font-medium text-sm",
            buttonClassName,
          )}
        >
          <Link
            href={button.url?.external || "#"}
            target={button.url?.openInNewTab ? "_blank" : "_self"}
            rel={button.url?.openInNewTab ? "noopener noreferrer" : undefined}
            className="flex items-center justify-center gap-2"
          >
            {button.text?.toLowerCase().includes("patreon") && <HeartIcon />}
            <span className="font-medium">{button.text}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
}
