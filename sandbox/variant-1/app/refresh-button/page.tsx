"use client";

import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const RefreshButton = dynamic(
  () =>
    import("@/features/refresh-button/components/refresh-button").then((mod) => ({
      default: mod.RefreshButton,
    })),
  { ssr: false }
);
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function fetchData() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    timestamp: new Date().toISOString(),
    data: "Sample data",
  };
}

export default function RefreshButtonPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["sample-data"],
    queryFn: fetchData,
  });

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Refresh Button</h1>
          <p className="text-muted-foreground">
            A button that invalidates React Query keys and shows toast
            notifications
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Sample Data</CardTitle>
                <CardDescription>
                  Click refresh to reload this data
                </CardDescription>
              </div>
              <RefreshButton
                queryKeys={[["sample-data"]]}
                resource="sample data"
                onSuccess={() => console.log("Refreshed!")}
              />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Timestamp:</span>{" "}
                  {data?.timestamp}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Data:</span> {data?.data}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

