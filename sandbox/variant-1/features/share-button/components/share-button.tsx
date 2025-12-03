"use client";

import {
  Share2,
  Copy,
  Twitter,
  Facebook,
  Linkedin,
  Check,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CopyToClipboard } from "@/features/copy-to-clipboard/components/copy-to-clipboard";
import { useCopyToClipboard, useToggle } from "@uidotdev/usehooks";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface ShareButtonProps {
  url: string;
  title?: string;
  description?: string;
  withUtmParams?: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

interface ShareOption {
  id: string;
  label: string;
  icon: typeof Share2;
  action: () => void;
  color?: string;
}

export function ShareButton({
  url,
  title,
  description,
  withUtmParams = false,
  utmSource,
  utmMedium,
  utmCampaign,
  className,
  variant = "outline",
  size = "default",
}: ShareButtonProps) {
  const [isOpen, toggleOpen] = useToggle(false);
  const [copied, copy] = useCopyToClipboard();

  const shareUrl = useMemo(() => {
    if (!withUtmParams) {
      return url;
    }

    // Only compute UTM parameters on the client side
    if (typeof window === "undefined") {
      return url;
    }

    try {
      const shareUrlObj = new URL(url, window.location.origin);
      if (utmSource) shareUrlObj.searchParams.set("utm_source", utmSource);
      if (utmMedium) shareUrlObj.searchParams.set("utm_medium", utmMedium);
      if (utmCampaign)
        shareUrlObj.searchParams.set("utm_campaign", utmCampaign);
      return shareUrlObj.toString();
    } catch (error) {
      // Fallback to original URL if URL construction fails
      console.error("Error constructing share URL:", error);
      return url;
    }
  }, [url, withUtmParams, utmSource, utmMedium, utmCampaign]);

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title:
            title || (typeof document !== "undefined" ? document.title : ""),
          text: description,
          url: shareUrl,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error sharing:", error);
        }
      }
    }
  };

  const handleCopyLink = async () => {
    copy(shareUrl);
  };

  const shareToTwitter = () => {
    if (typeof window === "undefined") return;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl,
    )}&text=${encodeURIComponent(title || "")}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  const shareToFacebook = () => {
    if (typeof window === "undefined") return;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl,
    )}`;
    window.open(facebookUrl, "_blank", "noopener,noreferrer");
  };

  const shareToLinkedIn = () => {
    if (typeof window === "undefined") return;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl,
    )}`;
    window.open(linkedInUrl, "_blank", "noopener,noreferrer");
  };

  const shareOptions: ShareOption[] = [
    ...(typeof navigator !== "undefined" &&
    typeof navigator.share !== "undefined"
      ? [
          {
            id: "native",
            label: "Share",
            icon: Share2,
            action: handleNativeShare,
          },
        ]
      : []),
    {
      id: "copy",
      label: "Copy link",
      icon: copied ? Check : Copy,
      action: handleCopyLink,
    },
    {
      id: "twitter",
      label: "Twitter",
      icon: Twitter,
      action: shareToTwitter,
      color: "text-blue-500",
    },
    {
      id: "facebook",
      label: "Facebook",
      icon: Facebook,
      action: shareToFacebook,
      color: "text-blue-600",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      action: shareToLinkedIn,
      color: "text-blue-700",
    },
  ];

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={() => toggleOpen()}
        className={cn("inline-flex items-center gap-2", className)}
        aria-label="Share"
      >
        <Share2 className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">Share</span>
      </Button>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (open !== isOpen) {
            toggleOpen();
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
            <DialogDescription>
              Share this content with others
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Link
              </label>
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex-1 min-w-0 rounded-md border bg-muted px-3 py-2 text-sm text-muted-foreground overflow-hidden">
                  <div className="truncate" title={shareUrl}>
                    {shareUrl}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <CopyToClipboard
                    text={shareUrl}
                    variant="outline"
                    size="sm"
                    showIcon={true}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {shareOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Button
                    key={option.id}
                    type="button"
                    variant="outline"
                    className="flex h-auto flex-col items-center justify-center gap-2 p-4"
                    onClick={() => {
                      option.action();
                      if (option.id === "copy") {
                        setTimeout(() => {
                          if (isOpen) toggleOpen();
                        }, 1000);
                      } else if (option.id === "native") {
                        if (isOpen) toggleOpen();
                      }
                    }}
                  >
                    <Icon
                      className={cn(
                        "h-6 w-6 shrink-0",
                        option.color || "text-foreground",
                      )}
                    />
                    <span className="text-xs">{option.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
