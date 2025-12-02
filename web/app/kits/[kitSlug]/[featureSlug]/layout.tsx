"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useKitFeatures } from "@/features/kits/hooks/use-kit-features";
import { useFeature } from "@/features/features/hooks/use-feature";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TableOfContents } from "@/features/table-of-contents/components/table-of-contents";
import { TableOfContentsProvider } from "@/features/table-of-contents/components/table-of-contents-provider";
import { useTableOfContents } from "@/features/table-of-contents/hooks/use-table-of-contents";
import { useSelectedVariantData } from "@/features/variants/hooks/use-selected-variant-data";

type FeatureLayoutProps = {
  children: React.ReactNode;
};

function TOCSidebar({
  items,
}: {
  items: ReturnType<typeof useTableOfContents>;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="hidden lg:block w-64 shrink-0 border-l bg-background">
      <TableOfContents items={items} />
    </aside>
  );
}

export default function FeatureLayout({ children }: FeatureLayoutProps) {
  const params = useParams();
  const { t } = useTranslation();
  const kitSlug = typeof params.kitSlug === "string" ? params.kitSlug : "";
  const featureSlug =
    typeof params.featureSlug === "string" ? params.featureSlug : "";
  const { data: kitFeatures = [] } = useKitFeatures(kitSlug);
  const { data: feature } = useFeature(kitSlug, featureSlug);
  const { selectedVariant } = useSelectedVariantData(feature?.id);
  const tocItems = useTableOfContents(selectedVariant?.markdown_content || "");

  const kitName =
    kitFeatures[0]?.kit?.name ??
    (kitSlug ? kitSlug.replace(/-/g, " ") : t("kit.otherFeatures"));

  return (
    <TableOfContentsProvider items={tocItems}>
      <SidebarProvider>
        <Sidebar
          variant="sidebar"
          className="top-16 flex flex-col [&>[data-slot=sidebar-container]]:!h-[calc(100vh-4rem)] [&>[data-slot=sidebar-container]]:!top-16 [&>[data-slot=sidebar-container]]:!bottom-auto [&>[data-slot=sidebar-container]]:!inset-y-auto"
        >
          <SidebarContent className="flex-1 min-h-0 overflow-auto">
            <SidebarGroup>
              <SidebarGroupLabel>{kitName}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {kitFeatures.map((kitFeature) => (
                    <SidebarMenuItem key={kitFeature.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={kitFeature.slug === featureSlug}
                        className="h-9 py-2.5"
                      >
                        <Link href={`/kits/${kitSlug}/${kitFeature.slug}`}>
                          {kitFeature.name}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="flex flex-col">
          <header className="sticky top-[68px] z-40 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <span className="text-sm font-medium text-muted-foreground">
              More Features from this Kit
            </span>
          </header>
          <div className="flex flex-1 relative">
            <div className="flex-1 px-4 py-6">
              <div className="mx-auto w-full max-w-4xl">{children}</div>
            </div>
            <TOCSidebar items={tocItems} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TableOfContentsProvider>
  );
}
