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

    const success = copy(prompt);
    if (success) {
      toast.success(t("feature.promptCopied"), { id: toastId });
    } else {
      toast.error(t("feature.promptCopyError"), { id: toastId });
    }
  };

  return { copyPrompt };
}
