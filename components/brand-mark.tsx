import Image from "next/image";

const logoSrc = "/branding/quantbot-logo-v2.png";
const iconSrc = "/branding/quantbot-icon-v2.png";

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
          src={iconSrc}
          alt="QuantBot"
          fill
          sizes="44px"
          className="object-contain"
        />
      </div>
    );
  }

  const logoSize =
    size === "drawer"
      ? "h-10 w-[174px] sm:h-11 sm:w-[192px]"
      : "h-11 w-[190px] sm:h-[52px] sm:w-[226px]";

  return (
    <div className={`relative min-w-0 shrink-0 ${logoSize}`}>
      <Image
        src={logoSrc}
        alt="QuantBot"
        fill
        priority
        sizes={size === "drawer" ? "192px" : "(min-width: 640px) 226px, 190px"}
        className="object-contain object-left"
      />
    </div>
  );
}
