'use client'

import { useState } from 'react'
import UploadWidget from '@/components/upload-widget'
import MetadataSelector from '@/components/metadata-selector'
import { ArrowRight } from 'lucide-react'

export default function UploadPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [metadata, setMetadata] = useState(null)

  const handleProcessDocument = () => {
    setIsProcessing(true)
    // TODO: Connect to backend API for document processing
    setTimeout(() => {
      setIsProcessing(false)
      // Redirect to results page
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Upload Document</h1>
        <p className="text-muted-foreground mt-2">Upload or ingest documents for processing</p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Select Files</h2>
            <UploadWidget />
          </div>

          {/* Processing Info */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <h4 className="font-medium text-foreground text-sm mb-2">Processing Steps</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary" />
                File extraction & OCR processing
              </li>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary" />
                Content analysis & summarization
              </li>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary" />
                Key insights extraction
              </li>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary" />
                Risk & compliance scoring
              </li>
            </ul>
          </div>
        </div>

        {/* Metadata Section */}
        <div className="md:col-span-1">
          <MetadataSelector onMetadataChange={setMetadata} />

          {/* Process Button */}
          <button
            onClick={handleProcessDocument}
            disabled={isProcessing}
            className="w-full mt-6 py-3 px-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Process Document
                <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* Info Box */}
          <div className="mt-6 bg-muted/50 border border-border rounded-lg p-4 text-xs text-muted-foreground space-y-2">
            <p>
              <strong>Tip:</strong> Adding metadata helps with better search and categorization.
            </p>
            <p>
              Supported formats: PDF, DOCX, PNG, JPG, CSV, EML, ZIP
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
