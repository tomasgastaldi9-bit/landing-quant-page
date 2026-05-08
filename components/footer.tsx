import { BrandMark } from "./brand-mark";

const footerLinks = ["Terms of Service", "Risk Disclosure", "Privacy Policy"];

export function Footer() {
  return (
    <footer className="bg-[#131313]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <BrandMark />
        <div className="flex flex-wrap gap-6">
          {footerLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="font-mono text-xs text-[#c2c6d8] transition hover:text-[#63f7ff]"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="font-mono text-xs uppercase text-[#c2c6d8]">
          (c) 2026 QuantBot. Institutional grade execution.
        </div>
      </div>
    </footer>
  );
}
