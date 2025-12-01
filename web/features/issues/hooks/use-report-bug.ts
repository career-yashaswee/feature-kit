"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSupabaseClient } from "@/lib/supabase/client";

type ReportBugData = {
  feature_id: string;
  issue_text: string;
};

async function reportBug(data: ReportBugData) {
  const { error } = await getSupabaseClient().from("issues").insert({
    feature_id: data.feature_id,
    issue_text: data.issue_text,
  });

  if (error) throw error;
}

export function useReportBug() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reportBug,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
}
