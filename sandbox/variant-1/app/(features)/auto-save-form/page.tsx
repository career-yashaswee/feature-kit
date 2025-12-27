"use client";

import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";

const AutoSaveForm = dynamic(
  () =>
    import("@/features/auto-save-form/components/auto-save-form").then(
      (mod) => ({
        default: mod.AutoSaveForm,
      })
    ),
  { ssr: false }
);
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CursorClick } from "@phosphor-icons/react";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";

interface AutoSaveFormData extends Record<string, unknown> {
  title: string;
  description: string;
  email: string;
}

async function saveFormData(data: AutoSaveFormData) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, 500);
  });

  if (Math.random() > 0.9) {
    throw new Error("Failed to save");
  }
  console.log("Saved:", data);
}

export default function AutoSaveFormPage() {
  const { register, watch, reset } = useForm<AutoSaveFormData>({
    defaultValues: {
      title: "",
      description: "",
      email: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const formData = watch();

  return (
    <>
      <BaseCard>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Changes are saved automatically after 1 second of inactivity. Watch
            for toast notifications showing save status. Data persists in
            localStorage - try refreshing the page!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AutoSaveForm
            data={formData}
            onSave={(data) => saveFormData(data as AutoSaveFormData)}
            storageKey="auto-save-form-demo"
            interval={1000}
            onLoad={(loadedData) => {
              reset(loadedData as AutoSaveFormData);
            }}
          >
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Enter title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  {...register("description")}
                  placeholder="Enter description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter email"
                />
              </div>
            </form>
          </AutoSaveForm>
        </CardContent>
      </BaseCard>

      {(() => {
        const featureData = featuresData.find(
          (f) => f.path === "/auto-save-form"
        );
        if (featureData?.howToTest) {
          return (
            <HowToTestCard
              steps={featureData.howToTest.steps}
              conclusion={featureData.howToTest.conclusion}
              icon={<CursorClick className="h-5 w-5 text-primary" />}
            />
          );
        }
        return null;
      })()}

      {(() => {
        const featureData = featuresData.find(
          (f) => f.path === "/auto-save-form"
        );
        if (featureData?.features) {
          const featuresWithIcons = featureData.features.map((feature) => ({
            icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
            title: feature.title,
            description: feature.description,
          }));
          return <FeaturesGlossary features={featuresWithIcons} />;
        }
        return null;
      })()}
    </>
  );
}
