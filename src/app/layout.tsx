import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Script from "next/script";

import "@/styles/globals.css";

// import AuthProvider from "@/components/providers/AuthProvider";

// Font sans-serif (al posto di Geist)
const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Font monospace (al posto di Geist_Mono)
const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Safescale | Web Agency",
  description: "Web Agency specializzata in e-commerce, Meta Ads, funnel di vendita e strategie digitali. Modello revenue share: zero budget anticipato, zero rischi. Scaliamo il tuo business online.",
  keywords: ["web agency", "e-commerce", "Meta Ads", "Facebook Ads", "Instagram Ads", "funnel di vendita", "digital marketing", "revenue share", "agenzia digital", "marketing online", "crescita e-commerce", "advertising", "Italia"],
  authors: [{ name: "SafeScale Agency" }],
  creator: "SafeScale Agency",
  openGraph: {
    title: "Safescale | Web Agency",
    description: "Web Agency specializzata in e-commerce, Meta Ads e strategie digitali. Zero budget anticipato, zero rischi. Scaliamo il tuo business online.",
    url: "https://www.safescale.it",
    siteName: "SafeScale Agency",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Safescale | Web Agency",
    description: "Web Agency specializzata in e-commerce, Meta Ads e strategie digitali. Zero budget anticipato, zero rischi.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/favicon.ico" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-93QXK3TYFP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-93QXK3TYFP');
          `}
        </Script>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <AuthProvider> */}
          {children}
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
