import { useCallback, useState } from "react";
import { toast } from "sonner";

export interface UseOptimisticActionButtonOptions {
  action: () => Promise<void>;
  optimisticState: boolean;
  onOptimisticUpdate: () => void;
  onRollback: () => void;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useOptimisticActionButton({
  action,
  optimisticState: _optimisticState,
  onOptimisticUpdate,
  onRollback,
  loadingMessage = "Processing...",
  successMessage = "Action completed successfully.",
  errorMessage = "Action failed. Please try again.",
  onSuccess,
  onError,
}: UseOptimisticActionButtonOptions) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    if (isLoading) return;

    onOptimisticUpdate();
    setIsLoading(true);

    const actionPromise = Promise.resolve(action())
      .then(() => {
        onSuccess?.();
      })
      .catch((error) => {
        onRollback();
        const err = error instanceof Error ? error : new Error("Action failed");
        onError?.(err);
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
      });

    toast.promise(actionPromise, {
      loading: loadingMessage,
      success: successMessage,
      error: errorMessage,
    });
  }, [
    isLoading,
    action,
    onOptimisticUpdate,
    onRollback,
    loadingMessage,
    successMessage,
    errorMessage,
    onSuccess,
    onError,
  ]);

  return {
    isLoading,
    handleClick,
  };
}

