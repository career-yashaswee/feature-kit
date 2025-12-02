"use client";

import { useTranslation } from "react-i18next";
import { useProjects } from "@/features/showcases/hooks/use-projects";
import { ProjectCard } from "@/features/showcases/components/project-card";
import { ProjectCardSkeleton } from "@/components/common/loading-skeleton";

export default function ShowcasesPage() {
  const { t } = useTranslation();
  const { data: projects = [], isLoading: loading } = useProjects();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Showcases</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No showcases available</p>
      )}
    </div>
  );
}
