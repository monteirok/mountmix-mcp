import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "./providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Mountain Mixology | Premium Craft Cocktail Catering",
  description:
    "Mountain Mixology delivers premium craft cocktail catering throughout the Canadian Rockies with locally inspired menus and artful presentation.",
  openGraph: {
    title: "Mountain Mixology | Premium Craft Cocktail Catering",
    description:
      "Premium, locally inspired cocktail experiences for weddings, corporate events, and private celebrations across the Canadian Rockies.",
    url: "https://mountainmixology.example.com",
    siteName: "Mountain Mixology",
    locale: "en_CA",
    type: "website"
  },
  metadataBase: new URL("https://mountainmixology.example.com"),
  keywords: [
    "craft cocktail catering",
    "Canadian Rockies",
    "Canmore bartending",
    "wedding bar service",
    "premium cocktails"
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
