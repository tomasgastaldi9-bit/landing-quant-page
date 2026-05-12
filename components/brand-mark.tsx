import Image from "next/image";

export function BrandMark({ compact = false }: { compact?: boolean }) {
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

  return (
    <div className="relative h-8 w-[150px] shrink-0 sm:h-12 sm:w-[270px]">
      <Image
        src="/quant-terminal-logo-horizontal.png"
        alt="Quant Terminal"
        fill
        priority
        sizes="(min-width: 640px) 270px, 150px"
        className="object-contain object-left"
      />
    </div>
  );
}
