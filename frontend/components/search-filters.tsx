'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface SearchFiltersProps {
  onFiltersChange?: (filters: any) => void
}

export default function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState({
    department: [] as string[],
    documentType: [] as string[],
    dateRange: 'all',
    keyword: '',
    source: [] as string[],
  })

  const [expandedSections, setExpandedSections] = useState({
    department: true,
    documentType: true,
    dateRange: true,
    source: true,
  })

  const departments = ['Engineering', 'Rolling Stock', 'Procurement', 'Finance', 'HR', 'Safety', 'Legal']
  const documentTypes = ['PDF', 'DOCX', 'Scan', 'Email', 'CSV']
  const sources = ['Email', 'WhatsApp', 'Scan', 'Maximo', 'SharePoint', 'Upload']
  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
  ]

  const toggleFilter = (type: string, value: string) => {
    const currentValues = filters[type as keyof typeof filters] as string[]
    const updated = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    const newFilters = { ...filters, [type]: updated }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const FilterSection = ({ title, section, items, type }: any) => (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between py-4 text-foreground hover:text-primary transition-colors font-medium text-sm"
      >
        {title}
        <ChevronDown
          size={18}
          className={`transition-transform ${expandedSections[section as keyof typeof expandedSections] ? 'rotate-180' : ''}`}
        />
      </button>

      {expandedSections[section as keyof typeof expandedSections] && (
        <div className="pb-4 space-y-2">
          {items.map((item: any) => (
            <label key={item.value || item} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters[type as keyof typeof filters] as string[]).includes(item.value || item)}
                onChange={() => toggleFilter(type, item.value || item)}
                className="rounded border-border"
              />
              <span className="text-sm text-muted-foreground">{item.label || item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-2">
      <h3 className="font-semibold text-card-foreground mb-4">Filters</h3>

      {/* Keyword */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search keyword..."
          value={filters.keyword}
          onChange={(e) => {
            const newFilters = { ...filters, keyword: e.target.value }
            setFilters(newFilters)
            onFiltersChange?.(newFilters)
          }}
          className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
      </div>

      {/* Department */}
      <FilterSection
        title="Department"
        section="department"
        items={departments}
        type="department"
      />

      {/* Document Type */}
      <FilterSection
        title="Document Type"
        section="documentType"
        items={documentTypes}
        type="documentType"
      />

      {/* Date Range */}
      <div className="border-b border-border">
        <button
          onClick={() => toggleSection('dateRange')}
          className="w-full flex items-center justify-between py-4 text-foreground hover:text-primary transition-colors font-medium text-sm"
        >
          Date Range
          <ChevronDown
            size={18}
            className={`transition-transform ${expandedSections.dateRange ? 'rotate-180' : ''}`}
          />
        </button>

        {expandedSections.dateRange && (
          <div className="pb-4 space-y-2">
            {dateRanges.map((range) => (
              <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="dateRange"
                  value={range.value}
                  checked={filters.dateRange === range.value}
                  onChange={() => {
                    const newFilters = { ...filters, dateRange: range.value }
                    setFilters(newFilters)
                    onFiltersChange?.(newFilters)
                  }}
                  className="rounded-full border-border"
                />
                <span className="text-sm text-muted-foreground">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Source */}
      <FilterSection
        title="Source"
        section="source"
        items={sources}
        type="source"
      />

      {/* Clear Filters */}
      {(filters.department.length > 0 || filters.documentType.length > 0 || filters.source.length > 0 || filters.keyword) && (
        <button
          onClick={() => {
            const cleared = {
              department: [],
              documentType: [],
              dateRange: 'all',
              keyword: '',
              source: [],
            }
            setFilters(cleared)
            onFiltersChange?.(cleared)
          }}
          className="w-full text-sm text-primary hover:text-primary/80 font-medium py-2 mt-4"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}
