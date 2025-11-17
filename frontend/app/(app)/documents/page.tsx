'use client'

import { useState, useMemo } from 'react'
import SearchFilters from '@/components/search-filters'
import SearchResults from '@/components/search-results'

const dummyResults = [
  {
    id: '1',
    title: 'Rolling Stock Maintenance Report - November 2025',
    snippet: 'Comprehensive maintenance report covering fleet health, pending repairs, and safety compliance. All major systems operational with 3 trains requiring routine maintenance.',
    priority: 'High' as const,
    type: 'PDF',
    source: 'Engineering',
    uploadDate: '2 hours ago',
  },
  {
    id: '2',
    title: 'Monthly Safety Audit Summary',
    snippet: 'Critical safety findings from October audit including platform safety checks, emergency procedures, and incident prevention measures.',
    priority: 'Critical' as const,
    type: 'DOCX',
    source: 'Safety',
    uploadDate: '4 hours ago',
  },
  {
    id: '3',
    title: 'Station Renovation Project - Phase 1',
    snippet: 'Project documentation for station renovation including budget allocation, timeline, vendor details, and regulatory compliance.',
    priority: 'High' as const,
    type: 'PDF',
    source: 'Procurement',
    uploadDate: '6 hours ago',
  },
  {
    id: '4',
    title: 'Q4 Financial Review Email',
    snippet: 'Quarterly financial review highlighting expenditure patterns, revenue growth, budget optimization, and cost reduction strategies.',
    priority: 'Medium' as const,
    type: 'Email',
    source: 'Finance',
    uploadDate: '1 day ago',
  },
  {
    id: '5',
    title: 'Employee Training Records - Scanned',
    snippet: 'Scanned training records for staff certifications including safety training, operational competencies, and compliance certifications.',
    priority: 'Low' as const,
    type: 'Scan',
    source: 'HR',
    uploadDate: '2 days ago',
  },
  {
    id: '6',
    title: 'Regulatory Compliance Checklist',
    snippet: 'Complete regulatory compliance checklist for metro operations including safety, environmental, and labor laws requirements.',
    priority: 'Critical' as const,
    type: 'CSV',
    source: 'Legal',
    uploadDate: '3 days ago',
  },
]

export default function DocumentsPage() {
  const [filters, setFilters] = useState({
    department: [] as string[],
    documentType: [] as string[],
    dateRange: 'all',
    keyword: '',
    source: [] as string[],
  })
  const [isLoading, setIsLoading] = useState(false)

  const filteredResults = useMemo(() => {
    // Simulate filtering
    let results = dummyResults

    if (filters.keyword) {
      results = results.filter(
        (r) =>
          r.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
          r.snippet.toLowerCase().includes(filters.keyword.toLowerCase())
      )
    }

    if (filters.department.length > 0) {
      results = results.filter((r) =>
        filters.department.some((d) => r.source.includes(d))
      )
    }

    if (filters.documentType.length > 0) {
      results = results.filter((r) => filters.documentType.includes(r.type))
    }

    if (filters.source.length > 0) {
      results = results.filter((r) => filters.source.includes(r.source))
    }

    return results
  }, [filters])

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">All Documents</h1>
        <p className="text-muted-foreground mt-2">Search and filter documents across all departments</p>
      </div>

      {/* Search and Results Grid */}
      <div className="grid md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <SearchFilters onFiltersChange={setFilters} />
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-3">
          <SearchResults
            results={filteredResults}
            totalCount={filteredResults.length}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
