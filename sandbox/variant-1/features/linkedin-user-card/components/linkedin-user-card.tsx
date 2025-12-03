"use client";

import { Check, ExternalLink } from "lucide-react";
import { Img } from "react-image";
import { cn } from "@/lib/utils";

export interface LinkedInUserCardItem {
  logo: string | React.ReactNode;
  label: string;
  value: string;
}

export interface LinkedInUserCardProps {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  bannerUrl?: string;
  bannerFallback?: string;
  description: string;
  location?: string;
  items?: LinkedInUserCardItem[];
  externalLink?: {
    icon?: React.ReactNode;
    text: string;
    url: string;
  };
  verified?: boolean;
  className?: string;
  variant?: "light" | "dark";
}

export function LinkedInUserCard({
  firstName,
  lastName,
  avatarUrl,
  bannerUrl,
  bannerFallback,
  description,
  location,
  items = [],
  externalLink,
  verified = false,
  className,
  variant = "dark",
}: LinkedInUserCardProps) {
  const isDark = variant === "dark";

  const bannerSources = [];
  if (bannerUrl) {
    bannerSources.push(bannerUrl);
  }
  if (bannerFallback) {
    bannerSources.push(bannerFallback);
  }

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

