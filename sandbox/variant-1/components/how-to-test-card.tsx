import { CursorClick } from "@phosphor-icons/react/ssr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface HowToTestCardProps {
  title?: string;
  steps: string[];
  conclusion?: string;
  icon?: React.ReactNode;
}

export function HowToTestCard({
  title = "How to Test",
  steps,
  conclusion,
  icon,
}: HowToTestCardProps) {
  const defaultIcon = <CursorClick className="h-5 w-5 text-primary" />;

  return (
    <Card className="border-2 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-2">
            {icon || defaultIcon}
          </div>
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            {conclusion && (
              <CardDescription className="text-base">
                {conclusion}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Testing Steps</h3>
          <ol className="space-y-3">
            {steps.map((step, index) => (
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
        {conclusion && (
          <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-4">
            <p className="text-sm font-medium text-foreground">{conclusion}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
