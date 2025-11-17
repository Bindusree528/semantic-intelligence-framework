'use client'

export default function TopSearchBar() {
  return (
    <div className="sticky top-0 z-20 bg-background border-b border-border">
      <div className="flex items-center gap-4 px-6 py-4">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">🔍</span>
          <input
            type="text"
            placeholder="Global semantic search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  )
}
