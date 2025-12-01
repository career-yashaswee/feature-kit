"use client";

import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function useCopyPrompt() {
  const { t } = useTranslation();

  const copyPrompt = async (prompt: string | null) => {
    if (!prompt) {
      toast.error(t("feature.promptNotAvailable"));
      return;
    }

    const toastId = toast.loading(t("feature.copyingPrompt"), {
      id: "copy-prompt",
    });

    try {
      await navigator.clipboard.writeText(prompt);
      toast.success(t("feature.promptCopied"), { id: toastId });
    } catch {
      toast.error(t("feature.promptCopyError"), { id: toastId });
    }
  };

  return { copyPrompt };
}
