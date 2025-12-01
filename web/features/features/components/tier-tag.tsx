"use client";

import { Badge } from "@/components/ui/badge";
import type { Tier } from "@/lib/supabase/types";
import { useTranslation } from "react-i18next";

type TierTagProps = {
  tier: Tier;
  className?: string;
};

export function TierTag({ tier, className }: TierTagProps) {
  const { t } = useTranslation();

  return (
    <Badge
      variant={tier === "plus" ? "default" : "secondary"}
      className={className}
      aria-label={t("tier.ariaLabel", { tier: t(`tier.${tier}`) })}
    >
      {t(`tier.${tier}`)}
    </Badge>
  );
}
