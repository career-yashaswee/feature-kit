"use client";

import { useQuery } from "@tanstack/react-query";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Kit } from "@/lib/supabase/types";

async function fetchKits(): Promise<Kit[]> {
  const { data, error } = await getSupabaseClient()
    .from("kits")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return data || [];
}

export function useKits() {
  return useQuery({
    queryKey: ["kits"],
    queryFn: fetchKits,
  });
}
