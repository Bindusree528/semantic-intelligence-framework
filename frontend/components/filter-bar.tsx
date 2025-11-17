'use client'

import { useState } from 'react'

interface FilterBarProps {
  onFilterChange?: (filters: any) => void
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const departments = ['Engineering', 'Rolling Stock', 'Finance', 'HR', 'Safety', 'Legal']
  const documentTypes = ['PDF', 'DOCX', 'Scan', 'Email', 'CSV']
  const priorities = ['Low', 'Medium', 'High', 'Critical']

  const toggleFilter = (filter: string) => {
    const updated = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter]
    setActiveFilters(updated)
    onFilterChange?.(updated)
  }

  return (
    <div className="bg-card border-b border-border">
      <div className="px-6 py-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
        >
          🔍 Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
        </button>

        {showFilters && (
          <div className="mt-6 space-y-6 pt-6 border-t border-border">
            {/* Department */}
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-3">Department</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {departments.map((dept) => (
                  <label key={dept} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeFilters.includes(dept)}
                      onChange={() => toggleFilter(dept)}
                      className="rounded border-border"
                    />
                    <span className="text-sm text-muted-foreground">{dept}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Document Type */}
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-3">Document Type</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {documentTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeFilters.includes(type)}
                      onChange={() => toggleFilter(type)}
                      className="rounded border-border"
                    />
                    <span className="text-sm text-muted-foreground">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Priority */}
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-3">Priority</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {priorities.map((priority) => (
                  <label key={priority} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeFilters.includes(priority)}
                      onChange={() => toggleFilter(priority)}
                      className="rounded border-border"
                    />
                    <span className="text-sm text-muted-foreground">{priority}</span>
                  </label>
                ))}
              </div>
            </div>

            {activeFilters.length > 0 && (
              <button
                onClick={() => setActiveFilters([])}
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
