"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import autocompleter from "autocompleter";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AutocompleteOption {
  label: string;
  value: string;
  [key: string]: unknown;
}

interface AutoCompleteFormProps {
  options: AutocompleteOption[] | (() => Promise<AutocompleteOption[]>);
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (option: AutocompleteOption) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  debounceMs?: number;
  minLength?: number;
  allowCustom?: boolean;
  renderOption?: (option: AutocompleteOption) => string;
  filterOptions?: (
    options: AutocompleteOption[],
    query: string,
  ) => AutocompleteOption[];
  disabled?: boolean;
  name?: string;
  id?: string;
}

export function AutoCompleteForm({
  options,
  value = "",
  onChange,
  onSelect,
  placeholder,
  className,
  inputClassName,
  debounceMs = 300,
  minLength = 0,
  renderOption,
  filterOptions,
  disabled = false,
  name,
  id,
}: AutoCompleteFormProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleterInstanceRef = useRef<ReturnType<
    typeof autocompleter
  > | null>(null);

  const loadOptions = useCallback(async (): Promise<AutocompleteOption[]> => {
    if (typeof options === "function") {
      setIsLoading(true);
      try {
        const fetchedOptions = await options();
        return fetchedOptions;
      } finally {
        setIsLoading(false);
      }
    }
    return options;
  }, [options]);

  const defaultFilterOptions = useCallback(
    (opts: AutocompleteOption[], query: string): AutocompleteOption[] => {
      if (!query) return opts;
      const lowerQuery = query.toLowerCase();
      return opts.filter((option) =>
        option.label.toLowerCase().includes(lowerQuery),
      );
    },
    [],
  );

  const filter = filterOptions || defaultFilterOptions;

  useEffect(() => {
    if (!inputRef.current || disabled) {
      // Clean up if disabled
      if (autocompleterInstanceRef.current) {
        autocompleterInstanceRef.current.destroy?.();
        autocompleterInstanceRef.current = null;
      }
      return;
    }

    // Load options once
    let allOptionsCache: AutocompleteOption[] | null = null;
    const loadAllOptions = async () => {
      if (!allOptionsCache) {
        allOptionsCache = await loadOptions();
      }
      return allOptionsCache;
    };

    autocompleterInstanceRef.current = autocompleter({
      input: inputRef.current,
      fetch: async (
        text: string,
        update: (items: AutocompleteOption[]) => void,
      ) => {
        if (text.length < minLength) {
          update([]);
          return;
        }

        const allOptions = await loadAllOptions();
        const filtered = filter(allOptions, text);
        update(filtered);
      },
      onSelect: (item: AutocompleteOption) => {
        // Set the label in the input field (as per autocompleter convention)
        if (inputRef.current) {
          inputRef.current.value = item.label;
        }
        setInputValue(item.label);
        // Call onChange with the value for form handling
        onChange?.(item.value);
        onSelect?.(item);
      },
      render: (item: AutocompleteOption) => {
        const element = document.createElement("div");
        element.className = "px-3 py-2 text-sm hover:bg-accent cursor-pointer";
        if (renderOption) {
          element.textContent = renderOption(item);
        } else {
          element.textContent = item.label;
        }
        return element;
      },
      className:
        "autocomplete-suggestions bg-background border rounded-md shadow-lg mt-1 max-h-60 overflow-auto z-50",
      minLength,
      debounceWaitMs: debounceMs,
      emptyMsg: "No suggestions found",
    });

    return () => {
      if (autocompleterInstanceRef.current) {
        autocompleterInstanceRef.current.destroy?.();
        autocompleterInstanceRef.current = null;
      }
    };
  }, [
    loadOptions,
    filter,
    minLength,
    debounceMs,
    onChange,
    onSelect,
    renderOption,
    disabled,
  ]);

  useEffect(() => {
    // Only update if value prop changes externally
    if (value !== inputValue && inputRef.current?.value !== value) {
      setInputValue(value);
      if (inputRef.current) {
        inputRef.current.value = value;
      }
    }
  }, [value, inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <Input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        id={id}
        className={inputClassName}
        autoComplete="off"
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </div>
  );
}
