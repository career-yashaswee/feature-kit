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
      <Card
        className={cn(className, "relative transition-all duration-300 group")}
        {...props}
      >
        {/* Top-left corner */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-3 border-l-3 border-transparent group-hover:border-primary dark:group-hover:border-foreground rounded-tl-lg transition-all duration-300" />
        {/* Top-right corner */}
        <div className="absolute top-0 right-0 w-4 h-4 border-t-3 border-r-3 border-transparent group-hover:border-primary dark:group-hover:border-foreground rounded-tr-lg transition-all duration-300" />
        {/* Bottom-left corner */}
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-3 border-l-3 border-transparent group-hover:border-primary dark:group-hover:border-foreground rounded-bl-lg transition-all duration-300" />
        {/* Bottom-right corner */}
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-3 border-r-3 border-transparent group-hover:border-primary dark:group-hover:border-foreground rounded-br-lg transition-all duration-300" />
        {children}
      </Card>
    </motion.div>
  );
}
