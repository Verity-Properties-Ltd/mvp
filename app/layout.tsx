import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono, DM_Sans, Tenor_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./Providers";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const tenorSans = Tenor_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Verify Any Nigerian Property Title | Verity",
  description:
    "Verity delivers analyst-verified property title reports for Lagos. Detect fraud before you buy. Pay via Paystack. Standard reports in 7 business days, Premium in 3.",
  metadataBase: new URL("https://verity.properties"),
  openGraph: {
    type: "website",
    url: "https://verity.properties/",
    title: "Verify Any Nigerian Property Title | Verity",
    description: "Analyst-verified title reports for Lagos properties. Standard: 7 business days. Premium: 3 business days.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verify Any Nigerian Property Title | Verity",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        dmSans.variable,
        cormorantGaramond.variable,
        dmMono.variable,
        tenorSans.variable
      )}
    >
      <body style={{ fontFamily: "var(--font-sans)" }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}