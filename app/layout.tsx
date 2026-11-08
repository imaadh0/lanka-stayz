import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/shell";
export const metadata: Metadata = {
  title: {
    default: "Lanka Stayz — Somewhere that feels like you",
    template: "%s | Lanka Stayz",
  },
  description:
    "Discover a considered collection of villas, beach houses and hillside hideaways across Sri Lanka. Find somewhere that feels like you.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
