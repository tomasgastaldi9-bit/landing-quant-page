import { BrandMark } from "./brand-mark";

const footerLinks = ["Terms of Service", "Risk Disclosure", "Privacy Policy"];

export function Footer() {
  return (
    <footer className="bg-[#131313]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <BrandMark />
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {footerLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-mono text-xs text-[#c2c6d8] transition hover:text-[var(--accent-primary)]"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="font-mono text-xs uppercase text-[#c2c6d8]">
            (c) 2026 QuantBot. Private beta research terminal.
          </div>
        </div>
        <div className="border-t border-[#243042] pt-6 font-mono text-xs leading-6 text-[#8c90a1]">
          For research and informational purposes. Not financial advice.
          Performance is not guaranteed.
        </div>
      </div>
    </footer>
  );
}
