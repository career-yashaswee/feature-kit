"use client";

import Link from "next/link";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function DemoHeader() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-lg font-semibold transition-colors hover:text-primary cursor-pointer"
          >
            FeatureKit Previews
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <AnimatedThemeToggler className="h-9 w-9" />
        </div>
      </div>
    </header>
  );
}
