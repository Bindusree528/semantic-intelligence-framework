'use client'

import { AlertTriangle, CheckCircle, Clock, AlertCircle } from 'lucide-react'

const complianceItems = [
  {
    category: 'Safety',
    status: 'Compliant',
    lastAudit: 'Nov 10, 2025',
    nextDue: 'Dec 10, 2025',
    items: 5,
    statusIcon: CheckCircle,
    statusColor: 'text-green-600',
  },
  {
    category: 'Environmental',
    status: 'At Risk',
    lastAudit: 'Sep 15, 2025',
    nextDue: 'Nov 15, 2025',
    items: 3,
    statusIcon: AlertTriangle,
    statusColor: 'text-orange-600',
  },
  {
    category: 'Labor Laws',
    status: 'Compliant',
    lastAudit: 'Oct 20, 2025',
    nextDue: 'Jan 20, 2026',
    items: 7,
    statusIcon: CheckCircle,
    statusColor: 'text-green-600',
  },
  {
    category: 'Data Protection',
    status: 'Needs Review',
    lastAudit: 'Aug 01, 2025',
    nextDue: 'Nov 01, 2025',
    items: 4,
    statusIcon: AlertCircle,
    statusColor: 'text-yellow-600',
  },
]

export default function CompliancePage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Compliance Center</h1>
        <p className="text-muted-foreground mt-2">Track regulatory compliance and audit status</p>
      </div>

      <div className="space-y-4">
        {complianceItems.map((item) => {
          const Icon = item.statusIcon
          return (
            <div key={item.category} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-foreground">{item.category}</h3>
                    <Icon className={item.statusColor} size={20} />
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">
                      {item.status}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Last Audit</p>
                      <p className="font-medium text-foreground">{item.lastAudit}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Next Due</p>
                      <p className="font-medium text-foreground">{item.nextDue}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Items</p>
                      <p className="font-medium text-foreground">{item.items} checklist items</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
