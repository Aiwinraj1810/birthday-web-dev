import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Caveat } from "next/font/google";
import { birthday } from "@/data/birthday";
import "./globals.css";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

// Used sparingly: handwritten annotations only.
const script = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL to the deployed address so the preview image link is absolute.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: birthday.meta.title,
  description: birthday.meta.description,
  openGraph: { title: birthday.meta.title, description: birthday.meta.description, type: "website" },
  twitter: { card: "summary_large_image", title: birthday.meta.title, description: birthday.meta.description },
  // A private gift: keep it out of search results.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#fbefe1",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
