"use client";

import { CardHeader, CardTitle } from "@/components/ui/card";
import type { StackWithDependencyCount } from "../hooks/use-stacks";
import { BaseCard } from "@/components/common/base-card";

type StackCardProps = {
  stack: StackWithDependencyCount;
};

export function StackCard({ stack }: StackCardProps) {
  const dependencyText =
    stack.dependency_count === 1 ? "dependency" : "dependencies";

  return (
    <BaseCard
      className="transition-shadow cursor-pointer h-full"
      role="article"
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-xl mb-2">{stack.name}</CardTitle>
        {stack.description && (
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {stack.description}
          </p>
        )}
        <p
          className="text-sm text-muted-foreground"
          aria-label={`${stack.dependency_count} ${dependencyText}`}
        >
          {stack.dependency_count} {dependencyText}
        </p>
      </CardHeader>
    </BaseCard>
  );
}
