"use client";

import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NetworkStatusListener = dynamic(
  () =>
    import("@/components/network-status-listener").then((mod) => ({
      default: mod.NetworkStatusListener,
    })),
  { ssr: false }
);

export default function HomePage() {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Network Status Listener</h1>
          <p className="text-muted-foreground">
            A component that monitors network connectivity and shows
            notifications when you go offline or come back online.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How to Test</CardTitle>
            <CardDescription>
              Try disconnecting your internet connection to see the component in
              action
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Steps:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Open your browser&apos;s DevTools (F12)</li>
                <li>Go to the Network tab</li>
                <li>Enable &quot;Offline&quot; mode or disconnect your WiFi</li>
                <li>
                  You should see a red &quot;Offline&quot; indicator and a toast
                  notification
                </li>
                <li>
                  Reconnect to see the &quot;Connection restored&quot; toast
                </li>
              </ol>
            </div>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                The component is active on this page. Check the bottom-right
                corner when you go offline.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Automatic network state detection</li>
              <li>Toast notifications on status change</li>
              <li>Visual offline indicator</li>
              <li>Customizable messages</li>
              <li>TypeScript support</li>
              <li>Zero configuration required</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Network Status Listener Component */}
      <NetworkStatusListener
        showToast={false}
        offlineMessage="You are offline. Please check your connection."
        onlineMessage="Connection restored. You are back online."
      />
    </div>
  );
}
