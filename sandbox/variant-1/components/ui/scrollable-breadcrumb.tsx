"use client";

import * as React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

function ScrollableBreadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function ScrollableBreadcrumbList({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="breadcrumb-list"
      className={cn(
        "flex items-center gap-1.5 overflow-x-auto scrollbar-hide",
        className,
      )}
      {...props}
    />
  );
}

function ScrollableBreadcrumbItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5 shrink-0", className)}
      {...props}
    />
  );
}

function ScrollableBreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  if (asChild) {
    return <>{props.children}</>;
  }

  return (
    <a
      data-slot="breadcrumb-link"
      className={cn(
        "hover:text-foreground transition-colors text-muted-foreground text-sm",
        className,
      )}
      {...props}
    />
  );
}

function ScrollableBreadcrumbPage({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal text-sm", className)}
      {...props}
    />
  );
}

function ScrollableBreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5 shrink-0", className)}
      {...props}
    >
      {children ?? <ChevronRight className="size-3.5" />}
    </div>
  );
}

function ScrollableBreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-9 items-center justify-center shrink-0",
        className,
      )}
      {...props}
    >
      <MoreHorizontal className="size-4" />
    </span>
  );
}

export {
  ScrollableBreadcrumb,
  ScrollableBreadcrumbList,
  ScrollableBreadcrumbItem,
  ScrollableBreadcrumbLink,
  ScrollableBreadcrumbPage,
  ScrollableBreadcrumbSeparator,
  ScrollableBreadcrumbEllipsis,
};
