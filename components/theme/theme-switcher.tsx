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
  {
    name: "Emerald Terminal",
    swatch: "#67e8a8",
    variables: {
      "--accent-primary": "#67e8a8",
      "--accent-primary-rgb": "103 232 168",
      "--accent-secondary": "#2bbf9a",
      "--accent-secondary-rgb": "43 191 154",
      "--accent-strong": "#0f7a5c",
      "--accent-soft": "#071a13",
      "--accent-soft-rgb": "7 26 19",
      "--accent-surface": "#081611",
      "--accent-muted": "#b7f2cf",
    },
  },
  {
    name: "Deep Violet",
    swatch: "#b9a7ff",
    variables: {
      "--accent-primary": "#b9a7ff",
      "--accent-primary-rgb": "185 167 255",
      "--accent-secondary": "#7f6bf2",
      "--accent-secondary-rgb": "127 107 242",
      "--accent-strong": "#4e3ab8",
      "--accent-soft": "#120f24",
      "--accent-soft-rgb": "18 15 36",
      "--accent-surface": "#100d1f",
      "--accent-muted": "#d2c9ff",
    },
  },
  {
    name: "Amber/Gold",
    swatch: "#f4c96a",
    variables: {
      "--accent-primary": "#f4c96a",
      "--accent-primary-rgb": "244 201 106",
      "--accent-secondary": "#c99332",
      "--accent-secondary-rgb": "201 147 50",
      "--accent-strong": "#8a5f16",
      "--accent-soft": "#1d1508",
      "--accent-soft-rgb": "29 21 8",
      "--accent-surface": "#171107",
      "--accent-muted": "#f2d99a",
    },
  },
  {
    name: "Graphite",
    swatch: "#c8ced8",
    variables: {
      "--accent-primary": "#c8ced8",
      "--accent-primary-rgb": "200 206 216",
      "--accent-secondary": "#8c96a8",
      "--accent-secondary-rgb": "140 150 168",
      "--accent-strong": "#5d6674",
      "--accent-soft": "#111318",
      "--accent-soft-rgb": "17 19 24",
      "--accent-surface": "#0f1115",
      "--accent-muted": "#e4e7ed",
    },
  },
  {
    name: "Crimson Risk",
    swatch: "#f28b95",
    variables: {
      "--accent-primary": "#f28b95",
      "--accent-primary-rgb": "242 139 149",
      "--accent-secondary": "#c75c68",
      "--accent-secondary-rgb": "199 92 104",
      "--accent-strong": "#8e2f3b",
      "--accent-soft": "#1d0c10",
      "--accent-soft-rgb": "29 12 16",
      "--accent-surface": "#170a0d",
      "--accent-muted": "#f3b5bd",
    },
  },
  {
    name: "Arctic Blue",
    swatch: "#9ed8ff",
    variables: {
      "--accent-primary": "#9ed8ff",
      "--accent-primary-rgb": "158 216 255",
      "--accent-secondary": "#5aa7e8",
      "--accent-secondary-rgb": "90 167 232",
      "--accent-strong": "#2b6fa8",
      "--accent-soft": "#071521",
      "--accent-soft-rgb": "7 21 33",
      "--accent-surface": "#07111c",
      "--accent-muted": "#c8e8ff",
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
    <aside className="fixed bottom-4 right-4 z-[70] hidden max-h-[min(78vh,620px)] w-[236px] rounded-2xl border border-[#243042] bg-[#050505]/92 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_50px_rgba(0,0,0,0.34)] backdrop-blur-md lg:block">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8c90a1]">
        Accent Lab
      </div>
      <div className="grid max-h-[calc(min(78vh,620px)-54px)] gap-1.5 overflow-y-auto pr-1">
        {themes.map((theme) => {
          const isActive = theme.name === activeTheme;

          return (
            <button
              key={theme.name}
              type="button"
              onClick={() => applyTheme(theme)}
              aria-pressed={isActive}
              className={`flex items-center gap-3 rounded-xl border px-2.5 py-2 font-mono text-[10px] uppercase tracking-[0.1em] transition duration-200 hover:-translate-y-px hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] ${
                isActive
                  ? "border-[var(--accent-primary)] bg-[var(--accent-soft)]/70 text-[var(--accent-primary)]"
                  : "border-[#243042] bg-[#0e0e0e]/82 text-[#c2c6d8]"
              }`}
            >
              <span
                className="size-2.5 shrink-0 rounded-full border border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.08)]"
                style={{ backgroundColor: theme.swatch }}
              />
              <span className="min-w-0 flex-1 truncate text-left">{theme.name}</span>
              {isActive ? (
                <span className="font-mono text-[9px] text-[var(--accent-primary)]">
                  ON
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
