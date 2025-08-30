"use client"

import { useState, useEffect } from "react"
// import { useSession } from 'next-auth/react'
// import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  AlertTriangle,
  Shield,
  TrendingUp,
  TrendingDown,
  Bell,
  BarChart3,
  PieChart,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Cell } from "recharts"
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Navigation } from '@/components/layout/navigations'

// Mock data for the dashboard
const mockData = {
  totalStudents: 2847,
  atRiskStudents: 142,
  safeStudents: 2705,
  attendanceData: [
    { month: "Jan", attendance: 85, scores: 78 },
    { month: "Feb", attendance: 82, scores: 76 },
    { month: "Mar", attendance: 79, scores: 74 },
    { month: "Apr", attendance: 77, scores: 72 },
    { month: "May", attendance: 75, scores: 70 },
    { month: "Jun", attendance: 73, scores: 68 },
  ],
  riskDistribution: [
    { name: "Safe", value: 2705, color: "#22c55e" },
    { name: "Low Risk", value: 89, color: "#eab308" },
    { name: "Medium Risk", value: 38, color: "#f97316" },
    { name: "High Risk", value: 15, color: "#ef4444" },
  ],
  recentAlerts: [
    { id: 1, student: "John Doe", risk: "High", reason: "Attendance below 60%", time: "2 hours ago" },
    { id: 2, student: "Jane Smith", risk: "Medium", reason: "Declining scores", time: "4 hours ago" },
    { id: 3, student: "Mike Johnson", risk: "High", reason: "Fee payment overdue", time: "6 hours ago" },
  ],
}

export default function Dashboard() {
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
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Banner */}
        <div className="mb-8 animate-fade-in-up">
          <div className="rounded-lg bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-2">Early Intervention for Student Success</h2>
            <p className="text-muted-foreground text-lg">
              AI-powered insights to identify at-risk students and enable timely interventions
            </p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockData.totalStudents.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +2.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up border-destructive/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive animate-pulse-glow" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{mockData.atRiskStudents}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingDown className="inline h-3 w-3 mr-1" />
                -1.2% from last month
              </p>
              <Progress value={(mockData.atRiskStudents / mockData.totalStudents) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up border-secondary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Safe Students</CardTitle>
              <Shield className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{mockData.safeStudents.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +0.8% from last month
              </p>
              <Progress value={(mockData.safeStudents / mockData.totalStudents) * 100} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Attendance & Scores Trend */}
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Attendance & Score Trends</span>
              </CardTitle>
              <CardDescription>Monthly trends showing declining patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockData.attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="attendance"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={3}
                    name="Attendance %"
                  />
                  <Line
                    type="monotone"
                    dataKey="scores"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={3}
                    name="Average Scores"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Risk Distribution */}
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Risk Distribution</span>
              </CardTitle>
              <CardDescription>Current student risk categorization</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <RechartsPie
                    data={mockData.riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="value"
                    // paddingAngle={5}
                  >
                    {mockData.riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-4">
                {mockData.riskDistribution.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Recent Alerts</span>
            </CardTitle>
            <CardDescription>Latest high-priority student interventions needed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant={alert.risk === "High" ? "destructive" : "secondary"}
                      className="w-16 justify-center"
                    >
                      {alert.risk}
                    </Badge>
                    <div>
                      <p className="font-medium text-foreground">{alert.student}</p>
                      <p className="text-sm text-muted-foreground">{alert.reason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{alert.time}</p>
                    <Button size="sm" variant="outline" className="mt-1">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
        <Footer />
    </div>
  )
}