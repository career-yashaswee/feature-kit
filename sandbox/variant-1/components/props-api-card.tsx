"use client";

import { Code } from "@phosphor-icons/react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PropConfig } from "@/hooks/use-props-api";
import { CodeBlockIcon } from "@phosphor-icons/react/dist/ssr";
import { Separator } from "@/components/ui/separator";

interface PropsApiCardProps {
  props: PropConfig[];
  onValueChange: (index: number, value: string | number | boolean) => void;
  description?: string;
}

function PropRow({
  prop,
  index,
  onChange,
}: {
  prop: PropConfig;
  index: number;
  onChange: (index: number, value: string | number | boolean) => void;
}) {
  return (
    <TableRow>
      <TableCell
        className="font-medium text-sm"
        style={{
          fontFamily: "var(--font-ibm-plex-sans), sans-serif",
        }}
      >
        {prop.property}
      </TableCell>
      <TableCell
        className="text-xs text-muted-foreground"
        style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif" }}
      >
        {prop.type}
      </TableCell>
      <TableCell
        className="text-sm text-muted-foreground"
        style={{
          fontFamily: "var(--font-ibm-plex-sans), sans-serif",
        }}
      >
        {prop.description}
      </TableCell>
      <TableCell>
        {prop.inputType === "select" ? (
          <Select
            value={String(prop.value)}
            onValueChange={(value) => onChange(index, value)}
          >
            <SelectTrigger className="h-8 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {prop.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : prop.inputType === "boolean" ? (
          <Select
            value={String(prop.value)}
            onValueChange={(value) => onChange(index, value === "true")}
          >
            <SelectTrigger className="h-8 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">true</SelectItem>
              <SelectItem value="false">false</SelectItem>
            </SelectContent>
          </Select>
        ) : prop.inputType === "number" ? (
          (() => {
            // Compute safeNumber: use defaultValue if numeric, otherwise try value, fallback to 0
            const safeNumber =
              typeof prop.defaultValue === "number"
                ? prop.defaultValue
                : Number(prop.value) || 0;
            return (
              <Input
                type="number"
                value={typeof prop.value === "number" ? prop.value : safeNumber}
                onChange={(e) => {
                  const newValue =
                    e.target.value === "" ? safeNumber : Number(e.target.value);
                  // Type guard to ensure we never pass undefined or NaN
                  if (typeof newValue === "number" && !isNaN(newValue)) {
                    onChange(index, newValue);
                  } else {
                    onChange(index, safeNumber);
                  }
                }}
                className="h-8"
              />
            );
          })()
        ) : (
          <Input
            type="text"
            value={String(prop.value)}
            onChange={(e) => onChange(index, e.target.value)}
            placeholder={`Enter ${prop.property}`}
            className="h-8"
          />
        )}
      </TableCell>
    </TableRow>
  );
}

export function PropsApiCard({
  props,
  onValueChange,
  description,
}: PropsApiCardProps) {
  return (
    <BaseCard>
      <CardHeader>
        <div className="flex gap-2 items-center">
          <div className="rounded-sm bg-primary/10 p-2 group-hover:bg-primary transition-all duration-300 ease-in-out">
            <CodeBlockIcon
              className="h-5 w-5 text-primary group-hover:text-white transition-all duration-300 ease-in-out"
              weight="duotone"
            />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-foreground/40 transition-all duration-300 ease-in-out group-hover:text-foreground whitespace-nowrap">
            Props API
          </CardTitle>
        </div>
      </CardHeader>
      {/* <Separator className="p-0.5 bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] group-hover:opacity-100 opacity-50 transition-all duration-300 ease-in-out" /> */}
      <CardContent>
        <Table className="group-hover:bg-background/10 rounded-md transition-all duration-300 ease-in-out">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Property</TableHead>
              <TableHead className="w-[200px]">Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[200px]">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.map((prop, index) => (
              <PropRow
                key={`${prop.property}-${index}`}
                prop={prop}
                index={index}
                onChange={onValueChange}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {/* <Separator className="p-0.5 bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] group-hover:opacity-100 opacity-50 transition-all duration-300 ease-in-out" /> */}
      <CardFooter>
        {description && (
          <CardDescription className="text-sm text-muted-foreground/40 transition-all duration-300 ease-in-out group-hover:text-muted-foreground whitespace-nowrap">
            {description}
          </CardDescription>
        )}
      </CardFooter>
    </BaseCard>
  );
}
