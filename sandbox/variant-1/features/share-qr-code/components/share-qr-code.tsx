"use client";

import { useRef } from "react";
import QRCode from "react-qr-code";
import { X, Download, Share2, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useShareQRCode,
} from "@/features/share-qr-code/hooks/use-share-qr-code";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { CopyToClipboard } from "@/features/copy-to-clipboard/components/copy-to-clipboard";
import { StatefulButton } from "@/features/stateful-button/components/stateful-button";

export interface ShareQRCodeProps {
  url: string;
  username?: string;
  title?: string;
  description?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export function ShareQRCode({
  url,
  username,
  title,
  description,
  isOpen,
  onOpenChange,
  className,
}: ShareQRCodeProps) {
  const {
    currentTheme,
    cycleTheme,
    handleDownload,
    qrCodeRef,
  } = useShareQRCode(url, username);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden" showCloseButton={false}>
        <DialogTitle className="sr-only">
          Share QR Code {username ? `for @${username}` : ""}
        </DialogTitle>
        <div
          ref={containerRef}
          className={cn(
            "relative min-h-[600px] flex flex-col",
            className,
          )}
          style={{
            background: currentTheme.bgGradient,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={cycleTheme}
              className="text-white hover:bg-white/20 rounded-full px-4"
            >
              <Palette className="h-4 w-4 mr-2" />
              COLOR
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <div className="grid grid-cols-3 gap-0.5">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-white rounded-sm"
                  />
                ))}
              </div>
            </Button>
          </div>

          {/* QR Code Card */}
          <div className="flex-1 flex items-center justify-center px-8 pb-8">
            <div
              ref={qrCodeRef}
              className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full"
            >
              <div className="flex justify-center mb-4">
                <div
                  style={{
                    background: "white",
                    padding: "16px",
                    borderRadius: "8px",
                  }}
                >
                  <QRCode
                    value={url}
                    size={200}
                    fgColor={currentTheme.qrColor}
                    bgColor="#ffffff"
                    level="H"
                  />
                </div>
              </div>
              {username && (
                <div className="text-center">
                  <p
                    className={cn(
                      "text-xl font-semibold",
                      currentTheme.textColor,
                    )}
                    style={{
                      color: currentTheme.textColor.includes("white")
                        ? "#000000"
                        : "#ffffff",
                    }}
                  >
                    @{username}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-6 space-y-3">
            <Button
              onClick={async () => {
                if (typeof navigator !== "undefined" && navigator.share) {
                  try {
                    await navigator.share({
                      title: title || `Share ${username ? `@${username}` : "profile"}`,
                      text: description,
                      url: url,
                    });
                  } catch (error) {
                    if ((error as Error).name !== "AbortError") {
                      console.error("Error sharing:", error);
                    }
                  }
                } else {
                  // Fallback handled by CopyToClipboard component
                }
              }}
              className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
              size="lg"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share profile
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <CopyToClipboard
                text={url}
                label="Copy link"
                variant="outline"
                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                size="lg"
              />
              <StatefulButton
                onAction={handleDownload}
                variant="outline"
                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                size="lg"
              >
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </div>
              </StatefulButton>
            </div>
          </div>

          {/* Instruction Text */}
          <div className="px-6 pb-4 text-center">
            <p className="text-white/80 text-sm">
              Tap anywhere to close
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

