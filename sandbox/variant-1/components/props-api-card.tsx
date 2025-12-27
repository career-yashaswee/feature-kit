"use client";

import { Code } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
                value={
                  typeof prop.value === "number"
                    ? prop.value
                    : safeNumber
                }
                onChange={(e) => {
                  const newValue =
                    e.target.value === ""
                      ? safeNumber
                      : Number(e.target.value);
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
    <Card className="border-2 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-2">
            <Code className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-2xl">Props API</CardTitle>
        </div>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <Table>
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
    </Card>
  );
}

