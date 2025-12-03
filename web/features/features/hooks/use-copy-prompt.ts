"use client";

import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useCopyToClipboard } from "@uidotdev/usehooks";

export function useCopyPrompt() {
  const { t } = useTranslation();
  const [, copy] = useCopyToClipboard();

  const copyPrompt = async (prompt: string | null) => {
    if (!prompt) {
      toast.error(t("feature.promptNotAvailable"));
      return;
    }

    const toastId = toast.loading(t("feature.copyingPrompt"), {
      id: "copy-prompt",
    });

    try {
      copy(prompt);
      toast.success(t("feature.promptCopied"), { id: toastId });
    } catch {
      toast.error(t("feature.promptCopyError"), { id: toastId });
    }
  };

  return { copyPrompt };
}
