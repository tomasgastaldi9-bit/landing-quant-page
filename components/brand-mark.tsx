import Image from "next/image";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`relative shrink-0 ${
          compact ? "size-12" : "size-14 sm:size-16"
        }`}
      >
        <Image
          src="/quantbot-symbol-light-eyes-v2.png"
          alt=""
          fill
          priority={!compact}
          sizes={compact ? "48px" : "(min-width: 640px) 64px, 56px"}
          className="object-contain"
        />
      </div>
      <span
        className={`bg-gradient-to-r from-white via-[#b0c6ff] to-[#63f7ff] bg-clip-text font-semibold tracking-normal text-transparent ${
          compact ? "text-2xl" : "text-2xl sm:text-3xl"
        }`}
      >
        QuantBot
      </span>
    </div>
  );
}
