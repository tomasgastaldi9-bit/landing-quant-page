export type NavigationGroup = "Client" | "Operator" | "Research" | "Account" | "Legal";
export type DrawerTab = Extract<NavigationGroup, "Client" | "Operator" | "Research">;
export type NavigationAudience =
  | "client"
  | "operator"
  | "research"
  | "account"
  | "legal";

export type NavigationRoute = {
  label: string;
  href: string;
  group: NavigationGroup;
  description: string;
  aliases: string[];
  keywords: string[];
  audience?: NavigationAudience;
  badge?: string;
  shortcut?: string;
  isSearchable?: boolean;
  isDrawerVisible?: boolean;
  priority?: number;
  drawerMicrocopy?: string;
  status?: "active" | "preview" | "legal";
};

const drawerMicrocopyByGroup: Record<DrawerTab, string> = {
  Client: "Model Output",
  Operator: "Telemetry",
  Research: "Validation",
};

const audienceByGroup: Record<NavigationGroup, NavigationAudience> = {
  Client: "client",
  Operator: "operator",
  Research: "research",
  Account: "account",
  Legal: "legal",
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
    audience: "client",
    badge: "MODEL",
    drawerMicrocopy: "Model Output",
    isDrawerVisible: true,
    priority: 10,
  },
  {
    label: "Signals",
    href: "/signals",
    group: "Client",
    description: "Signal and rebalance history when artifacts are available",
    aliases: ["/signals", "/signal", "signals", "signal history", "rebalance history"],
    keywords: ["client", "rebalance", "orders", "decisions", "model events"],
    audience: "client",
    drawerMicrocopy: "Model Output",
    isDrawerVisible: true,
    priority: 20,
  },
  {
    label: "Performance",
    href: "/performance",
    group: "Client",
    description: "Read-only performance view from telemetry history",
    aliases: ["/perf", "performance", "equity performance", "returns"],
    keywords: ["client", "equity", "drawdown", "performance history", "telemetry"],
    audience: "client",
    drawerMicrocopy: "Model Output",
    isDrawerVisible: true,
    priority: 30,
  },
  {
    label: "Risk Summary",
    href: "/risk-summary",
    group: "Client",
    description: "Client-facing exposure and risk interpretation",
    aliases: ["/risk", "/risk-summary", "risk summary", "client risk", "exposure summary"],
    keywords: ["client", "risk", "exposure", "positions", "allocation"],
    audience: "client",
    badge: "RISK",
    drawerMicrocopy: "Model Output",
    isDrawerVisible: true,
    priority: 40,
  },
  {
    label: "Reports",
    href: "/reports",
    group: "Client",
    description: "Prepared client report workspace",
    aliases: ["/reports", "reports", "client reports", "reporting"],
    keywords: ["client", "reports", "documents", "snapshots"],
    audience: "client",
    drawerMicrocopy: "Model Output",
    isDrawerVisible: true,
    priority: 50,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    group: "Operator",
    description: "Operator workspace and terminal overview",
    aliases: ["/d", "dashboard", "terminal", "operator"],
    keywords: ["operator", "dashboard", "terminal", "overview", "telemetry"],
    audience: "operator",
    badge: "READ",
    shortcut: "D",
    drawerMicrocopy: "Telemetry",
    isDrawerVisible: true,
    priority: 10,
  },
  {
    label: "Positions",
    href: "/dashboard#positions",
    group: "Operator",
    description: "Active positions table",
    aliases: ["/p", "/positions", "positions", "position", "exposure"],
    keywords: ["operator", "positions", "exposure", "open positions", "dashboard"],
    audience: "operator",
    shortcut: "P",
    drawerMicrocopy: "Telemetry",
    isDrawerVisible: true,
    priority: 20,
  },
  {
    label: "Monitoring",
    href: "/monitoring",
    group: "Operator",
    description: "System health and observability",
    aliases: ["/m", "monitoring", "monitor", "observability", "health"],
    keywords: ["operator", "telemetry", "health", "alerts", "status"],
    audience: "operator",
    badge: "OPS",
    shortcut: "M",
    drawerMicrocopy: "Telemetry",
    isDrawerVisible: true,
    priority: 30,
  },
  {
    label: "Risk Layer",
    href: "/risk-layer",
    group: "Operator",
    description: "Policy engine and exposure controls",
    aliases: ["/r", "risk layer", "policy"],
    keywords: ["operator", "risk", "controls", "policy", "exposure", "safeguards"],
    audience: "operator",
    badge: "RISK",
    shortcut: "R",
    drawerMicrocopy: "Telemetry",
    isDrawerVisible: true,
    priority: 40,
  },
  {
    label: "Execution",
    href: "/demo-testnet",
    group: "Operator",
    description: "No real capital, testnet execution, and validation scope",
    aliases: ["/execution", "execution", "testnet", "demo testnet"],
    keywords: ["operator", "execution", "orders", "demo", "testnet", "no real capital"],
    audience: "operator",
    drawerMicrocopy: "Telemetry",
    isDrawerVisible: true,
    priority: 50,
  },
  {
    label: "Alpha Lab",
    href: "/alpha-lab",
    group: "Research",
    description: "Research workspace and candidate registry",
    aliases: ["/a", "alpha", "alpha lab", "research"],
    keywords: ["research", "candidates", "regime", "validation", "alpha"],
    audience: "research",
    badge: "LAB",
    shortcut: "A",
    drawerMicrocopy: "Validation",
    isDrawerVisible: true,
    priority: 10,
  },
  {
    label: "Alpha Engine",
    href: "/alpha-engine",
    group: "Research",
    description: "Multi-alpha architecture explainer",
    aliases: ["alpha engine", "engine"],
    keywords: ["research", "sleeves", "multi-alpha", "architecture"],
    audience: "research",
    badge: "R&D",
    drawerMicrocopy: "Validation",
    isDrawerVisible: true,
    priority: 20,
  },
  {
    label: "Methodology",
    href: "/methodology",
    group: "Research",
    description: "Research-first validation and deployment discipline",
    aliases: ["methodology", "research methodology", "validation"],
    keywords: ["research", "backtest", "walk-forward", "paper", "validation"],
    audience: "research",
    drawerMicrocopy: "Validation",
    isDrawerVisible: true,
    priority: 30,
  },
  {
    label: "Login",
    href: "/login",
    group: "Account",
    description: "Authentication preview. No account is created.",
    aliases: ["login", "sign in", "access"],
    keywords: ["account", "auth preview", "client access"],
    audience: "account",
    isDrawerVisible: true,
    priority: 10,
    status: "preview",
  },
  {
    label: "Register",
    href: "/register",
    group: "Account",
    description: "Private beta registration preview",
    aliases: ["register", "sign up", "create account"],
    keywords: ["account", "auth preview", "beta access"],
    audience: "account",
    isDrawerVisible: true,
    priority: 20,
    status: "preview",
  },
  {
    label: "Settings",
    href: "/settings",
    group: "Account",
    description: "Mock preferences, data mode, and read-only access controls",
    aliases: ["/s", "settings", "workspace settings", "preferences"],
    keywords: ["account", "workspace", "theme", "preferences"],
    audience: "account",
    shortcut: "S",
    isDrawerVisible: true,
    priority: 30,
    status: "preview",
  },
  {
    label: "Request Access",
    href: "/request-access",
    group: "Account",
    description: "Private beta onboarding",
    aliases: ["/access", "/request", "access", "request", "waitlist"],
    keywords: ["account", "private beta", "onboarding", "request access"],
    audience: "account",
    isDrawerVisible: true,
    priority: 40,
    status: "preview",
  },
  {
    label: "Terms",
    href: "/legal/terms",
    group: "Legal",
    description: "QuantBot terms and service boundaries",
    aliases: ["terms", "terms of service"],
    keywords: ["legal", "terms", "service", "boundaries"],
    audience: "legal",
    isDrawerVisible: true,
    priority: 10,
    status: "legal",
  },
  {
    label: "Risk Disclosure",
    href: "/legal/risk-disclosure",
    group: "Legal",
    description: "Research, demo, and trading risk disclosure",
    aliases: ["risk disclosure", "disclosure", "legal risk"],
    keywords: ["legal", "risk", "disclosure", "crypto", "not financial advice"],
    audience: "legal",
    badge: "LEGAL",
    isDrawerVisible: true,
    priority: 20,
    status: "legal",
  },
  {
    label: "Privacy",
    href: "/legal/privacy",
    group: "Legal",
    description: "Privacy notice for the current beta product state",
    aliases: ["privacy", "privacy policy"],
    keywords: ["legal", "privacy", "data", "forms"],
    audience: "legal",
    isDrawerVisible: true,
    priority: 30,
    status: "legal",
  },
];

