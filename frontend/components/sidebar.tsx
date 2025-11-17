'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/upload', icon: '📤', label: 'Upload Document' },
  { href: '/documents', icon: '📑', label: 'All Documents' },
  { href: '/departments', icon: '🏢', label: 'Departments' },
  { href: '/compliance', icon: '✓', label: 'Compliance Center' },
  { href: '/settings', icon: '⚙️', label: 'Settings' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  if (pathname === '/login' || pathname === '/forgot-password') {
    return null
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 px-4 bg-background border-b border-border md:hidden">
        <div className="text-lg font-bold text-primary">KMRL</div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-muted rounded-md"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-transform duration-200 ease-in-out',
          'md:translate-x-0 md:sticky md:top-0 md:h-screen',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full p-6 space-y-8">
          {/* Logo */}
          <div className="hidden md:block">
            <div className="text-2xl font-bold text-sidebar-primary">KMRL</div>
            <p className="text-xs text-sidebar-foreground/60">Document Intelligence</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full transition-colors">
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
