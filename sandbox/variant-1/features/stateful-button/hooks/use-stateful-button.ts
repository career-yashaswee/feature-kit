import { useState, useCallback, useRef } from "react";

export type ButtonState = "default" | "loading" | "success" | "error";

export interface UseStatefulButtonOptions {
  onAction: () => Promise<void> | void;
  rateLimitMs?: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useStatefulButton({
  onAction,
  rateLimitMs = 1000,
  onSuccess,
  onError,
}: UseStatefulButtonOptions) {
  const [state, setState] = useState<ButtonState>("default");
  const lastCallRef = useRef<number>(0);

  const handleClick = useCallback(async () => {
    if (state === "loading") return;

    const now = Date.now();
    const timeSinceLastCall = now - lastCallRef.current;

    if (timeSinceLastCall < rateLimitMs) {
      return;
    }

    lastCallRef.current = now;
    setState("loading");

    try {
      await onAction();
      setState("success");
      onSuccess?.();

      setTimeout(() => {
        setState("default");
      }, 2000);
    } catch (error) {
      setState("error");
      onError?.(error instanceof Error ? error : new Error("Unknown error"));

      setTimeout(() => {
        setState("default");
      }, 2000);
    }
  }, [state, onAction, onSuccess, onError, rateLimitMs]);

  return {
    state,
    handleClick,
    isLoading: state === "loading",
    isSuccess: state === "success",
    isError: state === "error",
  };
}
