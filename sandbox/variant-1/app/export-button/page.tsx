"use client";

import dynamic from "next/dynamic";

const ExportButton = dynamic(
  () =>
    import("@/features/export-button/components/export-button").then((mod) => ({
      default: mod.ExportButton,
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

async function fetchExportData() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
  ];
}

export default function ExportButtonPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Export Button</h1>
          <p className="text-muted-foreground">
            A button that exports data to CSV with timestamp
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>User Data</CardTitle>
                <CardDescription>
                  Export user data to CSV file
                </CardDescription>
              </div>
              <ExportButton
                fetchData={fetchExportData}
                filename="users"
                resource="user data"
                onSuccess={() => console.log("Exported!")}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>Click the export button to download user data as CSV.</p>
              <p className="text-muted-foreground">
                The file will be timestamped automatically.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

