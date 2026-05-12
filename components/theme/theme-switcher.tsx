"use client";

import { useState } from "react";

const themes = [
  {
    name: "Cyan",
    swatch: "#63f7ff",
    variables: {
      "--accent-primary": "#63f7ff",
      "--accent-primary-rgb": "99 247 255",
      "--accent-secondary": "#568dff",
      "--accent-secondary-rgb": "86 141 255",
      "--accent-strong": "#0058cb",
      "--accent-soft": "#061719",
      "--accent-soft-rgb": "6 23 25",
      "--accent-surface": "#071314",
      "--accent-muted": "#9dbaff",
    },
  },
  {
    name: "Blue",
    swatch: "#7da7ff",
    variables: {
      "--accent-primary": "#7da7ff",
      "--accent-primary-rgb": "125 167 255",
      "--accent-secondary": "#4f7dff",
      "--accent-secondary-rgb": "79 125 255",
      "--accent-strong": "#214fd1",
      "--accent-soft": "#081225",
      "--accent-soft-rgb": "8 18 37",
      "--accent-surface": "#071020",
      "--accent-muted": "#b7c9ff",
    },
  },
  {
    name: "Teal",
    swatch: "#55f0d4",
    variables: {
      "--accent-primary": "#55f0d4",
      "--accent-primary-rgb": "85 240 212",
      "--accent-secondary": "#2faaa3",
      "--accent-secondary-rgb": "47 170 163",
      "--accent-strong": "#13746f",
      "--accent-soft": "#061c1a",
      "--accent-soft-rgb": "6 28 26",
      "--accent-surface": "#071816",
      "--accent-muted": "#a4efe3",
    },
  },
  {
    name: "Ice",
    swatch: "#d8ecff",
    variables: {
      "--accent-primary": "#d8ecff",
      "--accent-primary-rgb": "216 236 255",
      "--accent-secondary": "#98b9d6",
      "--accent-secondary-rgb": "152 185 214",
      "--accent-strong": "#5f85aa",
      "--accent-soft": "#0d151c",
      "--accent-soft-rgb": "13 21 28",
      "--accent-surface": "#0c141a",
      "--accent-muted": "#dce8f3",
    },
  },
] as const;

export function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState("Cyan");

  function applyTheme(theme: (typeof themes)[number]) {
    Object.entries(theme.variables).forEach(([name, value]) => {
      document.documentElement.style.setProperty(name, value);
    });
    document.documentElement.style.setProperty(
      "--accent-border",
      "rgb(var(--accent-primary-rgb) / 0.4)",
    );
    document.documentElement.style.setProperty(
      "--accent-glow",
      "rgb(var(--accent-primary-rgb) / 0.12)",
    );
    setActiveTheme(theme.name);
  }

  return (
    <aside className="fixed bottom-4 right-4 z-[70] hidden rounded-2xl border border-[#243042] bg-[#050505]/90 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_50px_rgba(0,0,0,0.34)] backdrop-blur-md lg:block">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8c90a1]">
        Accent Lab
      </div>
      <div className="grid gap-2">
        {themes.map((theme) => {
          const isActive = theme.name === activeTheme;

          return (
            <button
              key={theme.name}
              type="button"
              onClick={() => applyTheme(theme)}
              className={`flex items-center gap-3 rounded-xl border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition duration-200 hover:-translate-y-px hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] ${
                isActive
                  ? "border-[var(--accent-primary)] bg-[var(--accent-soft)]/70 text-[var(--accent-primary)]"
                  : "border-[#243042] bg-[#0e0e0e]/82 text-[#c2c6d8]"
              }`}
            >
              <span
                className="size-2.5 rounded-full border border-white/20"
                style={{ backgroundColor: theme.swatch }}
              />
              {theme.name}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