function byPriority(left: NavigationRoute, right: NavigationRoute) {
  return (left.priority ?? 100) - (right.priority ?? 100);
}

export function getRouteAudience(route: NavigationRoute) {
  return route.audience ?? audienceByGroup[route.group];
}

export function isRouteSearchable(route: NavigationRoute) {
  return route.isSearchable !== false;
}

export function isRouteDrawerVisible(route: NavigationRoute) {
  return route.isDrawerVisible !== false;
}

export function getNavigationSearchText(route: NavigationRoute) {
  return [
    route.label,
    route.href,
    route.group,
    getRouteAudience(route),
    route.description,
    route.shortcut,
    ...(route.aliases ?? []),
    ...(route.keywords ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export const searchableNavigationRoutes = navigationRoutes
  .filter(isRouteSearchable)
  .sort(byPriority);

export const drawerNavigationRoutes = navigationRoutes
  .filter(isRouteDrawerVisible)
  .sort(byPriority);

export const primaryDrawerGroups = (["Client", "Operator", "Research"] as const).map(
  (group) => ({
    label: group,
    microcopy: drawerMicrocopyByGroup[group],
    items: drawerNavigationRoutes.filter(
      (route) => route.group === group && getRouteAudience(route) === audienceByGroup[group],
    ),
  }),
);

export const footerNavigationRoutes = drawerNavigationRoutes.filter(
  (route) => route.group === "Account" || route.group === "Legal",
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
