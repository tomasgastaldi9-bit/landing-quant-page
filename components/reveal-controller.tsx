"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const revealSelectors = [
  "#main > section:not(:first-child)",
  "#metrics a[href]",
  "#metrics article",
  "#credibility a[href]",
  "#credibility div[class*='rounded-2xl']",
  "#contact > div",
].join(", ");

function getStaggerDelay(element: HTMLElement) {
  const parent = element.parentElement;

  if (!parent) {
    return 0;
  }

  const siblings = Array.from(parent.children).filter((child) =>
    child.matches("a, article, div"),
  );
  const index = Math.max(0, siblings.indexOf(element));

  return Math.min((index % 6) * 70, 280);
}

function isElementInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.top < viewportHeight * 0.95 &&
    rect.bottom > 0 &&
    rect.left < viewportWidth &&
    rect.right > 0
  );
}

export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelectors),
    );

    if (elements.length === 0) {
      return;
    }

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return;
    }

    elements.forEach((element) => {
      element.style.setProperty("--reveal-delay", `${getStaggerDelay(element)}ms`);
      element.classList.add("reveal-on-scroll");

      if (isElementInViewport(element)) {
        element.classList.add("is-visible");
      } else {
        element.classList.remove("is-visible");
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -5% 0px",
        threshold: 0.1,
      },
    );

    elements
      .filter((element) => !element.classList.contains("is-visible"))
      .forEach((element) => observer.observe(element));

    const fallbackTimer = window.setTimeout(() => {
      elements.forEach((element) => element.classList.add("is-visible"));
      observer.disconnect();
    }, 500);

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
