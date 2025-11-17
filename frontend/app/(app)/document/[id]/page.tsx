'use client'

import DocumentSidebar from '@/components/document-sidebar'
import DocumentTabs from '@/components/document-tabs'
import { ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function DocumentPage({ params }: { params: { id: string } }) {
  const documentId = params.id

  // Mock document data
  const document = {
    title: 'Rolling Stock Maintenance Report - November 2025',
    fileType: 'PDF',
    documentType: 'Maintenance Report',
    department: 'Engineering',
    uploader: 'Raj Kumar',
    uploadDate: 'Nov 15, 2025',
    fileSize: '2.4 MB',
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>
        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition text-foreground font-medium">
          <Share2 size={18} />
          Share
        </button>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{document.title}</h1>
        <p className="text-muted-foreground mt-2">Uploaded by {document.uploader} on {document.uploadDate}</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          <DocumentSidebar
            title={document.title}
            fileType={document.fileType}
            department={document.department}
            uploader={document.uploader}
            uploadDate={document.uploadDate}
            fileSize={document.fileSize}
            documentType={document.documentType}
          />
        </div>

        {/* Right Content */}
        <div className="lg:col-span-2">
          <DocumentTabs documentId={documentId} />
        </div>
      </div>
    </div>
  )
}
