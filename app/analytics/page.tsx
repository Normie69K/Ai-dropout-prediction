"use client"

// import { useSession } from 'next-auth/react'
// import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { BarChart3, TrendingUp, Users, AlertTriangle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Header } from '@/components/layout/header'
import { Navigation } from '@/components/layout/navigations'
import { Footer } from '@/components/layout/footer'

const analyticsData = {
  monthlyDropouts: [
    { month: "Jan", dropouts: 12, interventions: 45 },
    { month: "Feb", dropouts: 15, interventions: 52 },
    { month: "Mar", dropouts: 8, interventions: 38 },
    { month: "Apr", dropouts: 22, interventions: 67 },
    { month: "May", dropouts: 18, interventions: 58 },
    { month: "Jun", dropouts: 10, interventions: 42 },
  ],
  riskFactors: [
    { factor: "Poor Attendance", count: 89, percentage: 62 },
    { factor: "Declining Grades", count: 45, percentage: 32 },
    { factor: "Fee Issues", count: 28, percentage: 20 },
    { factor: "Family Issues", count: 15, percentage: 11 },
  ]
}

export default function AnalyticsPage() {
//   const { data: session, status } = useSession()

//   if (status === 'loading') {
//     return <div>Loading...</div>
//   }

//   if (!session) {
//     redirect('/auth/signin')
//   }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Deep insights into student performance and risk patterns</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Monthly Dropout Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analyticsData.monthlyDropouts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="dropouts" 
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.3}
                    name="Dropouts"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="interventions" 
                    stroke="#22c55e" 
                    fill="#22c55e" 
                    fillOpacity={0.3}
                    name="Interventions"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Risk Factors Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.riskFactors} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="factor" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      
    </div>
  )
}