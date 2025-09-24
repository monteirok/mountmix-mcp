'use client';

import { ComponentPropsWithoutRef, ElementType, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

type Variant = "fade-up" | "fade-down" | "fade" | "scale";

type AnimatedRevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  variant?: Variant;
} & Omit<ComponentPropsWithoutRef<T>, "children">;

const variantStyles: Record<Variant, { hidden: { opacity: number; transform: string }; visible: { opacity: number; transform: string } }> = {
  "fade-up": {
    hidden: { opacity: 0, transform: "translateY(24px)" },
    visible: { opacity: 1, transform: "translateY(0)" }
  },
  "fade-down": {
    hidden: { opacity: 0, transform: "translateY(-24px)" },
    visible: { opacity: 1, transform: "translateY(0)" }
  },
  fade: {
    hidden: { opacity: 0, transform: "none" },
    visible: { opacity: 1, transform: "none" }
  },
  scale: {
    hidden: { opacity: 0, transform: "scale(0.95)" },
    visible: { opacity: 1, transform: "scale(1)" }
  }
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);

    const listener = (event: MediaQueryListEvent) => setReduced(event.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return reduced;
}

export function AnimatedReveal<T extends ElementType = "div">({
  as,
  children,
  className,
  delay = 0,
  distance,
  duration = 0.6,
  once = true,
  style,
  variant = "fade-up",
  ...rest
}: AnimatedRevealProps<T>) {
  const Component = (as || "div") as ElementType;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const setElementRef = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
  }, []);
  const reducedMotion = usePrefersReducedMotion();

  const { hidden, visible } = useMemo(() => {
    if (typeof distance === "number" && distance !== 24) {
      if (variant === "fade-up") {
        return {
          hidden: { opacity: 0, transform: `translateY(${distance}px)` },
          visible: { opacity: 1, transform: "translateY(0)" }
        };
      }
      if (variant === "fade-down") {
        return {
          hidden: { opacity: 0, transform: `translateY(-${Math.abs(distance)}px)` },
          visible: { opacity: 1, transform: "translateY(0)" }
        };
      }
    }
    return variantStyles[variant];
  }, [distance, variant]);

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = elementRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.disconnect();
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, reducedMotion]);

  const mergedStyle = {
    opacity: isVisible ? visible.opacity : hidden.opacity,
    transform: isVisible ? visible.transform : hidden.transform,
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}s`,
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: `${delay}s`,
    willChange: "opacity, transform",
    ...style
  } as React.CSSProperties;

  if (reducedMotion) {
    mergedStyle.opacity = 1;
    mergedStyle.transform = "none";
    mergedStyle.transition = "none";
  }

  return (
    <Component ref={setElementRef} className={className} style={mergedStyle} {...rest}>
      {children}
    </Component>
  );
}
