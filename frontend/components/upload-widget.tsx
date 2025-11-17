'use client'

import { useState, useRef } from 'react'

interface UploadedFile {
  name: string
  size: number
  type: string
  progress: number
}

export default function UploadWidget() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFiles = (fileList: File[]) => {
    const newFiles = fileList.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((file, idx) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
        }
        setFiles((prev) => {
          const updated = [...prev]
          updated[prev.length - newFiles.length + idx].progress = progress
          return updated
        })
      }, 200)
    })
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄'
    if (type.includes('word') || type.includes('document')) return '📝'
    if (type.includes('image')) return '🖼️'
    if (type.includes('sheet')) return '📊'
    return '📎'
  }

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50 bg-muted/30'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.jpg,.png,.jpeg,.csv,.eml,.zip"
          onChange={(e) => handleFiles(Array.from(e.target.files || []))}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          <div className="text-4xl">📤</div>
          <div>
            <p className="text-lg font-semibold text-foreground">
              Drag and drop your documents here
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or{' '}
              <button
                onClick={() => inputRef.current?.click()}
                className="text-primary hover:underline font-medium"
              >
                browse
              </button>{' '}
              from your computer
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Supported: PDF, DOCX, Images, CSV, Email (.eml), ZIP
          </p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">{files.length} file(s) selected</p>
          {files.map((file, idx) => (
            <div key={idx} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getFileIcon(file.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-card-foreground truncate text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  
                  {/* Progress Bar */}
                  {file.progress < 100 && (
                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}

                  {file.progress === 100 && (
                    <p className="text-xs text-green-600 mt-2">
                      ✓ Upload complete
                    </p>
                  )}
                </div>
                {file.progress === 100 && (
                  <button
                    onClick={() => removeFile(idx)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
