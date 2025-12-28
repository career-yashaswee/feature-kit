"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Zap } from "lucide-react";
import { ScrollableBreadcrumb } from "@/features/scrollable-breadcrumbs";
import type { BreadcrumbItem } from "@/features/scrollable-breadcrumbs/types";
import { generateBreadcrumbItems } from "@/lib/utils/breadcrumb";

export function Breadcrumbs() {
  const pathname = usePathname();

  const breadcrumbItems = useMemo<BreadcrumbItem[]>(() => {
    return generateBreadcrumbItems(pathname || "/", Home, Zap);
  }, [pathname]);

  const renderBreadcrumbLink = (
    item: BreadcrumbItem,
    children: React.ReactNode
  ) => {
    return (
      <Link
        href={item.href}
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
      >
        {children}
      </Link>
    );
  };

  return (
    <div className="mx-auto">
      <ScrollableBreadcrumb
        items={breadcrumbItems}
        renderLink={renderBreadcrumbLink}
        className="h-9"
      />
    </div>
  );
}
