"use client";

import Link from "next/link";
import { Img } from "react-image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Project } from "@/lib/supabase/types";
import { ExternalLink } from "lucide-react";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer h-full overflow-hidden group"
      role="article"
    >
      {project.thumbnail_url && (
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
          <Img
            src={project.thumbnail_url}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loader={
              <div className="w-full h-full flex items-center justify-center">
                <Skeleton className="w-full h-full" />
              </div>
            }
            unloader={
              <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                <span className="text-sm">Image unavailable</span>
              </div>
            }
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl flex-1">{project.name}</CardTitle>
          {project.preview_url && (
            <Link
              href={project.preview_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`Visit ${project.name}`}
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          )}
        </div>
        {project.description && (
          <CardDescription className="line-clamp-2">
            {project.description}
          </CardDescription>
        )}
      </CardHeader>
    </BaseCard>
  );
}
