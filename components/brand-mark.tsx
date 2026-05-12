import Image from "next/image";

export function BrandMark({
  compact = false,
  size = "default",
}: {
  compact?: boolean;
  size?: "default" | "drawer";
}) {
  if (compact) {
    return (
      <div className="relative size-11 shrink-0 overflow-hidden rounded-xl border border-[#243042] bg-[#050505] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
        <Image
          src="/quant-terminal-icon.png"
          alt="Quant Terminal"
          fill
          sizes="44px"
          className="object-cover"
        />
      </div>
    );
  }

  const logoSize =
    size === "drawer"
      ? "h-10 w-[252px] sm:h-11 sm:w-[278px]"
      : "h-11 w-[276px] sm:h-[52px] sm:w-[328px]";
  const imageSizes =
    size === "drawer"
      ? "(min-width: 640px) 278px, 252px"
      : "(min-width: 640px) 328px, 276px";

  return (
    <div className={`relative shrink-0 ${logoSize}`}>
      <Image
        src="/branding/quant-terminal-logo-horizontal-v2.png"
        alt="Quant Terminal"
        fill
        priority
        sizes={imageSizes}
        className="object-contain object-left"
      />
    </div>
  );
}
