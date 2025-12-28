import {
  Function,
  FunctionIcon,
  Sparkle,
  Star,
} from "@phosphor-icons/react/ssr";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import { Separator } from "@/components/ui/separator";

export interface FeatureItem {
  id?: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FeaturesGlossaryProps {
  title?: string;
  features: FeatureItem[];
  icon?: React.ReactNode;
}

export function FeaturesGlossary({
  title = "Features",
  features,
  icon,
}: FeaturesGlossaryProps) {
  const defaultIcon = (
    <Function weight="duotone" className="h-5 w-5 text-primary" />
  );

  return (
    <BaseCard>
      <CardHeader>
        <div className="flex gap-2 items-center">
          <div className="rounded-sm bg-primary/10 p-2 group-hover:bg-primary transition-all duration-300 ease-in-out">
            <FunctionIcon
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
      <CardContent className="group-hover:bg-background/10 rounded-md transition-all duration-300 ease-in-out">
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.id ?? feature.title}
              className="group flex gap-4 rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="rounded-lg bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
                {feature.icon}
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
      {/* <Separator className="p-0.5 bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] group-hover:opacity-100 opacity-50 transition-all duration-300 ease-in-out" /> */}
      <CardFooter>
        {/* Footer content can be added here if needed */}
      </CardFooter>
    </BaseCard>
  );
}
