'use client'

import { Users, Wrench, ShoppingCart, DollarSign, Shield, Scale, Zap } from 'lucide-react'
import Link from 'next/link'

const departments = [
  {
    name: 'Engineering',
    icon: Wrench,
    description: 'Technical operations, maintenance, and infrastructure',
    documentCount: 156,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    name: 'Rolling Stock',
    icon: Zap,
    description: 'Train fleet management and operational status',
    documentCount: 89,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  },
  {
    name: 'Procurement',
    icon: ShoppingCart,
    description: 'Vendor management and purchasing records',
    documentCount: 67,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    name: 'Finance',
    icon: DollarSign,
    description: 'Financial reports and budget allocations',
    documentCount: 123,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20'
  },
  {
    name: 'HR',
    icon: Users,
    description: 'Employee records and training documentation',
    documentCount: 94,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    name: 'Safety',
    icon: Shield,
    description: 'Safety audits and compliance records',
    documentCount: 78,
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20'
  },
  {
    name: 'Legal',
    icon: Scale,
    description: 'Regulatory compliance and legal documents',
    documentCount: 45,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
  },
]

export default function DepartmentsPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Departments</h1>
        <p className="text-muted-foreground mt-2">Browse documents by department</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => {
          const Icon = dept.icon
          return (
            <Link key={dept.name} href={`/documents?dept=${dept.name}`}>
              <div className={`${dept.bgColor} border border-border rounded-lg p-6 hover:shadow-md transition-all cursor-pointer group`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-background group-hover:bg-white transition-colors`}>
                    <Icon className={dept.color} size={24} />
                  </div>
                  <span className="text-2xl font-bold text-foreground">{dept.documentCount}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{dept.name}</h3>
                <p className="text-sm text-muted-foreground">{dept.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
