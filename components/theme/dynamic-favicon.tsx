"use client";

import { useEffect } from "react";

import { initializeStoredAccentTheme } from "@/components/theme/accent-themes";

const neutralIconSrc = "/branding/quantbot-icon-neutral-v2.png";
const accentMaskSrc = "/branding/quantbot-icon-accent-mask-v2.png";
const fallbackAccent = "#63f7ff";
let faviconAssetsPromise: Promise<{
  accentMaskDataUrl: string;
  neutralIconDataUrl: string;
}> | null = null;
const faviconHrefByAccent = new Map<string, string>();

function readAccentColor() {
  if (typeof window === "undefined") {
    return fallbackAccent;
  }

  const accent = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--accent-primary")
    .trim();

  return accent || fallbackAccent;
}

function readFileAsDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result)));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(blob);
  });
}

async function loadAssetDataUrl(src: string) {
  const response = await fetch(src, { cache: "force-cache" });

  if (!response.ok) {
    throw new Error(`Unable to load favicon asset: ${src}`);
  }

  return readFileAsDataUrl(await response.blob());
}

function loadFaviconAssets() {
  faviconAssetsPromise ??= Promise.all([
    loadAssetDataUrl(neutralIconSrc),
    loadAssetDataUrl(accentMaskSrc),
  ]).then(([neutralIconDataUrl, accentMaskDataUrl]) => ({
    accentMaskDataUrl,
    neutralIconDataUrl,
  }));

  return faviconAssetsPromise;
}

function buildFaviconSvg({
  accentColor,
  accentMaskDataUrl,
  neutralIconDataUrl,
}: {
  accentColor: string;
  accentMaskDataUrl: string;
  neutralIconDataUrl: string;
}) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <mask id="quantbot-accent-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64" style="mask-type: alpha;">
      <image href="${accentMaskDataUrl}" width="64" height="64" preserveAspectRatio="xMidYMid meet" />
    </mask>
  </defs>
  <image href="${neutralIconDataUrl}" width="64" height="64" preserveAspectRatio="xMidYMid meet" />
  <rect width="64" height="64" fill="${accentColor}" mask="url(#quantbot-accent-mask)" />
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function ensureDynamicFaviconLink(rel: "icon" | "shortcut icon") {
  const selector = `link[rel="${rel}"][data-quantbot-dynamic-favicon="true"]`;
  const existingLink = document.head.querySelector<HTMLLinkElement>(selector);

  if (existingLink) {
    return existingLink;
  }

  const link = document.createElement("link");
  link.rel = rel;
  link.type = "image/svg+xml";
  link.setAttribute("data-quantbot-dynamic-favicon", "true");
  document.head.appendChild(link);

  return link;
}

function updateFavicon(href: string) {
  document
    .querySelectorAll<HTMLLinkElement>(
      'link[rel="icon"], link[rel="shortcut icon"]',
    )
    .forEach((link) => {
      link.href = href;
      link.type = "image/svg+xml";
      link.setAttribute("data-quantbot-runtime-favicon", "true");
    });

  ensureDynamicFaviconLink("icon").href = href;
  ensureDynamicFaviconLink("shortcut icon").href = href;
}

export function DynamicFavicon() {
  useEffect(() => {
    let isMounted = true;
    let frameId = 0;
    let latestAccent = "";

    function scheduleFaviconUpdate() {
      window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        const accentColor = readAccentColor();

        if (accentColor === latestAccent) {
          return;
        }

        latestAccent = accentColor;

        const cachedHref = faviconHrefByAccent.get(accentColor);

        if (cachedHref) {
          updateFavicon(cachedHref);
          return;
        }

        loadFaviconAssets()
          .then((assets) => {
            if (!isMounted) {
              return;
            }

            const href = buildFaviconSvg({ accentColor, ...assets });
            faviconHrefByAccent.set(accentColor, href);
            updateFavicon(href);
          })
          .catch(() => {
            // Static metadata icons remain the graceful fallback if the dynamic
            // layered favicon cannot be composed in the browser.
          });
      });
    }

    initializeStoredAccentTheme();
    scheduleFaviconUpdate();

    window.addEventListener(
      "quantbot:accent-theme-change",
      scheduleFaviconUpdate,
    );

    return () => {
      isMounted = false;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener(
        "quantbot:accent-theme-change",
        scheduleFaviconUpdate,
      );
    };
  }, []);

  return null;
}
