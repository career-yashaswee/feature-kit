"use client";

import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";

const AutoSaveForm = dynamic(
  () =>
    import("@/features/auto-save-form/components/auto-save-form").then(
      (mod) => ({
        default: mod.AutoSaveForm,
      }),
    ),
  { ssr: false },
);
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  title: string;
  description: string;
  email: string;
}

async function saveFormData(data: FormData, signal?: AbortSignal) {
  await new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      if (signal?.aborted) {
        reject(new DOMException("The operation was aborted.", "AbortError"));
      } else {
        resolve(undefined);
      }
    }, 500);

    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timeoutId);
        reject(new DOMException("The operation was aborted.", "AbortError"));
      });
    }
  });

  if (signal?.aborted) {
    throw new DOMException("The operation was aborted.", "AbortError");
  }

  if (Math.random() > 0.9) {
    throw new Error("Failed to save");
  }
  console.log("Saved:", data);
}

export default function AutoSaveFormPage() {
  const { register, watch, reset } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      email: "",
    },
  });

  const formData = watch();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Auto-Save Form</h1>
          <p className="text-muted-foreground">
            A form that auto-saves with debounce and localStorage backup
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>
              Changes are saved automatically after 1 second of inactivity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AutoSaveForm
              data={formData}
              onSave={saveFormData}
              storageKey="auto-save-form-demo"
              debounceMs={1000}
              onLoadFromStorage={(loadedData) => {
                reset(loadedData);
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
        </Card>
      </div>
    </div>
  );
}
