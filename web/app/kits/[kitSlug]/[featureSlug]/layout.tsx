"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useKitFeatures } from "@/features/kits/hooks/use-kit-features";
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

type FeatureLayoutProps = {
  children: React.ReactNode;
};

export default function FeatureLayout({ children }: FeatureLayoutProps) {
  const params = useParams();
  const { t } = useTranslation();
  const kitSlug = typeof params.kitSlug === "string" ? params.kitSlug : "";
  const featureSlug =
    typeof params.featureSlug === "string" ? params.featureSlug : "";
  const { data: kitFeatures = [] } = useKitFeatures(kitSlug);

  const kitName =
    kitFeatures[0]?.kit?.name ??
    (kitSlug ? kitSlug.replace(/-/g, " ") : t("kit.otherFeatures"));

  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" className="top-16">
        <SidebarContent>
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
                      <Link
                        href={`/kits/${kitSlug}/${kitFeature.slug}`}
                      >
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

      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <span className="text-sm font-medium text-muted-foreground">
            {t("kit.title")}
          </span>
        </header>
        <div className="flex flex-1 flex-col px-4 py-6">
          <div className="mx-auto w-full max-w-4xl">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
