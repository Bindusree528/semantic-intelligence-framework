'use client'

import Link from 'next/link'

interface DocumentCardProps {
  id: string
  title: string
  type: 'PDF' | 'DOCX' | 'Scan' | 'Email' | 'CSV'
  source: string
  uploader: string
  timestamp: string
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  summary: string
}

const priorityColors = {
  Low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  High: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  Critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

const typeIcons = {
  PDF: '📄',
  DOCX: '📝',
  Scan: '📷',
  Email: '✉️',
  CSV: '📊',
}

export default function DocumentCard({ id, title, type, source, uploader, timestamp, priority, summary }: DocumentCardProps) {
  return (
    <Link href={`/document/${id}`}>
      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="text-2xl">{typeIcons[type]}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-card-foreground truncate">{title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{source}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ml-2 ${priorityColors[priority]}`}>
            {priority}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{summary}</p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex gap-3">
            <span>{uploader}</span>
            <span>•</span>
            <span>{timestamp}</span>
          </div>
          <span>👁️</span>
        </div>
      </div>
    </Link>
  )
}
