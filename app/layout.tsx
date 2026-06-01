import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Verify Any Nigerian Property Title in 48 Hours | Verity",
  description:
    "Verity delivers AI-powered, analyst-verified property title reports for Lagos. Detect fraud before you buy. Pay via Paystack. Get your report in 48 hours.",
  metadataBase: new URL("https://verity.properties"),
  openGraph: {
    type: "website",
    url: "https://verity.properties/",
    title: "Verify Any Nigerian Property Title in 48 Hours | Verity",
    description: "AI-powered, analyst-verified title reports for Lagos properties.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verify Any Nigerian Property Title in 48 Hours | Verity",
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
      className={cn(inter.variable, cormorantGaramond.variable, jetbrainsMono.variable)}
    >
      <body style={{ fontFamily: "var(--font-sans)" }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}