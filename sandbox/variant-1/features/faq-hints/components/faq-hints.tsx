"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  shortAnswer?: string;
}

export interface FaqHintsProps {
  heading?: string;
  description?: string;
  items: FaqItem[];
  className?: string;
  variant?: "default" | "compact";
  showShortAnswers?: boolean;
}

export function FaqHints({
  heading,
  description,
  items,
  className,
  variant = "default",
  showShortAnswers = true,
}: FaqHintsProps) {
  return (
    <section className={cn("py-32 bg-muted/30", className)}>
      <div className="container space-y-16">
        {(heading || description) && (
          <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
            {heading && (
              <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-muted-foreground lg:text-lg">{description}</p>
            )}
          </div>
        )}
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="flex items-center justify-between w-full pr-4">
                  <div
                    className={cn(
                      "font-medium",
                      variant === "compact"
                        ? "sm:py-1 text-sm"
                        : "sm:py-1 lg:py-2 lg:text-lg",
                    )}
                  >
                    {item.question}
                  </div>
                  {showShortAnswers && item.shortAnswer && (
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium shrink-0 ml-2">
                      {item.shortAnswer}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent
                className={cn(
                  "sm:mb-1",
                  variant === "compact" ? "text-sm" : "lg:mb-2",
                )}
              >
                <div className="text-muted-foreground lg:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
