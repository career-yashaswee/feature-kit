'use client'

import { ErrorBoundary } from 'react-error-boundary'
import { Button } from '@/components/ui/button'

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-destructive mb-2">
          Something went wrong
        </h2>
        <p className="text-muted-foreground mb-4">
          {error.message || 'An unexpected error occurred'}
        </p>
        <Button onClick={resetErrorBoundary} variant="outline">
          Try again
        </Button>
      </div>
    </div>
  )
}

export function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  )
}


