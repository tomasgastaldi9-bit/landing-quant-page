import { BrandMark } from "./brand-mark";

const navItems = [
  { label: "Demo/Testnet", href: "/demo-testnet" },
  { label: "Alpha Engine", href: "/alpha-engine" },
  { label: "Risk Layer", href: "/risk-layer" },
  { label: "Monitoring", href: "/monitoring" },
  { label: "Methodology", href: "/methodology" },
  { label: "Terminal Demo", href: "/dashboard" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#243042] bg-[#0b0b0b]/90 shadow-[0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:h-24 sm:px-8">
        <a className="min-w-0" href="#" aria-label="QuantBot home">
          <BrandMark />
        </a>
        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#c2c6d8] transition-colors duration-200 hover:text-[#63f7ff] xl:text-[12px]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="/request-access"
            className="hidden font-mono text-xs uppercase tracking-[0.08em] text-[#c2c6d8] transition-colors duration-200 hover:text-white md:inline"
          >
            Request Access
          </a>
          <a
            href="/dashboard"
            className="whitespace-nowrap rounded-xl border border-[#568dff] bg-[linear-gradient(135deg,#568dff,#0058cb)] px-3 py-3 text-center text-xs font-semibold text-white shadow-[0_0_16px_rgba(86,141,255,0.22)] transition duration-200 hover:-translate-y-px hover:brightness-110 sm:px-5 sm:text-sm"
          >
            Launch Terminal
          </a>
        </div>
      </div>
    </header>
  );
}
