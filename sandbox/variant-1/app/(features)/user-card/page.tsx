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
  LinkedinLogo,
  TwitterLogo,
  CursorClick,
  Sparkle,
  Code,
  Gear,
  Lightning,
  Crown,
  Star,
  Trophy,
  GithubLogo,
  Globe,
} from "@phosphor-icons/react";
import { UserCard } from "@/features/user-card/components/user-card";
import type { UserCardVariant, ThemeVariant } from "@/features/user-card/types";

export default function UserCardPage() {
  const [cardVariant, setCardVariant] = useState<UserCardVariant>("linkedin");
  const [theme, setTheme] = useState<ThemeVariant>("dark");

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

  const currentData = cardVariant === "twitter" ? twitterData : linkedinData;

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <Card className="border-2 shadow-lg">
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
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Sparkle className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl">
                  Variant & Theme Toggle
                </CardTitle>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button
                    variant={cardVariant === "linkedin" ? "default" : "outline"}
                    onClick={() => setCardVariant("linkedin")}
                    size="sm"
                  >
                    <LinkedinLogo className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button
                    variant={cardVariant === "twitter" ? "default" : "outline"}
                    onClick={() => setCardVariant("twitter")}
                    size="sm"
                  >
                    <TwitterLogo className="h-4 w-4 mr-2" />
                    TwitterLogo
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    onClick={() => setTheme("light")}
                    size="sm"
                  >
                    Light Mode
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    onClick={() => setTheme("dark")}
                    size="sm"
                  >
                    Dark Mode
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <UserCard {...currentData} variant={cardVariant} theme={theme} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: LinkedinLogo,
                  title: "LinkedIn Variant",
                  description:
                    "Professional LinkedIn-style card with items, badges, and external links",
                },
                {
                  icon: TwitterLogo,
                  title: "TwitterLogo Variant",
                  description:
                    "TwitterLogo-style card with username, bio, following/followers, and join date",
                },
                {
                  icon: Gear,
                  title: "Banner Images",
                  description:
                    "Customizable banner with react-image fallback support",
                },
                {
                  icon: Lightning,
                  title: "Light & Dark Mode",
                  description:
                    "Full support for both light and dark themes with appropriate styling",
                },
              ].map((feature, index) => (
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
