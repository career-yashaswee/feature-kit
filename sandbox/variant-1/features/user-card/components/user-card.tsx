"use client";

import { Check, ExternalLink, Link as LinkIcon, Calendar, Edit } from "lucide-react";
import { Img } from "react-image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type {
  UserCardData,
  UserCardVariant,
  ThemeVariant,
} from "../types";

export interface UserCardProps extends UserCardData {
  variant?: UserCardVariant;
  theme?: ThemeVariant;
  className?: string;
  onEditProfile?: () => void;
}

export function UserCard({
  firstName,
  lastName,
  username,
  avatarUrl,
  bannerUrl,
  bannerFallback,
  description,
  bio,
  location,
  websiteUrl,
  socialIcons = [],
  items = [],
  externalLink,
  verified = false,
  joinedDate,
  following,
  followers,
  tagline,
  variant = "linkedin",
  theme = "dark",
  className,
  onEditProfile,
}: UserCardProps) {
  const isDark = theme === "dark";
  const isTwitter = variant === "twitter";

  const bannerSources = [];
  if (bannerUrl) {
    bannerSources.push(bannerUrl);
  }
  if (bannerFallback) {
    bannerSources.push(bannerFallback);
  }

  if (isTwitter) {
    return (
      <div
        className={cn(
          "relative w-full max-w-md overflow-hidden rounded-lg shadow-lg",
          isDark ? "bg-black" : "bg-white",
          className,
        )}
      >
        {/* Banner Section */}
        <div className="relative h-48 w-full overflow-hidden bg-linear-to-r from-blue-400 to-blue-600">
          {bannerSources.length > 0 ? (
            <Img
              src={bannerSources}
              alt={`${firstName} ${lastName} banner`}
              className="h-full w-full object-cover"
              loader={
                <div className="h-full w-full flex items-center justify-center bg-linear-to-r from-blue-400 to-blue-600">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
                </div>
              }
              unloader={
                <div className="h-full w-full bg-linear-to-r from-blue-400 to-blue-600" />
              }
            />
          ) : (
            <div className="h-full w-full bg-linear-to-r from-blue-400 to-blue-600" />
          )}

          {/* Banner Content - Twitter Style */}
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            {/* Top Left: Name and Tagline */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white leading-none tracking-tight">
                  {firstName.toLowerCase()}
                </span>
                <span
                  className="text-2xl font-normal italic text-white leading-none"
                  style={{ fontFamily: "cursive, serif" }}
                >
                  {lastName.toLowerCase()}
                </span>
              </div>
              {tagline && (
                <p className="mt-2 text-sm text-white">{tagline}</p>
              )}
            </div>

            {/* Bottom: Social Icons and URL */}
            <div className="flex flex-col gap-2">
              {socialIcons.length > 0 && (
                <div className="flex items-center gap-2">
                  {socialIcons.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                      <div className="h-4 w-4 text-white">{social.icon}</div>
                    </a>
                  ))}
                </div>
              )}
              {websiteUrl && (
                <p className="text-xs text-white/90">{websiteUrl}</p>
              )}
            </div>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="relative -mt-20 flex justify-between items-end px-4 pb-2">
          <div className="relative">
            <div
              className={cn(
                "relative h-32 w-32 overflow-hidden rounded-full border-4 shadow-lg",
                isDark ? "border-black" : "border-white",
              )}
            >
              <img
                src={avatarUrl}
                alt={`${firstName} ${lastName}`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          {onEditProfile && (
            <Button
              variant="outline"
              size="sm"
              onClick={onEditProfile}
              className={cn(
                "h-9 border",
                isDark
                  ? "border-white/20 bg-transparent text-white hover:bg-white/10"
                  : "border-gray-300 bg-white text-black hover:bg-gray-50",
              )}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit profile
            </Button>
          )}
        </div>

        {/* Main Content Area */}
        <div className={cn("px-4 pb-4 pt-2", isDark ? "bg-black" : "bg-white")}>
          {/* Name and Verification */}
          <div className="mb-1 flex items-center gap-2">
            <h2
              className={cn(
                "text-xl font-bold",
                isDark ? "text-white" : "text-black",
              )}
            >
              {firstName} {lastName}
            </h2>
            <div className="flex items-center gap-1">
              {verified ? (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                  <Check className="h-3 w-3 text-white" />
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-6 px-2 text-xs",
                    isDark
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-blue-600 hover:text-blue-700",
                  )}
                >
                  <Check className="h-3 w-3 mr-1" />
                  Get verified
                </Button>
              )}
            </div>
          </div>

          {/* Username */}
          {username && (
            <p className={cn("mb-2 text-sm", isDark ? "text-gray-500" : "text-gray-600")}>
              @{username}
            </p>
          )}

          {/* Bio */}
          {bio && (
            <p
              className={cn(
                "mb-3 text-sm leading-relaxed",
                isDark ? "text-white" : "text-gray-900",
              )}
            >
              {bio}
            </p>
          )}

          {/* Description */}
          {description && (
            <p
              className={cn(
                "mb-3 text-sm leading-relaxed",
                isDark ? "text-white/90" : "text-gray-700",
              )}
            >
              {description}
            </p>
          )}

          {/* External Link */}
          {externalLink && (
            <div className="mb-3 flex items-center gap-2">
              <LinkIcon
                className={cn(
                  "h-4 w-4",
                  isDark ? "text-blue-400" : "text-blue-600",
                )}
              />
              <a
                href={externalLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "text-sm font-medium hover:underline",
                  isDark ? "text-blue-400" : "text-blue-600",
                )}
              >
                {externalLink.text}
              </a>
            </div>
          )}

          {/* Joined Date */}
          {joinedDate && (
            <div className="mb-3 flex items-center gap-2">
              <Calendar
                className={cn(
                  "h-4 w-4",
                  isDark ? "text-gray-500" : "text-gray-600",
                )}
              />
              <p
                className={cn(
                  "text-sm",
                  isDark ? "text-gray-500" : "text-gray-600",
                )}
              >
                Joined {joinedDate}
              </p>
            </div>
          )}

          {/* Following/Followers */}
          {(following !== undefined || followers !== undefined) && (
            <div className="flex items-center gap-4">
              {following !== undefined && (
                <span
                  className={cn(
                    "text-sm",
                    isDark ? "text-white" : "text-black",
                  )}
                >
                  <span className="font-semibold">{following}</span> Following
                </span>
              )}
              {followers !== undefined && (
                <span
                  className={cn(
                    "text-sm",
                    isDark ? "text-white" : "text-black",
                  )}
                >
                  <span className="font-semibold">{followers}</span> Followers
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // LinkedIn Variant
  return (
    <div
      className={cn(
        "relative w-full max-w-md overflow-hidden rounded-lg shadow-lg",
        isDark ? "bg-[#1a1a1a]" : "bg-gray-50",
        className,
      )}
    >
      {/* Banner Section */}
      <div className="relative h-40 w-full overflow-hidden bg-linear-to-r from-blue-500 to-blue-600">
        {bannerSources.length > 0 ? (
          <Img
            src={bannerSources}
            alt={`${firstName} ${lastName} banner`}
            className="h-full w-full object-cover"
            loader={
              <div className="h-full w-full flex items-center justify-center bg-linear-to-r from-blue-500 to-blue-600">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
              </div>
            }
            unloader={
              <div className="h-full w-full bg-linear-to-r from-blue-500 to-blue-600" />
            }
          />
        ) : (
          <div className="h-full w-full bg-linear-to-r from-blue-500 to-blue-600" />
        )}
      </div>

      {/* Profile Picture */}
      <div className="relative -mt-16 flex justify-center px-4">
        <div
          className={cn(
            "relative h-32 w-32 overflow-hidden rounded-full border-4 shadow-lg",
            isDark ? "border-[#1a1a1a]" : "border-white",
          )}
        >
          <img
            src={avatarUrl}
            alt={`${firstName} ${lastName}`}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className={cn("px-4 pb-4 pt-2", isDark ? "bg-[#1a1a1a]" : "bg-gray-50")}>
        {/* Name and Verification */}
        <div className="mb-2 flex items-center gap-2">
          <h2
            className={cn(
              "text-xl font-bold",
              isDark ? "text-white" : "text-black",
            )}
          >
            {firstName} {lastName.split(" ")[0]}...
          </h2>
          {verified && (
            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full",
                isDark
                  ? "bg-black border border-white/20"
                  : "bg-black border border-gray-200",
              )}
            >
              <Check className="h-3 w-3 text-white" />
            </div>
          )}
        </div>

        {/* Description */}
        <p
          className={cn(
            "mb-2 text-sm leading-relaxed",
            isDark ? "text-white/90" : "text-gray-700",
          )}
        >
          {description}
        </p>

        {/* Location */}
        {location && (
          <p
            className={cn(
              "mb-3 text-xs",
              isDark ? "text-white/70" : "text-gray-600",
            )}
          >
            {location}
          </p>
        )}

        {/* Items with Logos, Labels and Values */}
        {items.length > 0 && (
          <div className="mb-3 space-y-2">
            {items.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2",
                  isDark ? "bg-white/5" : "bg-gray-50",
                )}
              >
                <div className="flex items-center gap-2">
                  {typeof item.logo === "string" ? (
                    <img
                      src={item.logo}
                      alt=""
                      className="h-4 w-4 object-contain"
                    />
                  ) : (
                    <div className="h-4 w-4 shrink-0">{item.logo}</div>
                  )}
                  <span
                    className={cn(
                      "text-sm",
                      isDark ? "text-white" : "text-gray-900",
                    )}
                  >
                    {item.label}
                  </span>
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    isDark ? "text-white/80" : "text-gray-700",
                  )}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* External Link */}
        {externalLink && (
          <div className="flex items-center gap-2">
            {externalLink.icon ? (
              <div className="h-5 w-5">{externalLink.icon}</div>
            ) : (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
                <span className="text-xs font-bold text-white">t</span>
              </div>
            )}
            <a
              href={externalLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-sm font-medium hover:underline",
                isDark ? "text-white" : "text-black",
              )}
            >
              {externalLink.text}
            </a>
            <ExternalLink
              className={cn(
                "h-3 w-3",
                isDark ? "text-white/60" : "text-gray-500",
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}

