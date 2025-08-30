"use client"

import { useState } from 'react'
// import { useSession } from 'next-auth/react'
// import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Download, Eye } from 'lucide-react'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Navigation } from '@/components/layout/navigations'



const mockStudents = [
  { id: 1, name: "John Doe", class: "10A", attendance: 55, avgScore: 45, risk: "High", lastLogin: "3 days ago" },
  { id: 2, name: "Jane Smith", class: "12B", attendance: 72, avgScore: 65, risk: "Medium", lastLogin: "1 day ago" },
  { id: 3, name: "Mike Johnson", class: "11C", attendance: 89, avgScore: 82, risk: "Safe", lastLogin: "Today" },
  { id: 4, name: "Sarah Wilson", class: "9A", attendance: 45, avgScore: 38, risk: "High", lastLogin: "5 days ago" },
  { id: 5, name: "David Brown", class: "10B", attendance: 78, avgScore: 71, risk: "Low", lastLogin: "2 days ago" },
]

export default function StudentsPage() {
//   const { data: session, status } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRisk, setFilterRisk] = useState('All')

//   if (status === 'loading') {
//     return <div>Loading...</div>
//   }

//   if (!session) {
//     redirect('/auth/signin')
//   }

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.class.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterRisk === 'All' || student.risk === filterRisk
    return matchesSearch && matchesFilter
  })

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'destructive'
      case 'Medium': return 'default'
      case 'Low': return 'secondary'
      case 'Safe': return 'outline'
      default: return 'default'
    }
  }

  return (
    <div className="min-h-screen bg-background">
        <Header />
        <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Management</h1>
          <p className="text-muted-foreground">Monitor and manage student risk profiles</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search & Filter Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or class..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {['All', 'High', 'Medium', 'Low', 'Safe'].map((risk) => (
                  <Button
                    key={risk}
                    variant={filterRisk === risk ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterRisk(risk)}
                  >
                    {risk}
                  </Button>
                ))}
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Students Overview ({filteredStudents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-primary">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">Class {student.class}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm font-medium">{student.attendance}%</p>
                      <p className="text-xs text-muted-foreground">Attendance</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{student.avgScore}%</p>
                      <p className="text-xs text-muted-foreground">Avg Score</p>
                    </div>
                    <Badge variant={getRiskColor(student.risk) as any}>
                      {student.risk}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View
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
