'use client'

import Link from 'next/link'

interface SummaryHighlightProps {
  id: string
  title: string
  category: 'Safety' | 'Engineering' | 'HR' | 'Regulatory' | 'Finance'
  summary: string
  count?: number
}

const categoryEmojis = {
  Safety: '⚠️',
  Engineering: 'ℹ️',
  HR: '👥',
  Regulatory: '✓',
  Finance: '💰',
}

const categoryColors = {
  Safety: 'text-red-600 bg-red-50 dark:bg-red-900/20',
  Engineering: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
  HR: 'text-green-600 bg-green-50 dark:bg-green-900/20',
  Regulatory: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20',
  Finance: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20',
}

export default function SummaryHighlight({ id, title, category, summary, count }: SummaryHighlightProps) {
  const emoji = categoryEmojis[category]
  const colorClass = categoryColors[category]

  return (
    <Link href={`/document/${id}`}>
      <div className={`${colorClass} border border-border rounded-lg p-5 hover:shadow-md transition-all cursor-pointer`}>
        <div className="flex items-start gap-4">
          <div className="text-2xl">{emoji}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">{title}</h4>
              {count && (
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                  {count}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{summary}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
