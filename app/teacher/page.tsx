"use client"

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Users,
  Upload,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle,
  GraduationCap,
  BarChart3,
  TrendingDown,
  Search,
  Filter,
  Mail,
  Phone,
  BookOpen,
  Calendar
} from 'lucide-react'

export default function TeacherDashboard() {
  const [uploading, setUploading] = useState({
    attendance: false,
    assessments: false,
    activities: false
  })
  
  const [uploadStatus, setUploadStatus] = useState({
    attendance: null,
    assessments: null,
    activities: null
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  const fileRefs = {
    attendance: useRef(null),
    assessments: useRef(null),
    activities: useRef(null)
  }

  const mockTeacherStats = {
    totalStudents: 156,
    mySubjects: 3,
    atRiskStudents: 12,
    recentAssessments: 45,
    facultyId: 'FAC001',
    department: 'Computer Science',
    subjects: ['Data Structures', 'Algorithms', 'Database Management']
  }

  const mockAtRiskStudents = [
    {
      id: 1,
      student_id: 'SID23001',
      name: 'Rahul Sharma',
      course: 'B.Tech CSE',
      attendance: 68,
      lastAssessment: 35,
      riskLevel: 'HIGH',
      phone: '+91 9876543210',
      email: 'rahul@example.com'
    },
    {
      id: 2,
      student_id: 'SID23045',
      name: 'Priya Patel',
      course: 'B.Tech IT',
      attendance: 72,
      lastAssessment: 38,
      riskLevel: 'MEDIUM',
      phone: '+91 9876543211',
      email: 'priya@example.com'
    },
    {
      id: 3,
      student_id: 'SID23089',
      name: 'Amit Kumar',
      course: 'B.Tech ECE',
      attendance: 65,
      lastAssessment: 32,
      riskLevel: 'HIGH',
      phone: '+91 9876543212',
      email: 'amit@example.com'
    }
  ]

  const handleFileUpload = async (type, file) => {
    if (!file) return

    setUploading(prev => ({ ...prev, [type]: true }))
    setUploadStatus(prev => ({ ...prev, [type]: null }))

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(`/api/teacher/upload/${type}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.ok) {
        setUploadStatus(prev => ({ ...prev, [type]: 'success' }))
      } else {
        setUploadStatus(prev => ({ ...prev, [type]: 'error' }))
      }
    } catch (error) {
      setUploadStatus(prev => ({ ...prev, [type]: 'error' }))
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }))
    }
  }

  const uploadCards = [
    {
      key: 'attendance',
      title: 'Upload Attendance',
      description: 'Upload daily attendance records',
      icon: CheckCircle,
      requiredColumns: ['student_id', 'date', 'is_present', 'subject_code']
    },
    {
      key: 'assessments',
      title: 'Upload Assessment Scores',
      description: 'Upload IA1, IA2, Mid-sem, Final scores',
      icon: BarChart3,
      requiredColumns: ['student_id', 'assessment_name', 'max_score', 'score_obtained']
    },
    {
      key: 'activities',
      title: 'Upload Activities',
      description: 'Upload extracurricular activities',
      icon: TrendingDown,
      requiredColumns: ['student_id', 'date', 'activity_type']
    }
  ]

  const filteredStudents = mockAtRiskStudents.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.student_id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sendNotification = async (studentId, type) => {
    try {
      const response = await fetch('/api/teacher/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ studentId, type })
      })

      if (response.ok) {
        alert(`${type} notification sent successfully!`)
      }
    } catch (error) {
      alert('Failed to send notification')
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
                <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  {mockTeacherStats.facultyId} • {mockTeacherStats.department}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="flex items-center space-x-2">
              <BookOpen className="h-3 w-3" />
              <span>{mockTeacherStats.mySubjects.length} Subjects</span>
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">At-Risk Students</TabsTrigger>
            <TabsTrigger value="uploads">Data Upload</TabsTrigger>
            <TabsTrigger value="subjects">My Subjects</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">My Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockTeacherStats.totalStudents}</div>
                  <p className="text-xs text-muted-foreground">Across all subjects</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Subjects</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockTeacherStats.mySubjects}</div>
                  <p className="text-xs text-muted-foreground">Teaching load</p>
                </CardContent>
              </Card>

              <Card className="border-destructive/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{mockTeacherStats.atRiskStudents}</div>
                  <p className="text-xs text-muted-foreground">Need attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Assessments</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockTeacherStats.recentAssessments}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* My Subjects */}
            <Card>
              <CardHeader>
                <CardTitle>My Subjects</CardTitle>
                <CardDescription>Subjects you are currently teaching</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockTeacherStats.subjects.map((subject, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                      <h4 className="font-medium">{subject}</h4>
                      <p className="text-sm text-muted-foreground mt-1">52 students enrolled</p>
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          Scores
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="h-3 w-3 mr-1" />
                          Attendance
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* At-Risk Students Tab */}
          <TabsContent value="students" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle>At-Risk Students</CardTitle>
                <CardDescription>Students requiring immediate attention and intervention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by name or student ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                {/* Students Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead>Last Score</TableHead>
                        <TableHead>Risk Level</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.student_id}</p>
                            </div>
                          </TableCell>
                          <TableCell>{student.course}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span className={student.attendance < 75 ? 'text-destructive' : 'text-green-600'}>
                                {student.attendance}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={student.lastAssessment < 40 ? 'text-destructive' : 'text-green-600'}>
                              {student.lastAssessment}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge variant={student.riskLevel === 'HIGH' ? 'destructive' : 'secondary'}>
                              {student.riskLevel}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => sendNotification(student.id, 'email')}
                              >
                                <Mail className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => sendNotification(student.id, 'whatsapp')}
                              >
                                <Phone className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Upload Tab */}
          <TabsContent value="uploads" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {uploadCards.map((card) => {
                const IconComponent = card.icon
                const isUploading = uploading[card.key]
                const status = uploadStatus[card.key]
                
                return (
                  <Card key={card.key} className="relative overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <IconComponent className="h-5 w-5" />
                        <span>{card.title}</span>
                      </CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Required Columns */}
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Required Columns:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {card.requiredColumns.map((col) => (
                            <Badge key={col} variant="outline" className="text-xs">
                              {col}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* File Input */}
                      <div className="space-y-2">
                        <Input
                          ref={fileRefs[card.key]}
                          type="file"
                          accept=".xlsx,.xls,.csv"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFileUpload(card.key, file)
                          }}
                          disabled={isUploading}
                          className="hidden"
                        />
                        
                        <Button
                          onClick={() => fileRefs[card.key].current?.click()}
                          disabled={isUploading}
                          className="w-full"
                          variant="outline"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {isUploading ? 'Uploading...' : 'Choose File'}
                        </Button>
                      </div>

                      {/* Status */}
                      {status && (
                        <Alert className={status === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                          <AlertDescription className="flex items-center space-x-2">
                            {status === 'success' ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            )}
                            <span>
                              {status === 'success' ? 'Upload successful!' : 'Upload failed. Please check file format.'}
                            </span>
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Upload Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Guidelines</CardTitle>
                <CardDescription>Important information for data uploads</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">File Format Requirements:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Excel files (.xlsx, .xls) or CSV</li>
                      <li>• First row must contain column headers</li>
                      <li>• Date format: YYYY-MM-DD</li>
                      <li>• Student IDs must match master data</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Data Validation:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• All required columns must be present</li>
                      <li>• Scores should be numeric values</li>
                      <li>• Attendance: TRUE/FALSE or 1/0</li>
                      <li>• Invalid rows will be skipped</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Subjects Tab */}
          <TabsContent value="subjects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockTeacherStats.subjects.map((subject, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>{subject}</span>
                    </CardTitle>
                    <CardDescription>Current semester subject</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Enrolled:</p>
                        <p className="font-medium">52 students</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Attendance:</p>
                        <p className="font-medium">78%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Assessment:</p>
                        <p className="font-medium">IA2 - 76%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">At Risk:</p>
                        <p className="font-medium text-destructive">4 students</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button size="sm" className="w-full">
                        <BarChart3 className="h-3 w-3 mr-2" />
                        View Analytics
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        <Upload className="h-3 w-3 mr-2" />
                        Upload Scores
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}