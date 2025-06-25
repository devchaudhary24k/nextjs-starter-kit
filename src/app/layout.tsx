import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";

import { Toaster } from "@components/ui/sonner";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { siteConfig } from "@/config/site";

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
  title: {
    default: `${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Starter kit for Next.js with authentication and dashboard management",
  applicationName: siteConfig.name,
  authors: [{ name: "Dev Talan", url: "https://devtalan.com" }],
  alternates: {
    canonical: siteConfig.url,
  },
  category: "Starter Kit",
  creator: "Dev Talan",
  keywords: ["Starter Kit", "Next.js"],
  manifest: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script src="https://unpkg.com/react-scan/dist/auto.global.js" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
