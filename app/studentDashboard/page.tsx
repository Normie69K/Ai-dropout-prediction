"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'

import {
  User,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Target,
  Award,
  Clock,
  DollarSign,
  Phone,
  Mail,
  GraduationCap
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts'

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const mockStudentData = {
    profile: {
      student_id: 'SID23001',
      name: 'Rahul Sharma',
      course: 'B.Tech Computer Science',
      semester: 6,
      admission_year: 2021,
      email: 'rahul.sharma@student.college.edu',
      phone: '+91 9876543210'
    },
    currentStatus: {
      riskLevel: 'MEDIUM',
      riskScore: 0.45,
      overallAttendance: 72,
      cgpa: 7.2,
      pendingFees: 15000,
      lastUpdated: '2024-01-15'
    },
    performanceData: [
      { month: 'Aug', attendance: 85, scores: 78, target: 75 },
      { month: 'Sep', attendance: 82, scores: 76, target: 75 },
      { month: 'Oct', attendance: 79, scores: 74, target: 75 },
      { month: 'Nov', attendance: 77, scores: 72, target: 75 },
      { month: 'Dec', attendance: 75, scores: 70, target: 75 },
      { month: 'Jan', attendance: 72, scores: 68, target: 75 }
    ],
    recentAssessments: [
      { name: 'IA1 - Data Structures', score: 35, maxScore: 50, percentage: 70, date: '2024-01-10' },
      { name: 'IA2 - Algorithms', score: 28, maxScore: 50, percentage: 56, date: '2024-01-08' },
      { name: 'Mid Sem - DBMS', score: 32, maxScore: 60, percentage: 53, date: '2024-01-05' },
      { name: 'Assignment - Web Tech', score: 45, maxScore: 50, percentage: 90, date: '2024-01-03' }
    ],
    alerts: [
      { type: 'attendance', message: 'Attendance below 75% threshold', severity: 'high', date: '2024-01-14' },
      { type: 'score', message: 'IA2 score below passing criteria', severity: 'medium', date: '2024-01-08' },
      { type: 'fees', message: 'Semester fees payment pending', severity: 'medium', date: '2024-01-01' }
    ],
    recommendations: [
      'Improve attendance to reach 75% minimum requirement',
      'Schedule study sessions for Data Structures and Algorithms',
      'Complete pending fee payment to avoid academic holds',
      'Join peer study groups for better understanding',
      'Meet with academic counselor this week'
    ],
    subjects: [
      { name: 'Data Structures', attendance: 68, lastScore: 70, status: 'at-risk' },
      { name: 'Algorithms', attendance: 75, lastScore: 56, status: 'at-risk' },
      { name: 'DBMS', attendance: 78, lastScore: 53, status: 'at-risk' },
      { name: 'Web Technology', attendance: 82, lastScore: 90, status: 'good' }
    ]
  }

  const getRiskColor = (level) => {
    switch (level) {
      case 'LOW': return 'text-green-600'
      case 'MEDIUM': return 'text-yellow-600'
      case 'HIGH': return 'text-orange-600'
      case 'CRITICAL': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getRiskBadgeVariant = (level) => {
    switch (level) {
      case 'LOW': return 'default'
      case 'MEDIUM': return 'secondary'
      case 'HIGH': return 'destructive'
      case 'CRITICAL': return 'destructive'
      default: return 'outline'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Student Portal</h1>
                <p className="text-sm text-muted-foreground">
                  {mockStudentData.profile.student_id} • {mockStudentData.profile.course}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={getRiskBadgeVariant(mockStudentData.currentStatus.riskLevel)} className="text-sm">
                Risk: {mockStudentData.currentStatus.riskLevel}
              </Badge>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="recommendations">Action Plan</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Risk Assessment Card */}
            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-6 w-6" />
                  <span>Current Risk Assessment</span>
                </CardTitle>
                <CardDescription>AI-powered analysis of your academic standing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Risk Level:</span>
                      <Badge variant={getRiskBadgeVariant(mockStudentData.currentStatus.riskLevel)} className="text-sm">
                        {mockStudentData.currentStatus.riskLevel}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Risk Score</span>
                        <span className={getRiskColor(mockStudentData.currentStatus.riskLevel)}>
                          {Math.round(mockStudentData.currentStatus.riskScore * 100)}%
                        </span>
                      </div>
                      <Progress value={mockStudentData.currentStatus.riskScore * 100} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <span className="text-sm">Overall Attendance</span>
                      <span className={mockStudentData.currentStatus.overallAttendance < 75 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                        {mockStudentData.currentStatus.overallAttendance}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <span className="text-sm">Current CGPA</span>
                      <span className="font-medium">{mockStudentData.currentStatus.cgpa}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <span className="text-sm">Pending Fees</span>
                      <span className={mockStudentData.currentStatus.pendingFees > 0 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                        ₹{mockStudentData.currentStatus.pendingFees.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Semester</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStudentData.profile.semester}</div>
                  <p className="text-xs text-muted-foreground">Current</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Subjects</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStudentData.subjects.length}</div>
                  <p className="text-xs text-muted-foreground">Enrolled</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{mockStudentData.alerts.length}</div>
                  <p className="text-xs text-muted-foreground">Need attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-bold">Jan 15</div>
                  <p className="text-xs text-muted-foreground">2024</p>
                </CardContent>
              </Card>
            </div>

            {/* Subject Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Current standing in all enrolled subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockStudentData.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{subject.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Attendance: {subject.attendance}% | Last Score: {subject.lastScore}%
                          </p>
                        </div>
                      </div>
                      <Badge variant={subject.status === 'good' ? 'default' : 'destructive'}>
                        {subject.status === 'good' ? 'On Track' : 'At Risk'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            {/* Performance Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Your attendance and score trends over the past months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={mockStudentData.performanceData}>
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
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Target"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Assessments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Assessments</CardTitle>
                <CardDescription>Your latest exam and assignment scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockStudentData.recentAssessments.map((assessment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex-1">
                        <p className="font-medium">{assessment.name}</p>
                        <p className="text-sm text-muted-foreground">{assessment.date}</p>
                      </div>
                      <div className="text-center px-4">
                        <p className="font-medium">{assessment.score}/{assessment.maxScore}</p>
                      </div>
                      <div className="text-center px-4">
                        <span className={assessment.percentage < 40 ? 'text-red-600 font-bold' : assessment.percentage < 60 ? 'text-yellow-600 font-medium' : 'text-green-600 font-medium'}>
                          {assessment.percentage}%
                        </span>
                      </div>
                      <Badge variant={assessment.percentage < 40 ? 'destructive' : assessment.percentage < 60 ? 'secondary' : 'default'}>
                        {assessment.percentage < 40 ? 'Below Average' : assessment.percentage < 60 ? 'Average' : 'Good'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Attendance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Overview</CardTitle>
                  <CardDescription>Your overall attendance status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2 text-yellow-600">
                      {mockStudentData.currentStatus.overallAttendance}%
                    </div>
                    <p className="text-muted-foreground">Overall Attendance</p>
                    <Progress value={mockStudentData.currentStatus.overallAttendance} className="mt-4" />
                  </div>
                  
                  <Alert className="border-yellow-200 bg-yellow-50">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      You need {75 - mockStudentData.currentStatus.overallAttendance}% more attendance to meet the minimum requirement.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Subject-wise Attendance */}
              <Card>
                <CardHeader>
                  <CardTitle>Subject-wise Attendance</CardTitle>
                  <CardDescription>Breakdown by individual subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockStudentData.subjects.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium text-sm">{subject.name}</p>
                          <p className="text-xs text-muted-foreground">Last updated: Jan 15</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${subject.attendance < 75 ? 'text-red-600' : 'text-green-600'}`}>
                            {subject.attendance}%
                          </div>
                          <Progress value={subject.attendance} className="w-20 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                  <span>Active Alerts</span>
                </CardTitle>
                <CardDescription>Important notifications requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStudentData.alerts.map((alert, index) => (
                    <Alert key={index} className={`${alert.severity === 'high' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className={`h-5 w-5 mt-0.5 ${alert.severity === 'high' ? 'text-red-600' : 'text-yellow-600'}`} />
                          <div>
                            <AlertDescription className={`${alert.severity === 'high' ? 'text-red-800' : 'text-yellow-800'} font-medium`}>
                              {alert.message}
                            </AlertDescription>
                            <p className="text-xs text-muted-foreground mt-1">{alert.date}</p>
                          </div>
                        </div>
                        <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>Contact your academic support team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="flex items-center space-x-2 h-auto p-4">
                    <Mail className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Email Counselor</p>
                      <p className="text-xs text-muted-foreground">counselor@college.edu</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2 h-auto p-4">
                    <Phone className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Call Support</p>
                      <p className="text-xs text-muted-foreground">+91 XXXXXXXXXX</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-6 w-6 text-primary" />
                  <span>Personalized Action Plan</span>
                </CardTitle>
                <CardDescription>AI-generated recommendations to improve your academic standing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStudentData.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium mt-0.5">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{recommendation}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Mark Done
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Next Steps:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Schedule a meeting with your academic advisor</li>
                    <li>• Complete pending assignments to improve scores</li>
                    <li>• Attend all classes for the next two weeks</li>
                    <li>• Join study groups for difficult subjects</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>Track your improvement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">This Week</p>
                    <p className="text-xs text-muted-foreground">2 recommendations completed</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Goal</p>
                    <p className="text-xs text-muted-foreground">Reach 75% attendance</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Achievement</p>
                    <p className="text-xs text-muted-foreground">Improved 5% this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}