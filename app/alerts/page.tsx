"use client"

import { useState } from 'react'
// import { useSession } from 'next-auth/react'
// import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { Bell, Clock, CheckCircle, AlertTriangle, Settings } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Navigation } from '@/components/layout/navigations'
import { Footer } from '@/components/layout/footer'

const alertsData = [
  {
    id: 1,
    student: "John Doe",
    class: "10A",
    type: "Attendance",
    severity: "High",
    message: "Attendance dropped below 60% threshold",
    time: "2 hours ago",
    status: "New",
    action: "Contact parent scheduled"
  },
  {
    id: 2,
    student: "Jane Smith",
    class: "12B",
    type: "Academic",
    severity: "Medium",
    message: "Consistent decline in test scores over 3 months",
    time: "4 hours ago",
    status: "In Progress",
    action: "Counselor meeting arranged"
  },
  {
    id: 3,
    student: "Mike Johnson",
    class: "11C",
    type: "Financial",
    severity: "High",
    message: "Fee payment overdue by 30+ days",
    time: "6 hours ago",
    status: "Resolved",
    action: "Payment plan created"
  },
]

export default function AlertsPage() {
//   const { data: session, status } = useSession()
  const [filter, setFilter] = useState('All')

//   if (status === 'loading') {
//     return <div>Loading...</div>
//   }

//   if (!session) {
//     redirect('/auth/signin')
//   }

  const filteredAlerts = alertsData.filter(alert => 
    filter === 'All' || alert.status === filter
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'destructive'
      case 'In Progress': return 'default'
      case 'Resolved': return 'secondary'
      default: return 'default'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'destructive'
      case 'Medium': return 'default'
      case 'Low': return 'secondary'
      default: return 'default'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Alert Management</h1>
            <p className="text-muted-foreground">Monitor and manage student intervention alerts</p>
          </div>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Alert Settings
          </Button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          {['All', 'New', 'In Progress', 'Resolved'].map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status}
            </Button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <Card key={alert.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      {alert.type === 'Attendance' && <Clock className="h-4 w-4 text-primary" />}
                      {alert.type === 'Academic' && <AlertTriangle className="h-4 w-4 text-primary" />}
                      {alert.type === 'Financial' && <Bell className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{alert.student}</h3>
                        <Badge variant="outline">{alert.class}</Badge>
                        <Badge variant={getSeverityColor(alert.severity) as any}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">Action: {alert.action}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge variant={getStatusColor(alert.status) as any}>
                      {alert.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                    {alert.status !== 'Resolved' && (
                      <Button size="sm" variant="outline">
                        Take Action
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />

      
    </div>
  )
}

