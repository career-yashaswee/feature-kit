"use client";

import { useCallback, useMemo, useState } from "react";

export interface PropConfig {
  property: string;
  type: string;
  description: string;
  defaultValue: string | number | boolean;
  value: string | number | boolean;
  inputType: "number" | "select" | "text" | "boolean";
  options?: string[];
  skipIfEmpty?: boolean;
  transform?: (value: string | number | boolean) => unknown;
}

export interface UsePropsApiOptions<T> {
  initialConfig: PropConfig[];
  propMap: Record<string, keyof T>;
}

export function usePropsApi<T>({
  initialConfig,
  propMap,
}: UsePropsApiOptions<T>) {
  const [props, setProps] = useState<PropConfig[]>(initialConfig);

  const handleValueChange = useCallback(
    (index: number, newValue: string | number | boolean) => {
      setProps((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          value: newValue,
        };
        return updated;
      });
    },
    []
  );

  const getComponentProps = useMemo((): Partial<T> => {
    const componentProps = {} as Partial<T>;

    props.forEach((prop) => {
      const propKey = propMap[prop.property] as keyof T;
      if (!propKey) return;

      const shouldSkip = prop.skipIfEmpty && !prop.value;
      if (shouldSkip) return;

      const transform =
        prop.transform ||
        ((v) => {
          if (prop.inputType === "boolean") return Boolean(v);
          if (prop.inputType === "number") return Number(v);
          return String(v);
        });

      componentProps[propKey] = transform(prop.value) as T[keyof T];
    });

    return componentProps;
  }, [props, propMap]);

  return {
    props,
    handleValueChange,
    getComponentProps,
  };
}

