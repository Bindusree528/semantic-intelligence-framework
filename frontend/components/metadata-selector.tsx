'use client'

import { useState } from 'react'

interface MetadataSelectorProps {
  onMetadataChange?: (metadata: any) => void
}

const departments = ['Engineering', 'Rolling Stock', 'Procurement', 'Finance', 'HR', 'Safety', 'Legal']
const documentTypes = ['Maintenance Report', 'Safety Audit', 'Project Plan', 'Financial Review', 'Training Material', 'Regulatory Compliance', 'Other']
const languages = ['English', 'Malayalam', 'Auto-detect']

export default function MetadataSelector({ onMetadataChange }: MetadataSelectorProps) {
  const [metadata, setMetadata] = useState({
    department: '',
    documentType: '',
    language: 'Auto-detect',
    tags: [] as string[],
  })

  const handleChange = (field: string, value: string | string[]) => {
    const updated = { ...metadata, [field]: value }
    setMetadata(updated)
    onMetadataChange?.(updated)
  }

  const addTag = (tag: string) => {
    if (tag && !metadata.tags.includes(tag)) {
      const updated = { ...metadata, tags: [...metadata.tags, tag] }
      setMetadata(updated)
      onMetadataChange?.(updated)
    }
  }

  const removeTag = (tag: string) => {
    const updated = { ...metadata, tags: metadata.tags.filter(t => t !== tag) }
    setMetadata(updated)
    onMetadataChange?.(updated)
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <h3 className="font-semibold text-card-foreground">Document Metadata</h3>

      {/* Department */}
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-2">
          Department (Required)
        </label>
        <select
          value={metadata.department}
          onChange={(e) => handleChange('department', e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select a department...</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Document Type */}
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-2">
          Document Type (Required)
        </label>
        <select
          value={metadata.documentType}
          onChange={(e) => handleChange('documentType', e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select a type...</option>
          {documentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Language */}
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-2">
          Language
        </label>
        <div className="grid grid-cols-3 gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleChange('language', lang)}
              className={`px-4 py-2 rounded-lg border transition-colors text-sm font-medium ${
                metadata.language === lang
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background border-border text-foreground hover:border-primary'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-2">
          Tags (Optional)
        </label>
        <div className="flex gap-2 mb-3">
          {metadata.tags.map((tag) => (
            <div
              key={tag}
              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
            >
              {tag}
              <button onClick={() => removeTag(tag)} className="hover:text-primary/70">
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type and press Enter to add a tag..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addTag((e.target as HTMLInputElement).value)
              ;(e.target as HTMLInputElement).value = ''
            }
          }}
          className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
      </div>
    </div>
  )
}
