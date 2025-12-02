import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/header";
import { QueryProvider } from "@/lib/providers/query-provider";
import { AppErrorBoundary } from "@/components/common/error-boundary";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import { I18nProvider } from "@/lib/providers/i18n-provider";
import { Toaster } from "sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${ibmPlexSans.variable} antialiased`}
      >
        <ThemeProvider>
          <I18nProvider>
            <QueryProvider>
              <AppErrorBoundary>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Toaster richColors />
              </AppErrorBoundary>
            </QueryProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
