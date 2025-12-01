"use client";

import { useQuery } from "@tanstack/react-query";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Project } from "@/lib/supabase/types";

async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await getSupabaseClient()
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
}

