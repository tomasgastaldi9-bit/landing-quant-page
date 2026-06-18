import Image from "next/image";
import type { CSSProperties } from "react";

const logoNeutralSrc = "/branding/quantbot-logo-neutral-v2.png";
const logoAccentMaskSrc = "/branding/quantbot-logo-accent-mask-v2.png";
const iconNeutralSrc = "/branding/quantbot-icon-neutral-v2.png";
const iconAccentMaskSrc = "/branding/quantbot-icon-accent-mask-v2.png";

function AccentMask({ src }: { src: string }) {
  const maskStyle = {
    WebkitMaskImage: `url(${src})`,
    WebkitMaskPosition: "left center",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskImage: `url(${src})`,
    maskPosition: "left center",
    maskRepeat: "no-repeat",
    maskSize: "contain",
  } satisfies CSSProperties;

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 bg-[var(--accent-primary)] transition-colors duration-300"
      style={maskStyle}
    />
  );
}

export function BrandMark({
  compact = false,
  size = "default",
}: {
  compact?: boolean;
  size?: "default" | "drawer";
}) {
  if (compact) {
    return (
      <div className="relative h-11 w-12 shrink-0">
        <Image
          src={iconNeutralSrc}
          alt="QuantBot"
          fill
          sizes="44px"
          className="z-0 object-contain"
        />
        <AccentMask src={iconAccentMaskSrc} />
      </div>
    );
  }

  const logoSize =
    size === "drawer"
      ? "h-10 w-[174px] sm:h-11 sm:w-[192px]"
      : "h-10 w-[128px] min-[420px]:w-[150px] sm:h-11 sm:w-[178px] md:h-[52px] md:w-[226px]";

  return (
    <div className={`relative min-w-0 shrink-0 ${logoSize}`}>
      <Image
        src={logoNeutralSrc}
        alt="QuantBot"
        fill
        priority
        sizes={
          size === "drawer"
            ? "192px"
            : "(min-width: 768px) 226px, (min-width: 640px) 178px, (min-width: 420px) 150px, 128px"
        }
        className="z-0 object-contain object-left"
      />
      <AccentMask src={logoAccentMaskSrc} />
    </div>
  );
}
