"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const directionClass = direction !== "up" ? `reveal-${direction}` : "";
  const revealClassName = ["reveal", directionClass, visible && "reveal-visible", className]
    .filter(Boolean)
    .join(" ");
  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined;

  if (as === "section") {
    return (
      <section ref={ref as unknown as RefObject<HTMLElement>} className={revealClassName} style={style}>
        {children}
      </section>
    );
  }

  return (
    <div ref={ref} className={revealClassName} style={style}>
      {children}
    </div>
  );
}
