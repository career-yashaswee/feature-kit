"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  Lightning,
  Gear,
  CheckCircle,
  ArrowRight,
} from "@phosphor-icons/react";
import { OnboardingLayout } from "@/features/on-boarding/components/onboarding-layout";
import type { OnboardingStep } from "@/features/on-boarding/types";

const sampleSteps: OnboardingStep[] = [
  {
    id: "welcome",
    order: 1,
    title: "Welcome",
    description: "Get started with your onboarding journey",
  },
  {
    id: "profile",
    order: 2,
    title: "Set Up Profile",
    description: "Tell us a bit about yourself",
  },
  {
    id: "preferences",
    order: 3,
    title: "Preferences",
    description: "Customize your experience",
  },
  {
    id: "complete",
    order: 4,
    title: "Complete",
    description: "You're all set!",
  },
];

const features = [
  {
    title: "Step Navigation",
    description: "Visual stepper with completed, active, and upcoming states",
    icon: Rocket,
  },
  {
    title: "Responsive Design",
    description: "Adapts to mobile and desktop with sidebar stepper",
    icon: Gear,
  },
  {
    title: "Configurable",
    description: "Customizable steps, translations, and branding",
    icon: Lightning,
  },
];

export default function OnBoardingPage() {
  const [showDemo, setShowDemo] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleNext = async () => {
    if (currentStep < sampleSteps.length) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCurrentStep(currentStep + 1);
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < sampleSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkipEntire = () => {
    setShowDemo(false);
    setCurrentStep(1);
  };

  const canGoNext = currentStep < sampleSteps.length;
  const canGoPrevious = currentStep > 1;
  const canSkip = currentStep < sampleSteps.length - 1;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Welcome to FeatureKit</CardTitle>
              <CardDescription>
                Let&apos;s get you started with a quick setup process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This onboarding will guide you through the essential steps to
                get the most out of FeatureKit.
              </p>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Set Up Your Profile</CardTitle>
              <CardDescription>Tell us a bit about yourself</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                />
              </div>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Choose your preferences for notifications, theme, and more.
              </p>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                You&apos;re All Set!
              </CardTitle>
              <CardDescription>Your onboarding is complete</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Thank you for completing the onboarding process. You can now
                start using FeatureKit!
              </p>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  if (showDemo) {
    return (
      <OnboardingLayout
        steps={sampleSteps}
        currentStep={currentStep}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSkip={handleSkip}
        onSkipEntire={handleSkipEntire}
        isLoading={isLoading}
        canGoNext={canGoNext}
        canGoPrevious={canGoPrevious}
        canSkip={canSkip}
        branding={{
          name: "FeatureKit",
          icon: <Rocket className="w-5 h-5 text-white" />,
          helpUrl: "https://example.com/help",
        }}
      >
        {renderStepContent()}
      </OnboardingLayout>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Rocket className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the Onboarding Layout component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Click the 'Launch Demo' button below to see the full onboarding experience",
                "Navigate through steps using Previous/Next buttons",
                "Try the Skip button on steps that allow it",
                "Notice the stepper on the left showing progress",
                "Resize the window to see responsive behavior",
                "Check the mobile menu button for step navigation",
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
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Rocket className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Interactive Demo</CardTitle>
            </div>
            <CardDescription>
              Launch the full onboarding experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-6 border rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-4">
                Click the button below to launch the full-screen onboarding
                layout. You&apos;ll see:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Sidebar with step progress
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Content area with step-specific content
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Navigation buttons at the bottom
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Responsive mobile layout
                </li>
              </ul>
              <Button
                onClick={() => setShowDemo(true)}
                size="lg"
                className="w-full"
              >
                Launch Demo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Rocket className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Step Configuration</CardTitle>
            </div>
            <CardDescription>
              Example of how to configure onboarding steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleSteps.map((step) => (
                <div
                  key={step.id}
                  className="flex items-start gap-3 rounded-lg border bg-muted/50 p-3"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium shrink-0">
                    {step.order}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{step.title}</div>
                    {step.description && (
                      <div className="text-sm text-muted-foreground">
                        {step.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Lightning className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature, index) => (
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
      </main>
    </div>
  );
}
