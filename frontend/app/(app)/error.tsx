'use client'

import { AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="p-6 md:p-8">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="bg-destructive/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="text-destructive" size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
          <p className="text-muted-foreground mt-2">An unexpected error has occurred. Please try again.</p>
        </div>
        <div className="space-y-2">
          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition"
          >
            Try again
          </button>
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
