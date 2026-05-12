import Image from "next/image";

export function BrandMark({
  compact = false,
  size = "default",
}: {
  compact?: boolean;
  size?: "default" | "drawer";
}) {
  const iconSize =
    size === "drawer"
      ? "h-10 w-11 sm:h-11 sm:w-12"
      : "h-10 w-11 sm:h-12 sm:w-[52px]";

  if (compact) {
    return (
      <div className="relative h-11 w-12 shrink-0">
        <Image
          src="/branding/quant-terminal-icon-transparent.png"
          alt="Quant Terminal"
          fill
          sizes="44px"
          className="object-contain"
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
      <div className={`relative shrink-0 ${iconSize}`}>
        <Image
          src="/branding/quant-terminal-icon-transparent.png"
          alt=""
          fill
          priority
          sizes={size === "drawer" ? "44px" : "(min-width: 640px) 48px, 40px"}
          className="object-contain"
        />
      </div>
      <span
        aria-label="Quant Terminal"
        className={`whitespace-nowrap font-mono font-semibold uppercase leading-none tracking-[0.16em] text-[#f3f4f6] [text-shadow:0_0_18px_rgb(var(--accent-primary-rgb)/0.12)] sm:tracking-[0.28em] ${wordmarkSize}`}
      >
        Quant <span className="text-[var(--accent-primary)]">Terminal</span>
      </span>
    </div>
  );
}
