"use client"

// import { useSession } from 'next-auth/react'
// import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Navigation } from '@/components/layout/navigations'

import { Brain, Target, Zap, Calendar } from 'lucide-react'

const predictionData = [
  { 
    id: 1, 
    name: "Alex Johnson", 
    class: "11A", 
    dropoutRisk: 85, 
    factors: ["Poor Attendance", "Declining Grades"], 
    prediction: "High risk of dropout in next 30 days",
    confidence: 92
  },
  { 
    id: 2, 
    name: "Maria Garcia", 
    class: "10B", 
    dropoutRisk: 67, 
    factors: ["Family Issues", "Fee Problems"], 
    prediction: "Medium risk - intervention recommended",
    confidence: 78
  },
  { 
    id: 3, 
    name: "Robert Kim", 
    class: "12C", 
    dropoutRisk: 23, 
    factors: ["Minor attendance issues"], 
    prediction: "Low risk - monitor progress",
    confidence: 85
  },
]

export default function PredictionsPage() {
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
          <h1 className="text-3xl font-bold mb-2">AI Predictions</h1>
          <p className="text-muted-foreground">Machine learning insights for proactive intervention</p>
        </div>

        {/* Model Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">94.2%</div>
              <Progress value={94.2} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Predictions Made</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">All students analyzed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Interventions Triggered</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">156</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Predictions List */}
        <Card>
          <CardHeader>
            <CardTitle>Student Risk Predictions</CardTitle>
            <CardDescription>AI-generated insights for early intervention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {predictionData.map((student) => (
                <div key={student.id} className="border rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">Class {student.class}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={student.dropoutRisk > 70 ? 'destructive' : student.dropoutRisk > 40 ? 'default' : 'secondary'}>
                        {student.dropoutRisk}% Risk
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {student.confidence}% confidence
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Risk Factors:</p>
                    <div className="flex flex-wrap gap-2">
                      {student.factors.map((factor, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-md">
                    <p className="text-sm">{student.prediction}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <Progress value={student.dropoutRisk} className="flex-1 mr-4" />
                    <Button size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Intervention
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

