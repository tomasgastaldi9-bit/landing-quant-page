export const accentThemes = [
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
    name: "Institutional Blue",
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
    name: "Deep Teal",
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
    name: "Silver / Ice",
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
    name: "Graphite/Monochrome",
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

export type AccentTheme = (typeof accentThemes)[number];

export const accentThemeStorageKey = "quantbot-accent-theme";

export function findAccentTheme(themeName: string | null) {
  return accentThemes.find((theme) => theme.name === themeName);
}

export function getStoredAccentTheme() {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    return findAccentTheme(window.localStorage.getItem(accentThemeStorageKey));
  } catch {
    return undefined;
  }
}

export function applyAccentTheme(
  theme: AccentTheme,
  options: { persist?: boolean; notify?: boolean } = {},
) {
  const persist = options.persist ?? true;
  const notify = options.notify ?? true;

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
  document.documentElement.dataset.accentTheme = theme.name;

  if (persist) {
    try {
      window.localStorage.setItem(accentThemeStorageKey, theme.name);
    } catch {
      // Theme switching should still work when storage is unavailable.
    }
  }

  if (notify) {
    window.dispatchEvent(
      new CustomEvent("quantbot:accent-theme-change", {
        detail: { themeName: theme.name },
      }),
    );
  }
}

export function initializeStoredAccentTheme(
  options: { notify?: boolean } = {},
) {
  const storedTheme = getStoredAccentTheme();

  if (storedTheme) {
    applyAccentTheme(storedTheme, {
      notify: options.notify ?? false,
      persist: false,
    });
  }

  return storedTheme;
}
