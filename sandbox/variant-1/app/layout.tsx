import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryProvider } from "@/lib/providers/query-provider";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import { SpeechRecognitionProvider } from "@/lib/providers/speech-recognition-provider";
import { DemoHeader } from "@/components/demo-header";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sandbox Variant 1",
  description: "Sandbox Variant 1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexSans.variable} antialiased`}>
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <SpeechRecognitionProvider>
                <div className="relative grid min-h-screen grid-cols-[1fr_auto_1fr] grid-rows-[1fr_1px_auto_1px_1fr] bg-white [--pattern-fg:var(--color-gray-950)]/5 dark:bg-gray-950 dark:[--pattern-fg:var(--color-white)]/10">
                  {/* Content area - column 2, row 3 */}
                  <div className="col-start-2 row-start-3 flex w-[80vw] flex-col">
                    <DemoHeader />
                    <div className="relative">{children}</div>
                  </div>

                  {/* Left decorative border - column 1, spans all rows, fills from screen edge to content */}
                  <div className="relative -right-px col-start-1 row-span-full row-start-1 w-full border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed pointer-events-none" />

                  {/* Right decorative border - column 3, spans all rows, fills from content to screen edge */}
                  <div className="relative -left-px col-start-3 row-span-full row-start-1 w-full border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed pointer-events-none" />
                </div>

                <Toaster richColors position="top-right" />
              </SpeechRecognitionProvider>
            </QueryProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
