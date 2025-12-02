"use client";

import { useQuery } from "@tanstack/react-query";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Stack } from "@/lib/supabase/types";

type StackWithDependencyCount = Stack & {
  dependency_count: number;
};

type StackResponse = Stack & {
  stack_dependencies: Array<{ dependency_id: string }> | null;
};

async function fetchStacks(): Promise<StackWithDependencyCount[]> {
  const { data, error } = await getSupabaseClient()
    .from("stacks")
    .select(
      `
      *,
      stack_dependencies(dependency_id)
    `,
    )
    .order("name", { ascending: true });

  if (error) throw error;

  return (data || []).map((stack: StackResponse) => ({
    ...stack,
    dependency_count: stack.stack_dependencies?.length || 0,
  }));
}

export function useStacks() {
  return useQuery({
    queryKey: ["stacks"],
    queryFn: fetchStacks,
  });
}

export type { StackWithDependencyCount };

