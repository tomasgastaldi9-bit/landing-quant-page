"use client";

import { useEffect, useState } from "react";

import {
  accentThemes,
  applyAccentTheme,
  findAccentTheme,
  initializeStoredAccentTheme,
} from "@/components/theme/accent-themes";

export function SettingsThemePreferences() {
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
    <div className="grid gap-3 sm:grid-cols-2">
      {accentThemes.map((theme) => {
        const active = theme.name === activeTheme;

        return (
          <button
            aria-pressed={active}
            className={`rounded-2xl border p-4 text-left transition duration-200 hover:-translate-y-px hover:border-[var(--accent-primary)]/50 ${
              active
                ? "border-[var(--accent-primary)]/46 bg-[var(--accent-soft)]"
                : "border-[#1f1f1f]/90 bg-[#050505]/58"
            }`}
            key={theme.name}
            onClick={() => handleThemeChange(theme)}
            type="button"
          >
            <div
              className="h-10 rounded-xl"
              style={{
                background: `linear-gradient(90deg, ${theme.swatch}, ${theme.variables["--accent-secondary"]})`,
              }}
            />
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-white">
                {theme.name}
              </span>
              <span
                className={`rounded-lg border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${
                  active
                    ? "border-[var(--accent-primary)]/46 text-[var(--accent-primary)]"
                    : "border-[#243042] text-[#8c90a1]"
                }`}
              >
                {active ? "Active" : "Preview"}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
