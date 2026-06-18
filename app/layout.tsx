import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/navbar";
import { CommandPalette } from "@/components/command-palette";
import { DynamicFavicon } from "@/components/theme/dynamic-favicon";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://quantbot.ai",
  ),
  title: {
    default: "QuantBot | Institutional Quant Research Terminal",
    template: "%s | QuantBot",
  },
  description:
    "QuantBot is a read-only institutional quant research terminal for demo/testnet monitoring, alpha research workflows, risk telemetry, and private beta access.",
  keywords: [
    "QuantBot",
    "quant research",
    "institutional trading terminal",
    "testnet execution monitoring",
    "alpha research",
    "risk telemetry",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "512x512" }],
  },
  applicationName: "QuantBot",
  appleWebApp: {
    capable: true,
    title: "QuantBot",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "QuantBot | Institutional Quant Research Terminal",
    description:
      "Read-only demo/testnet workspace for quant research, alpha validation, risk telemetry, and operator monitoring.",
    url: "/",
    siteName: "QuantBot",
    images: [
      {
        url: "/branding/quantbot-og.png",
        width: 1200,
        height: 630,
        alt: "QuantBot institutional quant research terminal preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuantBot | Institutional Quant Research Terminal",
    description:
      "Demo/testnet quant research terminal with read-only monitoring, risk telemetry, and private beta access.",
    images: [
      {
        url: "/branding/quantbot-twitter.png",
        alt: "QuantBot institutional quant research terminal preview",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:border focus:border-[var(--accent-primary)] focus:bg-[#050505] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.14em] focus:text-[var(--accent-primary)]"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <CommandPalette />
        <DynamicFavicon />
        <ThemeSwitcher />
      </body>
    </html>
  );
}
