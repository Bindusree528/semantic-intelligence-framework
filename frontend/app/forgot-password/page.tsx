'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      // TODO: Connect to backend API to send password reset email
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="text-primary" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-card-foreground mb-2">Check your email</h1>
            <p className="text-muted-foreground mb-6">
              We{'\''}ve sent password reset instructions to<br />
              <strong>{email}</strong>
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Check your inbox and follow the link to reset your password.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
            >
              <ArrowLeft size={18} />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8"
        >
          <ArrowLeft size={18} />
          Back to login
        </Link>

        <div className="bg-card border border-border rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-card-foreground mb-2">Reset password</h1>
          <p className="text-muted-foreground mb-8">
            Enter your email address and we{'\''}ll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition"
            >
              Send reset link
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
