"use client"

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Users,
  Upload,
  Settings,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle,
  Code,
  School,
  UserPlus,
  TrendingUp,
  BarChart3,
  Mail,
  MessageSquare,
  Download
} from 'lucide-react'

export default function AdminDashboard() {
  const [uploading, setUploading] = useState({
    students: false,
    attendance: false,
    assessments: false,
    activities: false,
    fees: false
  })
  
  const [uploadStatus, setUploadStatus] = useState({
    students: null,
    attendance: null,
    assessments: null,
    activities: null,
    fees: null
  })

  const [instituteConfig, setInstituteConfig] = useState({
    attendanceCutoff: 75,
    ia1Cutoff: 40,
    ia2Cutoff: 40,
    midSemCutoff: 40,
    finalSemCutoff: 40,
    emailNotifications: true,
    whatsappNotifications: false
  })

  // File upload refs
  const fileRefs = {
    students: useRef(null),
    attendance: useRef(null),
    assessments: useRef(null),
    activities: useRef(null),
    fees: useRef(null)
  }

  const mockStats = {
    totalStudents: 2847,
    totalTeachers: 156,
    atRiskStudents: 142,
    instituteCode: 'qwken1t5',
    instituteName: 'Sample Engineering College',
    recentUploads: [
      { file: 'students.xlsx', date: '2024-01-15', records: 2847, status: 'success' },
      { file: 'attendance.xlsx', date: '2024-01-14', records: 45678, status: 'success' },
      { file: 'assessments.xlsx', date: '2024-01-13', records: 8562, status: 'success' }
    ]
  }

  const handleFileUpload = async (type, file) => {
    if (!file) return

    setUploading(prev => ({ ...prev, [type]: true }))
    setUploadStatus(prev => ({ ...prev, [type]: null }))

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(`/api/admin/upload/${type}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      const result = await response.json()

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

  const saveConfig = async () => {
    try {
      const response = await fetch('/api/admin/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(instituteConfig)
      })

      if (response.ok) {
        alert('Configuration saved successfully!')
      }
    } catch (error) {
      alert('Failed to save configuration')
    }
  }

  const uploadCards = [
    {
      key: 'students',
      title: 'Student Master Data',
      description: 'Upload students.xlsx with student profiles',
      icon: Users,
      requiredColumns: ['student_id', 'course', 'admission_year', 'entry_exam_percentile', 'first_generation_learner']
    },
    {
      key: 'attendance',
      title: 'Attendance Records',
      description: 'Upload attendance.xlsx with daily attendance',
      icon: CheckCircle,
      requiredColumns: ['student_id', 'date', 'is_present', 'subject_code']
    },
    {
      key: 'assessments',
      title: 'Assessment Scores',
      description: 'Upload assessments.xlsx with exam scores',
      icon: BarChart3,
      requiredColumns: ['student_id', 'assessment_name', 'max_score', 'score_obtained']
    },
    {
      key: 'activities',
      title: 'Student Activities',
      description: 'Upload activities.xlsx with extracurricular data',
      icon: TrendingUp,
      requiredColumns: ['student_id', 'date', 'activity_type']
    },
    {
      key: 'fees',
      title: 'Fee Records',
      description: 'Upload fees.xlsx with payment information',
      icon: FileSpreadsheet,
      requiredColumns: ['student_id', 'due_date', 'amount_due', 'amount_paid']
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <School className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">{mockStats.instituteName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center space-x-2">
                <Code className="h-3 w-3" />
                <span>Code: {mockStats.instituteCode}</span>
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
                </div>
    </div>

    {/* Main Content */}
    <div className="container mx-auto px-4 py-6">
      <Tabs defaultValue="uploads" className="w-full">
        <TabsList>
          <TabsTrigger value="uploads">Data Uploads</TabsTrigger>
          <TabsTrigger value="config">Institute Config</TabsTrigger>
          <TabsTrigger value="stats">Analytics</TabsTrigger>
        </TabsList>

        {/* Uploads Section */}
        <TabsContent value="uploads" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uploadCards.map((card) => (
            <Card key={card.key} className="shadow-sm border">
              <CardHeader>
                <card.icon className="h-6 w-6 text-primary mb-2" />
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  type="file"
                  ref={fileRefs[card.key]}
                  accept=".xlsx"
                  onChange={(e) => handleFileUpload(card.key, e.target.files?.[0])}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  disabled={uploading[card.key]}
                  onClick={() => fileRefs[card.key].current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading[card.key] ? "Uploading..." : "Upload File"}
                </Button>

                {uploadStatus[card.key] === "success" && (
                  <Alert className="mt-3 border-green-500 text-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <AlertDescription>Upload successful!</AlertDescription>
                  </Alert>
                )}
                {uploadStatus[card.key] === "error" && (
                  <Alert className="mt-3 border-red-500 text-red-700">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <AlertDescription>Upload failed. Try again.</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Config Section */}
        <TabsContent value="config">
          <Card>
            <CardHeader>
              <Settings className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Institute Configuration</CardTitle>
              <CardDescription>Set thresholds and notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "attendanceCutoff", label: "Attendance Cutoff (%)" },
                  { key: "ia1Cutoff", label: "IA1 Cutoff" },
                  { key: "ia2Cutoff", label: "IA2 Cutoff" },
                  { key: "midSemCutoff", label: "Mid-Sem Cutoff" },
                  { key: "finalSemCutoff", label: "Final Exam Cutoff" },
                ].map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label>{field.label}</Label>
                    <Input
                      type="number"
                      value={instituteConfig[field.key]}
                      onChange={(e) =>
                        setInstituteConfig((prev) => ({
                          ...prev,
                          [field.key]: parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-4 mt-4">
                <Label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={instituteConfig.emailNotifications}
                    onChange={(e) =>
                      setInstituteConfig((prev) => ({
                        ...prev,
                        emailNotifications: e.target.checked,
                      }))
                    }
                  />
                  <span>Email Notifications</span>
                </Label>
                <Label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={instituteConfig.whatsappNotifications}
                    onChange={(e) =>
                      setInstituteConfig((prev) => ({
                        ...prev,
                        whatsappNotifications: e.target.checked,
                      }))
                    }
                  />
                  <span>WhatsApp Notifications</span>
                </Label>
              </div>

              <Button onClick={saveConfig} className="mt-4">
                Save Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stats Section */}
        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Users className="h-6 w-6 text-primary mb-2" />
                <CardTitle>Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{mockStats.totalStudents}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <UserPlus className="h-6 w-6 text-primary mb-2" />
                <CardTitle>Total Teachers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{mockStats.totalTeachers}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <AlertTriangle className="h-6 w-6 text-red-500 mb-2" />
                <CardTitle>At-Risk Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-600">
                  {mockStats.atRiskStudents}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <Download className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Recent Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockStats.recentUploads.map((upload, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b py-2 text-sm"
                  >
                    <span>{upload.file}</span>
                    <span className="text-muted-foreground">
                      {upload.date}
                    </span>
                    <Badge
                      variant={
                        upload.status === "success" ? "default" : "destructive"
                      }
                    >
                      {upload.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </div>
  )
}
