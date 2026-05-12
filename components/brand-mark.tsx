import Image from "next/image";

export function BrandMark({
  compact = false,
  size = "default",
}: {
  compact?: boolean;
  size?: "default" | "drawer";
}) {
  const iconSize =
    size === "drawer" ? "size-10 sm:size-11" : "size-10 sm:size-12";

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

  const wordmarkSize =
    size === "drawer"
      ? "text-[15px] sm:text-[19px]"
      : "text-[14px] sm:text-[24px]";

  return (
    <div className="flex min-w-0 shrink-0 items-center gap-3 sm:gap-3.5">
      <div
        className={`relative shrink-0 overflow-hidden rounded-xl border border-[#243042] bg-[#050505] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] ${iconSize}`}
      >
        <Image
          src="/quant-terminal-icon.png"
          alt=""
          fill
          priority
          sizes={size === "drawer" ? "44px" : "(min-width: 640px) 48px, 40px"}
          className="object-cover"
        />
      </div>
      <span
        aria-label="Quant Terminal"
        className={`whitespace-nowrap font-mono font-semibold uppercase leading-none tracking-[0.16em] text-[#f3f4f6] [text-shadow:0_0_18px_rgba(99,247,255,0.12)] sm:tracking-[0.28em] ${wordmarkSize}`}
      >
        Quant <span className="text-[#63f7ff]">Terminal</span>
      </span>
    </div>
  );
}
