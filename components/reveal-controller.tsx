"use client";

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

export function RevealController() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelectors),
    ).filter((element) => !element.dataset.revealBound);

    elements.forEach((element) => {
      element.dataset.revealBound = "true";
      element.style.setProperty("--reveal-delay", `${getStaggerDelay(element)}ms`);
      element.classList.add("reveal-on-scroll");
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

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
