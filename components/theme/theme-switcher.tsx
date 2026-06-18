"use client";

import { useEffect, useState } from "react";

import {
  accentThemes,
  applyAccentTheme,
  findAccentTheme,
  initializeStoredAccentTheme,
} from "@/components/theme/accent-themes";

export function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState("Cyan");

  useEffect(() => {
    function handleThemeEvent(event: Event) {
      const themeName = (event as CustomEvent<{ themeName?: string }>).detail
        ?.themeName;

      if (themeName) {
        const theme = findAccentTheme(themeName);

        if (theme) {
          setActiveTheme(theme.name);
        }
      }
    }

    window.addEventListener("quantbot:accent-theme-change", handleThemeEvent);
    initializeStoredAccentTheme({ notify: true });

    return () => {
      window.removeEventListener(
        "quantbot:accent-theme-change",
        handleThemeEvent,
      );
    };
  }, []);

  function handleThemeChange(theme: (typeof accentThemes)[number]) {
    applyAccentTheme(theme);
  }

  return (
    <aside className="fixed bottom-4 right-4 z-[70] hidden max-h-[min(78vh,620px)] w-[236px] rounded-2xl border border-[#243042] bg-[#050505]/92 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_50px_rgba(0,0,0,0.34)] backdrop-blur-md lg:block">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8c90a1]">
        Accent Lab
      </div>
      <div className="grid max-h-[calc(min(78vh,620px)-54px)] gap-1.5 overflow-y-auto pr-1">
        {accentThemes.map((theme) => {
          const isActive = theme.name === activeTheme;

          return (
            <button
              key={theme.name}
              type="button"
              onClick={() => handleThemeChange(theme)}
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
