'use client'

import { useState } from 'react'
import { Copy, DownloadCloud } from 'lucide-react'

interface DocumentTabsProps {
  documentId: string
}

const tabContent = {
  summary: {
    title: 'Summary',
    content: 'This document outlines the comprehensive maintenance schedule and rolling stock health assessment for the KMRL metro system. The report covers 47 operational trains with detailed analysis of mechanical, electrical, and safety systems. Key findings indicate that 92% of rolling stock is in excellent operational condition with only routine maintenance required for 3 units.'
  },
  actions: {
    title: 'Key Action Points',
    items: [
      'Schedule preventive maintenance for Train C-2 brake system within 2 weeks',
      'Conduct comprehensive safety audit on Platform 3-4 emergency exits',
      'Complete staff recertification training by month-end (12 employees pending)',
      'Update environmental compliance documentation by next quarter',
      'Review and update procurement procedures per new regulations'
    ]
  },
  risks: {
    title: 'Risks & Compliance Alerts',
    items: [
      { severity: 'Critical', title: 'Brake System Alert', desc: 'Train C-2 shows wear on brake pads - potential safety risk' },
      { severity: 'High', title: 'Platform Safety', desc: 'Emergency exit signage needs replacement on Platform 3' },
      { severity: 'Medium', title: 'Training Compliance', desc: '12 staff members need safety recertification' },
      { severity: 'Medium', title: 'Documentation Gap', desc: 'Environmental compliance reports outdated by 30 days' },
    ]
  },
  insights: {
    title: 'Department-wise Insights',
    departments: [
      { name: 'Engineering', insights: ['All major systems operational', '3 trains require maintenance', 'Energy efficiency: 94%'] },
      { name: 'Rolling Stock', insights: ['Fleet availability: 100%', 'Average age: 4.2 years', 'Utilization: 98.5%'] },
      { name: 'Safety', insights: ['Incident rate: 0.02%', 'Safety drills: Quarterly', 'Compliance: 99.8%'] },
      { name: 'Finance', insights: ['Maintenance cost: $2.3M', 'Budget utilization: 78%', 'ROI on upgrades: 12.4%'] },
    ]
  },
  fullText: {
    title: 'Full Text',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  }
}

export default function DocumentTabs({ documentId }: DocumentTabsProps) {
  const [activeTab, setActiveTab] = useState('summary')

  const tabs = ['summary', 'actions', 'risks', 'insights', 'fullText']

  const handleCopy = () => {
    const content = tabContent[activeTab as keyof typeof tabContent]
    if ('content' in content) {
      navigator.clipboard.writeText(content.content)
    } else if ('items' in content) {
      navigator.clipboard.writeText(content.items.join('\n'))
    }
  }

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'bg-primary text-primary-foreground border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tabContent[tab as keyof typeof tabContent].title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-card border border-border rounded-lg p-8">
        {activeTab === 'summary' && (
          <div>
            <p className="text-foreground leading-relaxed">
              {tabContent.summary.content}
            </p>
          </div>
        )}

        {activeTab === 'actions' && (
          <div className="space-y-4">
            {(tabContent.actions.items).map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="min-w-fit">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {idx + 1}
                  </span>
                </div>
                <p className="text-foreground pt-0.5">{item}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="space-y-4">
            {(tabContent.risks.items).map((item, idx) => {
              const severityColor = {
                Critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                High: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
                Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
              }[item.severity as 'Critical' | 'High' | 'Medium']
              return (
                <div key={idx} className="border border-border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className={`px-3 py-1 rounded text-xs font-bold whitespace-nowrap ${severityColor}`}>
                      {item.severity}
                    </span>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="grid md:grid-cols-2 gap-6">
            {(tabContent.insights.departments).map((dept, idx) => (
              <div key={idx} className="border border-border rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">{dept.name}</h4>
                <ul className="space-y-2">
                  {dept.insights.map((insight, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'fullText' && (
          <div>
            <p className="text-foreground whitespace-pre-wrap leading-relaxed">
              {tabContent.fullText.content}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition"
        >
          <Copy size={18} />
          Copy {tabContent[activeTab as keyof typeof tabContent].title}
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition">
          <DownloadCloud size={18} />
          Generate Slide Deck
        </button>
      </div>
    </div>
  )
}
