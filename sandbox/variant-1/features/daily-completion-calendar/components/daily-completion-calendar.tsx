"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { CheckCircle } from "@phosphor-icons/react";
import { getDefaultClassNames } from "react-day-picker";
import { Button } from "@/components/ui/button";
import type { DailyCompletionCalendarProps } from "../types";
import { cn } from "@/lib/utils";

function CompletionDayButton({
  day,
  modifiers,
  className: dayClassName,
  getStatus,
  onDayClick,
  ...props
}: {
  day: { date: Date };
  modifiers: { focused?: boolean };
  className?: string;
  getStatus: (date: Date) => "completed" | "failed" | "none";
  onDayClick?: (date: Date, status: "completed" | "failed" | "none") => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const status = getStatus(day.date);
  const isCompleted = status === "completed";
  const isFailed = status === "failed";

  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const defaultClassNames = getDefaultClassNames();

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] rounded-md relative",
        defaultClassNames.day,
        dayClassName
      )}
      onClick={(e) => {
        onDayClick?.(day.date, status);
        props.onClick?.(e);
      }}
      {...props}
    >
      {isCompleted ? (
        <CheckCircle
          className="h-5 w-5 text-primary"
          weight="fill"
          aria-label={`Completed on ${day.date.toLocaleDateString()}`}
        />
      ) : (
        <>
          <span className="text-sm font-medium">{day.date.getDate()}</span>
          {isFailed && (
            <span
              className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-destructive"
              aria-label={`Failed on ${day.date.toLocaleDateString()}`}
            />
          )}
        </>
      )}
    </Button>
  );
}

export function DailyCompletionCalendar({
  completions,
  onDayClick,
  className,
  month: controlledMonth,
  onMonthChange,
}: DailyCompletionCalendarProps) {
  const [internalMonth, setInternalMonth] = useState<Date>(
    controlledMonth || new Date()
  );

  // Convert completions array to Map if needed
  const completionsMap = useMemo(() => {
    if (completions instanceof Map) {
      return completions;
    }

    const map = new Map<string, "completed" | "failed" | "none">();
    for (const item of completions) {
      const dateKey = item.date.toISOString().split("T")[0];
      map.set(dateKey, item.status);
    }
    return map;
  }, [completions]);

  // Get status for a specific date
  const getStatus = useMemo(
    () =>
      (date: Date): "completed" | "failed" | "none" => {
        const dateKey = date.toISOString().split("T")[0];
        return completionsMap.get(dateKey) || "none";
      },
    [completionsMap]
  );

  const month = controlledMonth || internalMonth;
  const handleMonthChange = (newMonth: Date) => {
    if (!controlledMonth) {
      setInternalMonth(newMonth);
    }
    onMonthChange?.(newMonth);
  };

  return (
    <div className={cn("w-fit", className)}>
      <Calendar
        month={month}
        onMonthChange={handleMonthChange}
        mode="single"
        className="w-fit"
        components={{
          DayButton: (props) => (
            <CompletionDayButton
              {...props}
              getStatus={getStatus}
              onDayClick={onDayClick}
            />
          ),
        }}
      />
    </div>
  );
}
