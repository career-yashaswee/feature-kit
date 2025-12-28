import { CursorClick, TestTubeIcon } from "@phosphor-icons/react/ssr";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import { Separator } from "@/components/ui/separator";

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
    <BaseCard>
      <CardHeader>
        <div className="flex gap-2 items-center">
          <div className="rounded-sm bg-primary/10 p-2 group-hover:bg-primary transition-all duration-300 ease-in-out">
            <TestTubeIcon
              className="h-5 w-5 text-primary group-hover:text-white transition-all duration-300 ease-in-out"
              weight="duotone"
            />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-foreground/40 transition-all duration-300 ease-in-out group-hover:text-foreground whitespace-nowrap">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      {/* <Separator className="p-0.5 bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] group-hover:opacity-100 opacity-50 transition-all duration-300 ease-in-out" /> */}
      <CardContent className="space-y-4 group-hover:bg-background/10 rounded-md transition-all duration-300 ease-in-out">
        <div className="space-y-3">
          {/* <h3 className="font-semibold text-lg">Testing Steps</h3> */}
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
      </CardContent>
      {/* <Separator className="p-0.5 bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] group-hover:opacity-100 opacity-50 transition-all duration-300 ease-in-out" /> */}
      <CardFooter>
        {conclusion && (
          <CardDescription className="text-sm text-muted-foreground/40 transition-all duration-300 ease-in-out group-hover:text-muted-foreground">
            {conclusion}
          </CardDescription>
        )}
      </CardFooter>
    </BaseCard>
  );
}
