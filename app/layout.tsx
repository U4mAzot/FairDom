import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FairDom | Modern Real Estate Redefined",
  description:
    "Editorial-grade listings with transparency and low fees. Real estate fairly priced.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body
        className={`${manrope.variable} ${inter.variable} font-body antialiased text-on-surface`}
      >
        {children}
      </body>
    </html>
  );
}
