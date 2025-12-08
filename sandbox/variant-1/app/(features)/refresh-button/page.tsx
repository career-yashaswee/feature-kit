"use client";

import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const RefreshButton = dynamic(
  () =>
    import("@/features/refresh-button/components/refresh-button").then(
      (mod) => ({
        default: mod.RefreshButton,
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

async function fetchData() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    timestamp: new Date().toISOString(),
    data: "Sample data",
  };
}

export default function RefreshButtonPage() {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["sample-data"],
    queryFn: fetchData,
  });

  return (
    <>
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
            {isError ? (
              <p className="text-muted-foreground">
                {error?.message || "Failed to load data"}
              </p>
            ) : isLoading || isFetching ? (
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
    </>
  );
}
