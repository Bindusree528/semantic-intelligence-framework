'use client'

import Link from 'next/link'
import { Eye } from 'lucide-react'

interface SearchResult {
  id: string
  title: string
  snippet: string
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  type: string
  source: string
  uploadDate: string
}

interface SearchResultsProps {
  results: SearchResult[]
  totalCount: number
  isLoading?: boolean
}

const priorityColors = {
  Low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  High: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  Critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

export default function SearchResults({ results, totalCount, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="h-6 bg-muted rounded w-3/4 mb-3" />
            <div className="h-4 bg-muted rounded w-full mb-2" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
        ))}
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <p className="text-lg font-medium text-foreground">No documents found</p>
        <p className="text-muted-foreground mt-2">Try adjusting your search filters or keywords</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Found {totalCount} result{totalCount !== 1 ? 's' : ''}
      </p>

      {results.map((result) => (
        <Link key={result.id} href={`/document/${result.id}`}>
          <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors mb-2">
                  {result.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {result.snippet}
                </p>
                <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-muted rounded">{result.type}</span>
                  <span className="px-2 py-1 bg-muted rounded">{result.source}</span>
                  <span>{result.uploadDate}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 ml-2">
                <span className={`px-3 py-1 rounded text-xs font-bold whitespace-nowrap ${priorityColors[result.priority]}`}>
                  {result.priority}
                </span>
                <Eye size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
