import { BrandMark } from "./brand-mark";

const navItems = ["Platform", "Strategies", "Risk Controls", "About"];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#243042] bg-[#0b0b0b]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#" aria-label="QuantBot home">
          <BrandMark />
        </a>
        <nav className="hidden items-center gap-9 md:flex">
          {navItems.map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className={`text-sm transition-colors hover:text-[#63f7ff] ${
                index === 0
                  ? "border-b border-[#63f7ff] pb-1 text-[#63f7ff]"
                  : "text-[#c2c6d8]"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden text-sm text-[#c2c6d8] transition-colors hover:text-white sm:inline"
          >
            Login
          </a>
          <a
            href="#contact"
            className="border border-[#568dff] bg-[#0058cb] px-4 py-3 text-sm font-medium text-white shadow-[0_0_16px_rgba(86,141,255,0.28)] transition hover:brightness-110 sm:px-6"
          >
            Launch Terminal
          </a>
        </div>
      </div>
    </header>
  );
}
