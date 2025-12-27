"use client";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import {
  LinkedinLogo,
  TwitterLogo,
  CursorClick,
  Crown,
  Star,
  Trophy,
  GithubLogo,
  Globe,
  Lightning,
} from "@phosphor-icons/react";
import {
  UserCard,
  UserCardProps,
} from "@/features/user-card/components/user-card";
import type { UserCardVariant, ThemeVariant } from "@/features/user-card/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";

export default function UserCardPage() {
  const linkedinData = {
    firstName: "Yashaswee",
    lastName: "Kesharwani",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bannerUrl:
      "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=200&fit=crop",
    bannerFallback:
      "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=200&fit=crop",
    description:
      "Building Recompose | SIH'24 Winner (Lead) | AI and Full Stack Developer",
    location: "Phagwara Tehsil, Punjab",
    items: [
      {
        logo: <Crown className="h-4 w-4 text-yellow-400" />,
        label: "Subscription",
        value: "Plus Active",
      },
      {
        logo: <Star className="h-4 w-4 text-purple-400" />,
        label: "Level",
        value: "1",
      },
      {
        logo: <Trophy className="h-4 w-4 text-green-400" />,
        label: "Compositions Solved",
        value: "1 solved",
      },
    ],
    externalLink: {
      text: "topmate.io",
      url: "https://topmate.io",
    },
    verified: true,
  };

  const twitterData = {
    firstName: "Yashaswee",
    lastName: "Kesharwani",
    username: "yashaswee_",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bannerUrl:
      "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=200&fit=crop",
    bannerFallback:
      "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=200&fit=crop",
    description:
      "Building Recompose - A better leetcode for full-stack web dev.",
    tagline: "would ❤️ to connect...",
    bio: "Building Recompose - A better leetcode for full-stack web dev.",
    websiteUrl: "yashaswee.classing.in",
    socialIcons: [
      { icon: <GithubLogo className="h-4 w-4" />, url: "https://github.com" },
      {
        icon: <LinkedinLogo className="h-4 w-4" />,
        url: "https://linkedin.com",
      },
      { icon: <TwitterLogo className="h-4 w-4" />, url: "https://twitter.com" },
      { icon: <Globe className="h-4 w-4" />, url: "https://example.com" },
      { icon: <Crown className="h-4 w-4" />, url: "https://example.com" },
    ],
    externalLink: {
      text: "recompose.sbs",
      url: "https://recompose.sbs",
    },
    verified: true,
    joinedDate: "June 2024",
    following: 39,
    followers: 2,
  };

  const initialConfig: PropConfig[] = [
    {
      property: "variant",
      type: '"linkedin" | "twitter"',
      description: "Visual variant of the user card",
      defaultValue: "linkedin",
      value: "linkedin",
      inputType: "select",
      options: ["linkedin", "twitter"],
      transform: (value) => value as UserCardVariant,
    },
    {
      property: "theme",
      type: '"light" | "dark"',
      description: "Theme variant of the user card",
      defaultValue: "dark",
      value: "dark",
      inputType: "select",
      options: ["light", "dark"],
      transform: (value) => value as ThemeVariant,
    },
    {
      property: "className",
      type: "string",
      description: "Additional CSS classes for custom styling",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
    },
  ];

  const propMap: Record<string, keyof UserCardProps> = {
    variant: "variant",
    theme: "theme",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<UserCardProps>({
      initialConfig,
      propMap,
    });

  // Get current variant from props
  const currentVariant = (getComponentProps.variant ||
    "linkedin") as UserCardVariant;
  const currentData = currentVariant === "twitter" ? twitterData : linkedinData;

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        {(() => {
          const featureData = featuresData.find((f) => f.path === "/user-card");
          if (featureData?.howToTest) {
            return (
              <HowToTestCard
                steps={featureData.howToTest.steps}
                conclusion={featureData.howToTest.conclusion}
                icon={<CursorClick className="h-5 w-5 text-primary" />}
              />
            );
          }
          return null;
        })()}

        {/* Live Demo */}
        <BaseCard>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Lightning className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Live Demo</CardTitle>
            </div>
            <CardDescription>
              See the component update in real-time as you change props below.
              Note: Complex props like user data (firstName, lastName,
              avatarUrl, etc.) are not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <UserCard {...currentData} {...getComponentProps} />
            </div>
          </CardContent>
        </BaseCard>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: Complex props like user data (firstName, lastName, avatarUrl, etc.) are not editable here."
        />

        <BaseCard>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <CursorClick className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">How to Test</CardTitle>
                <CardDescription className="text-base">
                  Toggle between card variants (LinkedIn/TwitterLogo) and themes
                  (light/dark) to see different styles
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Testing Steps:</h3>
              <ol className="space-y-3">
                {[
                  "Toggle between LinkedIn and TwitterLogo card variants",
                  "Switch between light and dark mode themes",
                  "View the card with all features: banner, avatar, description, items, and links",
                  "Customize the props to match your use case",
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
            </div>
          </CardContent>
        </BaseCard>

        {(() => {
          const featureData = featuresData.find((f) => f.path === "/user-card");
          if (featureData?.howToTest) {
            return (
              <HowToTestCard
                steps={featureData.howToTest.steps}
                conclusion={featureData.howToTest.conclusion}
                icon={<CursorClick className="h-5 w-5 text-primary" />}
              />
            );
          }
          return null;
        })()}

        {(() => {
          const featureData = featuresData.find((f) => f.path === "/user-card");
          if (featureData?.features) {
            const featuresWithIcons = featureData.features.map((feature) => ({
              icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
              title: feature.title,
              description: feature.description,
            }));
            return <FeaturesGlossary features={featuresWithIcons} />;
          }
          const defaultFeatures = [
            {
              icon: renderIcon("LinkedinLogo", "h-5 w-5 text-primary"),
              title: "LinkedIn Variant",
              description:
                "Professional LinkedIn-style card with items, badges, and external links",
            },
            {
              icon: renderIcon("TwitterLogo", "h-5 w-5 text-primary"),
              title: "Twitter Variant",
              description:
                "Twitter-style card with username, bio, following/followers, and join date",
            },
            {
              icon: renderIcon("Gear", "h-5 w-5 text-primary"),
              title: "Banner Images",
              description:
                "Customizable banner with react-image fallback support",
            },
            {
              icon: renderIcon("Lightning", "h-5 w-5 text-primary"),
              title: "Light & Dark Mode",
              description:
                "Full support for both light and dark themes with appropriate styling",
            },
          ];
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}
      </main>
    </div>
  );
}
