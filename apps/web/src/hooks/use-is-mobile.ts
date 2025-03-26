import * as React from "react";

interface MediaQueryResult {
  matches: boolean;
  addEventListener: (
    type: string,
    listener: (event: MediaQueryListEvent) => void,
  ) => void;
  removeEventListener: (
    type: string,
    listener: (event: MediaQueryListEvent) => void,
  ) => void;
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
}

export function useIsMobile(mobileScreenSize = 768) {
  // Start with null for SSR to avoid hydration mismatch
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    // Only run on client side
    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function"
    ) {
      // Set the initial value
      setIsMobile(
        window.matchMedia(`(max-width: ${mobileScreenSize}px)`).matches,
      );

      const mediaListener: MediaQueryResult = window.matchMedia(
        `(max-width: ${mobileScreenSize}px)`,
      );

      const checkIsMobile = (event: MediaQueryListEvent) => {
        setIsMobile(event.matches);
      };

      // Add the appropriate event listener
      if (mediaListener.addEventListener) {
        mediaListener.addEventListener("change", checkIsMobile);
      } else if (mediaListener.addListener) {
        mediaListener.addListener(checkIsMobile);
      }

      // Cleanup
      return () => {
        if (mediaListener.removeEventListener) {
          mediaListener.removeEventListener("change", checkIsMobile);
        } else if (mediaListener.removeListener) {
          mediaListener.removeListener(checkIsMobile);
        }
      };
    }
  }, [mobileScreenSize]);

  return isMobile;
}
