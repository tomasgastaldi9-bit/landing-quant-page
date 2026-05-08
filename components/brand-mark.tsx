import Image from "next/image";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
      <div
        className={`relative shrink-0 ${
          compact ? "size-11" : "size-12 sm:size-[68px]"
        }`}
      >
        <Image
          src="/quantbot-symbol-light-eyes-v2.png"
          alt=""
          fill
          priority={!compact}
          sizes={compact ? "44px" : "(min-width: 640px) 68px, 48px"}
          className="object-contain"
        />
      </div>
      <span
        className={`truncate bg-gradient-to-r from-white via-[#b0c6ff] to-[#63f7ff] bg-clip-text font-semibold tracking-normal text-transparent ${
          compact ? "text-xl" : "text-xl sm:text-[30px]"
        }`}
      >
        QuantBot
      </span>
    </div>
  );
}
