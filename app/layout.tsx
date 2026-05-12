import type { Metadata, Viewport } from "next";
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
  title: "Quant Terminal | Institutional Quant Research Platform",
  description:
    "Institutional-style frontend for demo quant research, testnet execution monitoring, and private beta access.",
  icons: {
    icon: [
      { url: "/quant-terminal-icon.png", type: "image/png", sizes: "any" },
    ],
    apple: [{ url: "/quant-terminal-icon.png", type: "image/png" }],
  },
  applicationName: "Quant Terminal",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
