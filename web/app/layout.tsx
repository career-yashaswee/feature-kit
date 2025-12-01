import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { QueryProvider } from "@/lib/providers/query-provider";
import { AppErrorBoundary } from "@/components/error-boundary";
import { I18nProvider } from "@/lib/providers/i18n-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Feature Kit",
  description: "Niche component library for web features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <QueryProvider>
            <AppErrorBoundary>
              <Header />
              {children}
            </AppErrorBoundary>
          </QueryProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
