import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Oswald } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JOLT — The city, after dark.",
  description:
    "JOLT ONE: an electric motorcycle in five chapters. 90 Nm, 180 km range, 40-minute fast charge. Scroll — the headlamp does the rest.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0d0b'/%3E%3Ctext x='32' y='44' font-family='Arial Black' font-size='36' font-weight='900' fill='%23c8ff2e' text-anchor='middle'%3EJ%3C/text%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d0b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${oswald.variable} ${inter.variable} ${plexMono.variable} grain bg-night text-bone antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:bg-volt focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-night"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Preloader />
        <Nav />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
