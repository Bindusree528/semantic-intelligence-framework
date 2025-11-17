'use client'

import { Download, FileText, Calendar, User, Folder, Tag } from 'lucide-react'

interface DocumentSidebarProps {
  title: string
  fileType: string
  department: string
  uploader: string
  uploadDate: string
  fileSize: string
  documentType: string
}

export default function DocumentSidebar({
  title,
  fileType,
  department,
  uploader,
  uploadDate,
  fileSize,
  documentType,
}: DocumentSidebarProps) {
  return (
    <div className="space-y-4">
      {/* Download Button */}
      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition">
        <Download size={18} />
        Download Original
      </button>

      {/* Metadata */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-5">
        <h3 className="font-semibold text-card-foreground">Metadata</h3>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">File Type</p>
            <p className="text-card-foreground font-medium mt-1">{fileType}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Document Type</p>
            <p className="text-card-foreground font-medium mt-1">{documentType}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Department</p>
            <p className="text-card-foreground font-medium mt-1">{department}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Uploader</p>
            <p className="text-card-foreground font-medium mt-1">{uploader}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Upload Date</p>
            <p className="text-card-foreground font-medium mt-1">{uploadDate}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">File Size</p>
            <p className="text-card-foreground font-medium mt-1">{fileSize}</p>
          </div>
        </div>
      </div>

      {/* File Preview Area */}
      <div className="bg-muted border border-border rounded-lg p-6 text-center">
        <FileText size={48} className="text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">
          Document preview would appear here
        </p>
      </div>
    </div>
  )
}
