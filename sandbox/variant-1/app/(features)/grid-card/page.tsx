"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GridFour,
  Lightning,
  FileText,
  Gear,
  Plus,
  DotsThreeVertical,
  Star,
} from "@phosphor-icons/react";
import {
  GridCard,
  GridCardHeader,
  GridCardTitle,
  GridCardDescription,
  GridCardContent,
  GridCardFooter,
} from "@/features/grid-card/components/grid-card";

const features = [
  {
    title: "Flexible Layout",
    description: "Header, content, and footer sections with separators",
    icon: GridFour,
  },
  {
    title: "Interactive States",
    description: "Hover effects, click handlers, and keyboard navigation",
    icon: Lightning,
  },
  {
    title: "Multiple Variants",
    description: "Default, elevated, and outlined styles",
    icon: FileText,
  },
];

export default function GridCardPage() {
  const [isPinned, setIsPinned] = useState(false);

  const handleNavigate = (href: string) => {
    console.log("Navigate to:", href);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <GridFour className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the Grid Card component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Hover over cards to see the scale and shadow effects",
                "Click on cards to trigger onClick handlers",
                "Try different variants (default, elevated, outlined)",
                "Test the pinned badge functionality",
                "Check keyboard navigation (Enter/Space keys)",
              ].map((step, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-lg border bg-muted/50 p-3 text-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <GridFour className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Default Variant</CardTitle>
            </div>
            <CardDescription>
              Standard card with header, content, and footer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GridCard
                onClick={() => console.log("Card clicked")}
                headerContent={
                  <GridCardHeader
                    action={
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <DotsThreeVertical className="h-4 w-4" />
                      </Button>
                    }
                  >
                    <GridCardTitle>Card Title</GridCardTitle>
                  </GridCardHeader>
                }
                footerContent={
                  <GridCardFooter>
                    <Button variant="ghost" size="sm">
                      <Star className="h-4 w-4 mr-2" />
                      Favorite
                    </Button>
                    <Button size="sm">View</Button>
                  </GridCardFooter>
                }
              >
                <GridCardContent>
                  <GridCardDescription>
                    This is a description of the card content. It can span
                    multiple lines and will be truncated if it exceeds the
                    maximum line count.
                  </GridCardDescription>
                </GridCardContent>
              </GridCard>

              <GridCard
                onClick={() => console.log("Card clicked")}
                isPinned={isPinned}
                headerContent={
                  <GridCardHeader>
                    <GridCardTitle>Pinned Card</GridCardTitle>
                  </GridCardHeader>
                }
                footerContent={
                  <GridCardFooter>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPinned(!isPinned);
                      }}
                    >
                      {isPinned ? "Unpin" : "Pin"}
                    </Button>
                  </GridCardFooter>
                }
              >
                <GridCardContent>
                  <GridCardDescription>
                    This card can be pinned. Click the pin button in the footer
                    to toggle the pinned state.
                  </GridCardDescription>
                </GridCardContent>
              </GridCard>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <GridFour className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Different Variants</CardTitle>
            </div>
            <CardDescription>
              Cards available in different visual styles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <GridCard
                variant="default"
                onClick={() => console.log("Default clicked")}
              >
                <GridCardContent>
                  <GridCardTitle>Default</GridCardTitle>
                  <GridCardDescription>
                    Standard card with subtle shadow
                  </GridCardDescription>
                </GridCardContent>
              </GridCard>

              <GridCard
                variant="elevated"
                onClick={() => console.log("Elevated clicked")}
              >
                <GridCardContent>
                  <GridCardTitle>Elevated</GridCardTitle>
                  <GridCardDescription>
                    Card with enhanced shadow and hover effects
                  </GridCardDescription>
                </GridCardContent>
              </GridCard>

              <GridCard
                variant="outlined"
                onClick={() => console.log("Outlined clicked")}
              >
                <GridCardContent>
                  <GridCardTitle>Outlined</GridCardTitle>
                  <GridCardDescription>
                    Transparent card with border and hover background
                  </GridCardDescription>
                </GridCardContent>
              </GridCard>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <GridFour className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">With Navigation</CardTitle>
            </div>
            <CardDescription>
              Cards with href and custom navigation handler
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GridCard
                href="/features"
                onNavigate={handleNavigate}
                headerContent={
                  <GridCardHeader>
                    <GridCardTitle>Link Card</GridCardTitle>
                  </GridCardHeader>
                }
              >
                <GridCardContent>
                  <GridCardDescription>
                    This card uses href with a custom navigation handler. Click
                    to navigate.
                  </GridCardDescription>
                </GridCardContent>
              </GridCard>

              <GridCard
                href="/settings"
                onNavigate={handleNavigate}
                showBlurOverlay={false}
                headerContent={
                  <GridCardHeader>
                    <GridCardTitle>Settings</GridCardTitle>
                  </GridCardHeader>
                }
              >
                <GridCardContent>
                  <GridCardDescription>
                    Navigate to settings page with custom handler.
                  </GridCardDescription>
                </GridCardContent>
              </GridCard>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <GridFour className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Disabled State</CardTitle>
            </div>
            <CardDescription>
              Card in disabled state with reduced opacity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GridCard
              disabled
              onClick={() => console.log("This won't fire")}
              headerContent={
                <GridCardHeader>
                  <GridCardTitle>Disabled Card</GridCardTitle>
                </GridCardHeader>
              }
            >
              <GridCardContent>
                <GridCardDescription>
                  This card is disabled and cannot be clicked. Notice the
                  reduced opacity.
                </GridCardDescription>
              </GridCardContent>
            </GridCard>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Lightning className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex gap-4 rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <div className="rounded-lg bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
