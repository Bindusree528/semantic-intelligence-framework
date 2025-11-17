'use client'

import { useState } from 'react'
import DocumentCard from '@/components/document-card'
import SummaryHighlight from '@/components/summary-highlight'
import FilterBar from '@/components/filter-bar'

const dummyDocuments = [
  {
    id: '1',
    title: 'Rolling Stock Maintenance Report - November 2025',
    type: 'PDF' as const,
    source: 'Engineering Department',
    uploader: 'Raj Kumar',
    timestamp: '2 hours ago',
    priority: 'High' as const,
    summary: 'Comprehensive maintenance report covering fleet health, pending repairs, and safety compliance...'
  },
  {
    id: '2',
    title: 'Monthly Safety Audit Summary',
    type: 'DOCX' as const,
    source: 'Safety Department',
    uploader: 'Priya Singh',
    timestamp: '4 hours ago',
    priority: 'Critical' as const,
    summary: 'Critical safety findings from October audit including platform safety checks and emergency procedures...'
  },
  {
    id: '3',
    title: 'Station Renovation Project - Phase 1',
    type: 'PDF' as const,
    source: 'Procurement',
    uploader: 'Vikram Patel',
    timestamp: '6 hours ago',
    priority: 'High' as const,
    summary: 'Project documentation for station renovation including budget allocation, timeline, and vendor details...'
  },
  {
    id: '4',
    title: 'Q4 Financial Review Email',
    type: 'Email' as const,
    source: 'Finance Department',
    uploader: 'Anjali Desai',
    timestamp: '1 day ago',
    priority: 'Medium' as const,
    summary: 'Quarterly financial review highlighting expenditure patterns, revenue growth, and budget optimization...'
  },
  {
    id: '5',
    title: 'Employee Training Records - Scanned',
    type: 'Scan' as const,
    source: 'HR Department',
    uploader: 'Rohan Sharma',
    timestamp: '2 days ago',
    priority: 'Low' as const,
    summary: 'Scanned training records for staff certifications including safety training and operational competencies...'
  },
  {
    id: '6',
    title: 'Regulatory Compliance Checklist',
    type: 'CSV' as const,
    source: 'Legal & Compliance',
    uploader: 'Neha Gupta',
    timestamp: '3 days ago',
    priority: 'Critical' as const,
    summary: 'Complete regulatory compliance checklist for metro operations including safety, environmental, and labor laws...'
  },
]

const summaryHighlights = [
  {
    id: '2',
    title: 'Safety Alerts',
    category: 'Safety' as const,
    summary: 'Platform safety concerns flagged during audit. Immediate action required on emergency exits.',
    count: 3,
  },
  {
    id: '1',
    title: 'Engineering Critical Notes',
    category: 'Engineering' as const,
    summary: 'Train C-2 requires immediate maintenance. Rolling stock health report indicates potential brake system issues.',
    count: 2,
  },
  {
    id: '4',
    title: 'HR Updates',
    category: 'HR' as const,
    summary: 'Staff training certifications due for renewal. Compliance training mandatory by month-end.',
    count: 12,
  },
  {
    id: '3',
    title: 'Regulatory Updates',
    category: 'Regulatory' as const,
    summary: 'New environmental compliance requirements effective next quarter. Documentation review in progress.',
    count: 5,
  },
]

const statsCards = [
  { label: 'Documents Processed', value: '1,247', icon: '📄' },
  { label: 'Action Items', value: '23', icon: '⚠️' },
  { label: 'This Month', value: '156', icon: '📈' },
  { label: 'Team Members', value: '89', icon: '👥' },
]

export default function DashboardPage() {
  const [filters, setFilters] = useState<string[]>([])

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="px-6 pt-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to KMRL Document Intelligence System</p>
      </div>

      {/* Stats */}
      <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Highlights */}
      <div className="px-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Summary Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {summaryHighlights.map((highlight) => (
            <SummaryHighlight
              key={highlight.id}
              id={highlight.id}
              title={highlight.title}
              category={highlight.category}
              summary={highlight.summary}
              count={highlight.count}
            />
          ))}
        </div>
      </div>

      {/* Recent Documents */}
      <div className="px-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Documents</h2>
        <FilterBar onFilterChange={setFilters} />
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dummyDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              id={doc.id}
              title={doc.title}
              type={doc.type}
              source={doc.source}
              uploader={doc.uploader}
              timestamp={doc.timestamp}
              priority={doc.priority}
              summary={doc.summary}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
