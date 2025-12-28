import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/header";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { QueryProvider } from "@/lib/providers/query-provider";
import { AppErrorBoundary } from "@/components/common/error-boundary";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import { I18nProvider } from "@/lib/providers/i18n-provider";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SpeechRecognitionProvider } from "@/lib/providers/speech-recognition-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${ibmPlexSans.variable} antialiased`}>
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <I18nProvider>
              <QueryProvider>
                <SpeechRecognitionProvider>
                  <AppErrorBoundary>
                    <Header />
                    <Breadcrumbs />
                    <main className="min-h-screen">{children}</main>
                    <Toaster richColors />
                  </AppErrorBoundary>
                </SpeechRecognitionProvider>
              </QueryProvider>
            </I18nProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
