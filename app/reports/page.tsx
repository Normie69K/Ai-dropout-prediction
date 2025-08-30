"use client"

// import { useSession } from 'next-auth/react'
// import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Navigation } from '@/components/layout/navigations'
import { FileText, Download, Calendar, BarChart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const reportsData = [
  {
    id: 1,
    title: "Monthly Risk Assessment Report",
    description: "Comprehensive analysis of student risk factors and intervention effectiveness",
    type: "PDF",
    date: "June 2024",
    size: "2.4 MB"
  },
  {
    id: 2,
    title: "Attendance Trends Analysis",
    description: "Detailed breakdown of attendance patterns across all classes",
    type: "Excel",
    date: "June 2024",
    size: "1.8 MB"
  },
  {
    id: 3,
    title: "Intervention Success Metrics",
    description: "Analysis of intervention strategies and their success rates",
    type: "PDF",
    date: "May 2024",
    size: "3.1 MB"
  },
]

export default function ReportsPage() {
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate and download comprehensive reports</p>
          </div>
          <Button>
            <BarChart className="h-4 w-4 mr-2" />
            Generate New Report
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-sm">
                <FileText className="h-4 w-4" />
                <span>Weekly Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Monthly Report</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-sm">
                <BarChart className="h-4 w-4" />
                <span>Custom Report</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Generate
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Available Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportsData.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-muted-foreground">{report.date}</span>
                        <span className="text-xs text-muted-foreground">{report.size}</span>
                        <Badge variant="outline" className="text-xs">{report.type}</Badge>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
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

