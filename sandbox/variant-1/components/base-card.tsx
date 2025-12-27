"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as React from "react";

export interface BaseCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
}

export function BaseCard({ children, className, ...props }: BaseCardProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      whileHover={{ y: -4 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="w-full"
    >
      <Card className={cn("transition-shadow duration-300", className)} {...props}>
        {children}
      </Card>
    </motion.div>
  );
}

