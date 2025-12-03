"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Sparkles,
  Code,
  Settings,
  Zap,
  MousePointerClick,
  Crown,
  Star,
  Trophy,
} from "lucide-react";
import { ConsequenceConfirmationDialog } from "@/features/consequence-confirmation-dialog/components/consequence-confirmation-dialog";
import { useConsequenceConfirmationDialog } from "@/features/consequence-confirmation-dialog/hooks/use-consequence-confirmation-dialog";
import { toast } from "sonner";

export default function ConsequenceConfirmationDialogPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<
    "default" | "destructive" | "warning" | "info" | "consequence"
  >("default");
  const [isLoading, setIsLoading] = useState(false);

  const {
    isOpen: hookIsOpen,
    options,
    confirm,
    handleConfirm,
    handleCancel,
  } = useConsequenceConfirmationDialog();

  const handleConfirmAction = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Action confirmed!");
    setIsLoading(false);
    setIsOpen(false);
  };

  const handleHookConfirm = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Action confirmed via hook!");
    setIsLoading(false);
    handleConfirm();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <AlertTriangle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Confirmation Dialogs</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Confirmation Dialog
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A flexible confirmation dialog component with multiple variants and
            a convenient hook for programmatic usage. Perfect for confirming
            destructive actions or important operations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge
              variant="default"
              className="gap-1.5 text-secondary bg-foreground dark:bg-secondary/60 dark:text-secondary-foreground"
            >
              <Sparkles className="h-3 w-3" />
              Multiple Variants
            </Badge>
            <Badge
              variant="default"
              className="gap-1.5 text-secondary bg-foreground dark:bg-secondary/60 dark:text-secondary-foreground"
            >
              <Settings className="h-3 w-3" />
              Customizable
            </Badge>
            <Badge
              variant="default"
              className="gap-1.5 text-secondary bg-foreground dark:bg-secondary/60 dark:text-secondary-foreground"
            >
              <Code className="h-3 w-3" />
              TypeScript
            </Badge>
            <Badge
              variant="default"
              className="gap-1.5 text-secondary bg-foreground dark:bg-secondary/60 dark:text-secondary-foreground"
            >
              <Zap className="h-3 w-3" />
              Hook Support
            </Badge>
          </div>
        </section>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <MousePointerClick className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">How to Test</CardTitle>
                <CardDescription className="text-base">
                  Click the buttons below to see different dialog variants and
                  test the confirmation flow
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Testing Steps:</h3>
              <ol className="space-y-3">
                {[
                  "Click any of the variant buttons below to open a confirmation dialog",
                  "Try confirming the action to see the loading state",
                  "Try canceling to see the dialog close without action",
                  "Test the hook-based dialog for programmatic usage",
                ].map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 rounded-lg border bg-muted/50 p-3 text-sm"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Dialog Variants</CardTitle>
              <CardDescription>
                Test different dialog variants with various use cases
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-semibold">Default Variant</h3>
                <p className="text-sm text-muted-foreground">
                  For general confirmations
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setVariant("default");
                    setIsOpen(true);
                  }}
                >
                  Open Default Dialog
                </Button>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold">Destructive Variant</h3>
                <p className="text-sm text-muted-foreground">
                  For dangerous actions like delete
                </p>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setVariant("destructive");
                    setIsOpen(true);
                  }}
                >
                  Open Destructive Dialog
                </Button>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold">Warning Variant</h3>
                <p className="text-sm text-muted-foreground">
                  For warnings that need attention
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setVariant("warning");
                    setIsOpen(true);
                  }}
                >
                  Open Warning Dialog
                </Button>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold">Info Variant</h3>
                <p className="text-sm text-muted-foreground">
                  For informational confirmations
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setVariant("info");
                    setIsOpen(true);
                  }}
                >
                  Open Info Dialog
                </Button>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold">Consequence Variant</h3>
                <p className="text-sm text-muted-foreground">
                  For destructive actions with labels, values, and confirmation input
                </p>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setVariant("consequence");
                    setIsOpen(true);
                  }}
                >
                  Open Consequence Dialog
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Hook-Based Usage</CardTitle>
              <CardDescription>
                Use the useConsequenceConfirmationDialog hook for programmatic
                dialog control
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The hook allows you to trigger confirmation dialogs
                programmatically, which is useful for complex flows or when you
                need to show dialogs based on certain conditions.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() =>
                    confirm({
                      title: "Delete Item",
                      message:
                        "Are you sure you want to delete this item? This action cannot be undone.",
                      variant: "destructive",
                      confirmLabel: "Delete",
                      cancelLabel: "Cancel",
                      onConfirm: handleHookConfirm,
                    })
                  }
                  variant="destructive"
                >
                  Trigger Hook Dialog (Destructive)
                </Button>
                <Button
                  onClick={() =>
                    confirm({
                      title: "Save Changes",
                      message:
                        "You have unsaved changes. Do you want to save them before continuing?",
                      variant: "default",
                      confirmLabel: "Save",
                      cancelLabel: "Discard",
                      onConfirm: handleHookConfirm,
                    })
                  }
                  variant="outline"
                >
                  Trigger Hook Dialog (Default)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: AlertTriangle,
                  title: "Multiple Variants",
                  description:
                    "Default, destructive, warning, and info variants with appropriate styling",
                },
                {
                  icon: Settings,
                  title: "Loading States",
                  description:
                    "Built-in loading state support for async confirmation actions",
                },
                {
                  icon: Code,
                  title: "useConsequenceConfirmationDialog Hook",
                  description:
                    "Convenient hook for programmatic dialog control",
                },
                {
                  icon: Zap,
                  title: "Customizable",
                  description: "Custom labels, messages, and styling options",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group flex gap-4 rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <div className="rounded-lg bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <ConsequenceConfirmationDialog
          open={isOpen}
          onOpenChange={setIsOpen}
          onConfirm={handleConfirmAction}
          title={
            variant === "destructive"
              ? "Delete Item"
              : variant === "warning"
                ? "Warning"
                : variant === "info"
                  ? "Information"
                  : variant === "consequence"
                    ? "Delete Account"
                    : "Confirm Action"
          }
          message={
            variant === "destructive"
              ? "Are you sure you want to delete this item? This action cannot be undone."
              : variant === "warning"
                ? "This action may have unintended consequences. Are you sure you want to continue?"
                : variant === "info"
                  ? "Please confirm that you want to proceed with this action."
                  : variant === "consequence"
                    ? undefined
                    : "Are you sure you want to proceed with this action?"
          }
          variant={variant}
          isLoading={isLoading}
          confirmLabel={variant === "destructive" || variant === "consequence" ? "Delete Account" : "Confirm"}
          subtitle={variant === "consequence" ? "This action cannot be undone" : undefined}
          items={
            variant === "consequence"
              ? [
                  {
                    icon: Crown,
                    label: "Subscription",
                    value: "Plus Active",
                  },
                  {
                    icon: Star,
                    label: "Level",
                    value: "1",
                  },
                  {
                    icon: Trophy,
                    label: "Compositions Solved",
                    value: "1 solved",
                  },
                ]
              : undefined
          }
          details={
            variant === "consequence"
              ? "Your profile and account data, All compositions and progress, Badges, points, and achievements, Notifications and preferences, All other associated data."
              : undefined
          }
          confirmationText={variant === "consequence" ? "DELETE" : undefined}
          confirmationPlaceholder={variant === "consequence" ? "DELETE" : undefined}
        />

        {hookIsOpen && options && (
          <ConsequenceConfirmationDialog
            open={hookIsOpen}
            onOpenChange={handleCancel}
            onConfirm={handleHookConfirm}
            title={options.title}
            message={options.message}
            variant={options.variant}
            isLoading={isLoading}
            confirmLabel={options.confirmLabel}
            cancelLabel={options.cancelLabel}
          />
        )}
      </main>
    </div>
  );
}
