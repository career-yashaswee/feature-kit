import { useState, useCallback, useRef } from "react";

export type QRCodeTheme = {
  name: string;
  bgGradient: string;
  qrColor: string;
  textColor: string;
};

export const QR_CODE_THEMES: QRCodeTheme[] = [
  {
    name: "color",
    bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    qrColor: "#667eea",
    textColor: "text-white",
  },
  {
    name: "green-blue",
    bgGradient: "linear-gradient(135deg, #00f260 0%, #0575e6 100%)",
    qrColor: "#00f260",
    textColor: "text-white",
  },
  {
    name: "orange-red",
    bgGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    qrColor: "#f5576c",
    textColor: "text-white",
  },
  {
    name: "purple-pink",
    bgGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    qrColor: "#4facfe",
    textColor: "text-white",
  },
  {
    name: "yellow-orange",
    bgGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    qrColor: "#fee140",
    textColor: "text-white",
  },
];

export function useShareQRCode(url: string, username?: string) {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const currentTheme = QR_CODE_THEMES[currentThemeIndex];

  const cycleTheme = useCallback(() => {
    setCurrentThemeIndex((prev) => (prev + 1) % QR_CODE_THEMES.length);
  }, []);

  const handleDownload = useCallback(async () => {
    if (!qrCodeRef.current) return;

    try {
      const svg = qrCodeRef.current.querySelector("svg");
      if (!svg) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      canvas.width = 512;
      canvas.height = username ? 580 : 512;

      return new Promise<void>((resolve, reject) => {
        img.onload = () => {
          if (ctx) {
            // Create gradient background
            const gradient = ctx.createLinearGradient(
              0,
              0,
              canvas.width,
              canvas.height,
            );
            if (currentTheme.bgGradient.includes("667eea")) {
              gradient.addColorStop(0, "#667eea");
              gradient.addColorStop(1, "#764ba2");
            } else if (currentTheme.bgGradient.includes("00f260")) {
              gradient.addColorStop(0, "#00f260");
              gradient.addColorStop(1, "#0575e6");
            } else if (currentTheme.bgGradient.includes("f5576c")) {
              gradient.addColorStop(0, "#f093fb");
              gradient.addColorStop(1, "#f5576c");
            } else if (currentTheme.bgGradient.includes("4facfe")) {
              gradient.addColorStop(0, "#4facfe");
              gradient.addColorStop(1, "#00f2fe");
            } else {
              gradient.addColorStop(0, "#fa709a");
              gradient.addColorStop(1, "#fee140");
            }

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // White card background
            const cardPadding = 32;
            const qrSize = 200;
            const cardWidth = qrSize + cardPadding * 2;
            const cardHeight = username
              ? qrSize + cardPadding * 2 + 40
              : qrSize + cardPadding * 2;
            const cardX = (canvas.width - cardWidth) / 2;
            const cardY = (canvas.height - cardHeight) / 2;

            ctx.fillStyle = "#ffffff";
            ctx.fillRect(cardX, cardY, cardWidth, cardHeight);

            // Draw QR code
            const qrX = cardX + cardPadding;
            const qrY = cardY + cardPadding;
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(qrX - 16, qrY - 16, qrSize + 32, qrSize + 32);
            ctx.drawImage(img, qrX, qrY, qrSize, qrSize);

            // Draw username if provided
            if (username) {
              ctx.fillStyle = "#000000";
              ctx.font = "bold 20px sans-serif";
              ctx.textAlign = "center";
              ctx.fillText(
                `@${username}`,
                canvas.width / 2,
                cardY + cardPadding + qrSize + 30,
              );
            }

            canvas.toBlob((blob) => {
              if (!blob) {
                reject(new Error("Failed to create blob"));
                return;
              }
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.download = `qr-code-${username || "share"}.png`;
              link.href = url;
              link.click();
              URL.revokeObjectURL(url);
              resolve();
            }, "image/png");
          } else {
            reject(new Error("Canvas context not available"));
          }
        };

        img.onerror = reject;
        const svgBlob = new Blob([svgData], {
          type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(svgBlob);
        img.src = url;
      });
    } catch (error) {
      console.error("Error downloading QR code:", error);
      throw error;
    }
  }, [currentTheme, username]);

  return {
    currentTheme,
    cycleTheme,
    handleDownload,
    qrCodeRef,
    themeName: currentTheme.name,
  };
}
