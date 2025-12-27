"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GridFour,
  Lightning,
  FileText,
  DotsThreeVertical,
  Star,
  CursorClick,
} from "@phosphor-icons/react";
import {
  GridCard,
  GridCardHeader,
  GridCardTitle,
  GridCardDescription,
  GridCardContent,
  GridCardFooter,
} from "@/features/grid-card/components/grid-card";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";

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
        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/grid-card"
          );
          if (featureData?.howToTest) {
            return (
              <HowToTestCard
                steps={featureData.howToTest.steps}
                conclusion={featureData.howToTest.conclusion}
                icon={<CursorClick className="h-5 w-5 text-primary" />}
              />
            );
          }
          return (
            <HowToTestCard
              steps={[
                "Hover over cards to see the scale and shadow effects",
                "Click on cards to trigger onClick handlers",
                "Try different variants (default, elevated, outlined)",
                "Test the pinned badge functionality",
                "Check keyboard navigation (Enter/Space keys)",
              ]}
              icon={<CursorClick className="h-5 w-5 text-primary" />}
            />
          );
        })()}

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
                    <Button variant="ghost" size="sm" className="whitespace-nowrap">
                      <Star className="h-4 w-4" />
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

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/grid-card"
          );
          if (featureData?.features) {
            const featuresWithIcons = featureData.features.map((feature) => ({
              icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
              title: feature.title,
              description: feature.description,
            }));
            return <FeaturesGlossary features={featuresWithIcons} />;
          }
          const defaultFeatures = features.map((feature) => ({
            icon: <feature.icon className="h-5 w-5 text-primary" />,
            title: feature.title,
            description: feature.description,
          }));
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}
      </main>
    </div>
  );
}
