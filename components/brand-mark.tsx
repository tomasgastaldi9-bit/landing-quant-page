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
      ? "h-9 w-[205px] sm:h-10 sm:w-[250px]"
      : "h-10 w-[205px] sm:h-14 sm:w-[340px]";
  const imageSizes =
    size === "drawer" ? "(min-width: 640px) 250px, 205px" : "(min-width: 640px) 340px, 205px";

  return (
    <div className={`relative shrink-0 ${logoSize}`}>
      <Image
        src="/quant-terminal-logo-horizontal.png"
        alt="Quant Terminal"
        fill
        priority
        sizes={imageSizes}
        className="object-contain object-left"
      />
    </div>
  );
}
