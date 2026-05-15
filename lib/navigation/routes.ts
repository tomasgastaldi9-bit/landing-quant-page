export type NavigationGroup = "Client" | "Operator" | "Research" | "Account" | "Legal";
export type DrawerTab = Extract<NavigationGroup, "Client" | "Operator" | "Research">;

export type NavigationRoute = {
  label: string;
  href: string;
  group: NavigationGroup;
  description: string;
  aliases: string[];
  keywords: string[];
  badge?: string;
  shortcut?: string;
  drawer?: "primary" | "footer";
  drawerMicrocopy?: string;
  status?: "active" | "preview" | "legal";
};

// Add new routes here so drawer and command palette stay in sync.
export const navigationRoutes: NavigationRoute[] = [
  {
    label: "Model Portfolio",
    href: "/model-portfolio",
    group: "Client",
    description: "Client-facing current model allocation",
    aliases: ["/mp", "/portfolio", "model portfolio", "portfolio"],
    keywords: ["client", "allocation", "positions", "weights", "current stance", "model"],
    badge: "MODEL",
    drawer: "primary",
    drawerMicrocopy: "model output",
  },
  {
    label: "Signals",
    href: "/signals",
    group: "Client",
    description: "Signal and rebalance history when artifacts are available",
    aliases: ["/signals", "/signal", "signals", "signal history", "rebalance history"],
    keywords: ["client", "rebalance", "orders", "decisions", "model events"],
    drawer: "primary",
    drawerMicrocopy: "model output",
  },
  {
    label: "Performance",
    href: "/performance",
    group: "Client",
    description: "Read-only performance view from telemetry history",
    aliases: ["/perf", "performance", "equity performance", "returns"],
    keywords: ["client", "equity", "drawdown", "performance history", "telemetry"],
    drawer: "primary",
    drawerMicrocopy: "model output",
  },
  {
    label: "Risk Summary",
    href: "/risk-summary",
    group: "Client",
    description: "Client-facing exposure and risk interpretation",
    aliases: ["/risk", "/risk-summary", "risk summary", "client risk", "exposure summary"],
    keywords: ["client", "risk", "exposure", "positions", "allocation"],
    badge: "RISK",
    drawer: "primary",
    drawerMicrocopy: "model output",
  },
  {
    label: "Reports",
    href: "/reports",
    group: "Client",
    description: "Prepared client report workspace",
    aliases: ["/reports", "reports", "client reports", "reporting"],
    keywords: ["client", "reports", "documents", "snapshots"],
    drawer: "primary",
    drawerMicrocopy: "model output",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    group: "Operator",
    description: "Operator workspace and terminal overview",
    aliases: ["/d", "dashboard", "terminal", "operator"],
    keywords: ["operator", "dashboard", "terminal", "overview", "telemetry"],
    badge: "READ",
    shortcut: "D",
    drawer: "primary",
    drawerMicrocopy: "system telemetry",
  },
  {
    label: "Positions",
    href: "/dashboard#positions",
    group: "Operator",
    description: "Active positions table",
    aliases: ["/p", "/positions", "positions", "position", "exposure"],
    keywords: ["operator", "positions", "exposure", "open positions", "dashboard"],
    shortcut: "P",
    drawer: "primary",
    drawerMicrocopy: "system telemetry",
  },
  {
    label: "Monitoring",
    href: "/monitoring",
    group: "Operator",
    description: "System health and observability",
    aliases: ["/m", "monitoring", "monitor", "observability", "health"],
    keywords: ["operator", "telemetry", "health", "alerts", "status"],
    badge: "OPS",
    shortcut: "M",
    drawer: "primary",
    drawerMicrocopy: "system telemetry",
  },
  {
    label: "Risk Layer",
    href: "/risk-layer",
    group: "Operator",
    description: "Policy engine and exposure controls",
    aliases: ["/r", "risk layer", "policy"],
    keywords: ["operator", "risk", "controls", "policy", "exposure", "safeguards"],
    badge: "RISK",
    shortcut: "R",
    drawer: "primary",
    drawerMicrocopy: "system telemetry",
  },
  {
    label: "Execution",
    href: "/demo-testnet",
    group: "Operator",
    description: "No real capital, testnet execution, and validation scope",
    aliases: ["/execution", "execution", "testnet", "demo testnet"],
    keywords: ["operator", "execution", "orders", "demo", "testnet", "no real capital"],
    drawer: "primary",
    drawerMicrocopy: "system telemetry",
  },
  {
    label: "Alpha Lab",
    href: "/alpha-lab",
    group: "Research",
    description: "Research workspace and candidate registry",
    aliases: ["/a", "alpha", "alpha lab", "research"],
    keywords: ["research", "candidates", "regime", "validation", "alpha"],
    badge: "LAB",
    shortcut: "A",
    drawer: "primary",
    drawerMicrocopy: "alpha validation",
  },
  {
    label: "Alpha Engine",
    href: "/alpha-engine",
    group: "Research",
    description: "Multi-alpha architecture explainer",
    aliases: ["alpha engine", "engine"],
    keywords: ["research", "sleeves", "multi-alpha", "architecture"],
    badge: "R&D",
    drawer: "primary",
    drawerMicrocopy: "alpha validation",
  },
  {
    label: "Methodology",
    href: "/methodology",
    group: "Research",
    description: "Research-first validation and deployment discipline",
    aliases: ["methodology", "research methodology", "validation"],
    keywords: ["research", "backtest", "walk-forward", "paper", "validation"],
    drawer: "primary",
    drawerMicrocopy: "alpha validation",
  },
  {
    label: "Login",
    href: "/login",
    group: "Account",
    description: "Authentication preview. No account is created.",
    aliases: ["login", "sign in", "access"],
    keywords: ["account", "auth preview", "client access"],
    drawer: "footer",
    status: "preview",
  },
  {
    label: "Register",
    href: "/register",
    group: "Account",
    description: "Private beta registration preview",
    aliases: ["register", "sign up", "create account"],
    keywords: ["account", "auth preview", "beta access"],
    drawer: "footer",
    status: "preview",
  },
  {
    label: "Settings",
    href: "/settings",
    group: "Account",
    description: "Mock preferences, data mode, and read-only access controls",
    aliases: ["/s", "settings", "workspace settings", "preferences"],
    keywords: ["account", "workspace", "theme", "preferences"],
    shortcut: "S",
    drawer: "footer",
    status: "preview",
  },
  {
    label: "Request Access",
    href: "/request-access",
    group: "Account",
    description: "Private beta onboarding",
    aliases: ["/access", "/request", "access", "request", "waitlist"],
    keywords: ["account", "private beta", "onboarding", "request access"],
    drawer: "footer",
    status: "preview",
  },
  {
    label: "Terms",
    href: "/legal/terms",
    group: "Legal",
    description: "QuantBot terms and service boundaries",
    aliases: ["terms", "terms of service"],
    keywords: ["legal", "terms", "service", "boundaries"],
    drawer: "footer",
    status: "legal",
  },
  {
    label: "Risk Disclosure",
    href: "/legal/risk-disclosure",
    group: "Legal",
    description: "Research, demo, and trading risk disclosure",
    aliases: ["risk disclosure", "disclosure", "legal risk"],
    keywords: ["legal", "risk", "disclosure", "crypto", "not financial advice"],
    badge: "LEGAL",
    drawer: "footer",
    status: "legal",
  },
  {
    label: "Privacy",
    href: "/legal/privacy",
    group: "Legal",
    description: "Privacy notice for the current beta product state",
    aliases: ["privacy", "privacy policy"],
    keywords: ["legal", "privacy", "data", "forms"],
    drawer: "footer",
    status: "legal",
  },
];

export const primaryDrawerGroups = (["Client", "Operator", "Research"] as const).map(
  (group) => ({
    label: group,
    microcopy:
      navigationRoutes.find(
        (route) => route.group === group && route.drawer === "primary",
      )?.drawerMicrocopy ?? "",
    items: navigationRoutes.filter(
      (route) => route.group === group && route.drawer === "primary",
    ),
  }),
);

export const footerNavigationRoutes = navigationRoutes.filter(
  (route) => route.drawer === "footer",
);

export function getDrawerTabForPath(pathname: string): DrawerTab {
  const match = primaryDrawerGroups.find((group) =>
    group.items.some((route) => {
      const routeHref = route.href.split("#")[0];
      return pathname === routeHref || pathname.startsWith(`${routeHref}/`);
    }),
  );

  return match?.label ?? "Operator";
}
