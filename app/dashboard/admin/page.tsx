"use client"

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts'
import {
  Users, Upload, Settings, FileSpreadsheet, AlertTriangle, CheckCircle, Code, School, UserPlus, 
  TrendingUp, BarChart3, Download, LogOut, Brain, Bell, Send, Eye, RefreshCw, 
  TrendingDown, Activity, GraduationCap, Clock, DollarSign, Mail, MessageSquare, Search
} from 'lucide-react'

export default function EnhancedAdminDashboard() {
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

  const [predictions, setPredictions] = useState([])
  const [generating, setGenerating] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)

  // Mock data for demonstration
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 2847,
    atRiskStudents: 142,
    lowRiskStudents: 2705,
    avgRiskScore: 0.23,
    riskDistribution: [
      { name: 'Low Risk', value: 2705, color: '#10b981' },
      { name: 'Medium Risk', value: 89, color: '#f59e0b' },
      { name: 'High Risk', value: 53, color: '#ef4444' }
    ],
    monthlyTrends: [
      { month: 'Jan', risk: 4.2, attendance: 92 },
      { month: 'Feb', risk: 4.8, attendance: 89 },
      { month: 'Mar', risk: 5.1, attendance: 87 },
      { month: 'Apr', risk: 4.9, attendance: 90 },
      { month: 'May', risk: 5.6, attendance: 85 }
    ],
    topRiskFactors: [
      { factor: 'Low Attendance', count: 89, percentage: 62.7 },
      { factor: 'Poor Assessment Scores', count: 67, percentage: 47.2 },
      { factor: 'Fee Payment Delays', count: 45, percentage: 31.7 },
      { factor: 'Reduced LMS Activity', count: 38, percentage: 26.8 },
      { factor: 'Late Submissions', count: 29, percentage: 20.4 }
    ]
  })

  const [mockPredictions] = useState([
    {
      student_id: "STU001",
      name: "Amit Kumar",
      email: "amit.kumar@student.edu",
      phone: "+91 9876543210",
      course: "Computer Science",
      risk_score: 0.85,
      risk_category: "High Risk",
      explanation: "Risk increased by: `overall_attendance_pct` of 45.2%, `avg_score_pct` of 32.1%, `payment_delay` of 45 days.",
      attendance: 45.2,
      avgScore: 32.1,
      lastLogin: "2024-08-25"
    },
    {
      student_id: "STU002", 
      name: "Priya Sharma",
      email: "priya.sharma@student.edu",
      phone: "+91 9876543211",
      course: "Mechanical Engineering",
      risk_score: 0.72,
      risk_category: "High Risk", 
      explanation: "Risk increased by: `avg_submission_delay` of 8.5 days, `lms_logins` of 12, `overall_attendance_pct` of 68.3%.",
      attendance: 68.3,
      avgScore: 58.2,
      lastLogin: "2024-08-23"
    },
    {
      student_id: "STU003",
      name: "Rahul Patel",
      email: "rahul.patel@student.edu", 
      phone: "+91 9876543212",
      course: "Electrical Engineering",
      risk_score: 0.15,
      risk_category: "Low Risk",
      explanation: null,
      attendance: 92.1,
      avgScore: 78.9,
      lastLogin: "2024-08-30"
    }
  ])

  // Add this to your component to debug the upload process
useEffect(() => {
  console.log('Upload status changed:', uploadStatus);
}, [uploadStatus]);

useEffect(() => {
  console.log('Uploading states changed:', uploading);
}, [uploading]);

  useEffect(() => {
  console.log('Predictions updated:', predictions);
  // This will log whenever predictions change
}, [predictions]);

  // Add this useEffect to fetch predictions on component mount
useEffect(() => {
  const fetchPredictions = async () => {
    try {
      const response = await fetch('/api/admin/predictions')
      if (response.ok) {
        const data = await response.json()
        setPredictions(data.predictions)
      }
    } catch (error) {
      console.error('Failed to fetch predictions:', error)
    }
  }
  
  fetchPredictions()
}, [])

// // Replace the mockPredictions with actual predictions
// const filteredPredictions = predictions.filter(p => 
//   p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   p.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   p.course.toLowerCase().includes(searchTerm.toLowerCase())
// )

  const fileRefs = {
    students: useRef(null),
    attendance: useRef(null),
    assessments: useRef(null),
    activities: useRef(null),
    fees: useRef(null)
  }

  const handleFileUpload = async (type, file) => {

    // Validate file type
  const validTypes = ['.xlsx', '.xls', '.csv'];
  const fileExtension = file.name.split('.').pop().toLowerCase();
  
  if (!validTypes.includes(`.${fileExtension}`)) {
    alert('Please upload only Excel or CSV files');
    setUploadStatus(prev => ({ ...prev, [type]: 'error' }));
    return;
  }

  // Validate file size (e.g., 10MB max)
  if (file.size > 10 * 1024 * 1024) {
    alert('File size too large. Maximum size is 10MB');
    setUploadStatus(prev => ({ ...prev, [type]: 'error' }));
    return;
  }

  if (!file) return;

  setUploading(prev => ({ ...prev, [type]: true }));
  setUploadStatus(prev => ({ ...prev, [type]: null }));

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`/api/admin/upload/${type}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error);
    }

    setUploadStatus(prev => ({ ...prev, [type]: 'success' }));
    checkAndGeneratePredictions();
    
  } catch (error) {
    console.error(`${type} upload error:`, error);
    setUploadStatus(prev => ({ ...prev, [type]: 'error' }));
    alert(`Upload failed: ${error.message}`);
  } finally {
    setUploading(prev => ({ ...prev, [type]: false }));
  }
}

  const checkAndGeneratePredictions = () => {
  const allUploaded = Object.values(uploadStatus).every(status => status === 'success');
  const anyFailed = Object.values(uploadStatus).some(status => status === 'error');
  
  if (allUploaded) {
    setTimeout(() => generatePredictions(), 1000);
  } else if (anyFailed) {
    alert('Some files failed to upload. Please fix errors before generating predictions.');
  }
};

 const generatePredictions = async () => {
  setGenerating(true);
  console.log('Starting prediction generation...');

  const hasData = predictions.length > 0 || Object.values(uploadStatus).some(status => status === 'success');
  
  if (!hasData) {
    alert('Please upload all required files before generating predictions.');
    return;
  }


  try {
    const response = await fetch('/api/admin/predict', {
      method: 'POST'
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Predictions API response:', data);
      setPredictions(data.predictions);
    } else {
      const errorData = await response.json();
      console.error('Prediction generation failed:', errorData);
      alert('Failed to generate predictions: ' + (errorData.error || 'Unknown error'));
    }
  } catch (error) {
    console.error('Failed to generate predictions:', error);
    alert('Network error when generating predictions');
  } finally {
    setGenerating(false);
  }
}

  const sendNotification = async (studentId, type) => {
    try {
      await fetch('/api/admin/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, type })
      })
      alert(`${type} notification sent successfully!`)
    } catch (error) {
      alert(`Failed to send ${type} notification`)
    }
  }

  // const filteredPredictions = mockPredictions.filter(p => 
  //   p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   p.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   p.course.toLowerCase().includes(searchTerm.toLowerCase())
  // )

  // Update this based on your actual API response structure
const filteredPredictions = predictions.filter(p => 
  p && p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  p.student_id && p.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  p.course && p.course.toLowerCase().includes(searchTerm.toLowerCase())
);

const highRiskStudents = filteredPredictions.filter(p => p && p.risk_score > 0.5);

  const uploadCards = [
    { key: 'students', title: 'Student Master Data', description: 'Upload students.xlsx with student profiles', icon: Users },
    { key: 'attendance', title: 'Attendance Records', description: 'Upload attendance.xlsx with daily attendance', icon: CheckCircle },
    { key: 'assessments', title: 'Assessment Scores', description: 'Upload assessments.xlsx with exam scores', icon: BarChart3 },
    { key: 'activities', title: 'Student Activities', description: 'Upload activities.xlsx with extracurricular data', icon: TrendingUp },
    { key: 'fees', title: 'Fee Records', description: 'Upload fees.xlsx with payment information', icon: FileSpreadsheet }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Brain className="h-10 w-10 text-blue-600" />
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    EduEWS Admin
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">AI-Powered Student Analytics</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center space-x-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700">
                <Code className="h-4 w-4 text-blue-600" />
                <span className="text-blue-600 font-medium">Institute: EDU001</span>
              </Badge>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white dark:bg-slate-800 shadow-sm">
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>AI Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="uploads" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Data Uploads</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Student Details</span>
            </TabsTrigger>
            <TabsTrigger value="config" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Configuration</span>
            </TabsTrigger>
          </TabsList>

          {/* AI Analytics Tab */}
          <TabsContent value="analytics" className="space-y-8">
            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Total Students</p>
                      <p className="text-3xl font-bold">{dashboardData.totalStudents.toLocaleString()}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100 text-sm font-medium">High Risk Students</p>
                      <p className="text-3xl font-bold">{dashboardData.atRiskStudents}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Low Risk Students</p>
                      <p className="text-3xl font-bold">{dashboardData.lowRiskStudents}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Avg Risk Score</p>
                      <p className="text-3xl font-bold">{(dashboardData.avgRiskScore * 100).toFixed(1)}%</p>
                    </div>
                    <Brain className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Risk Distribution Pie Chart */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="shadow-lg border-none bg-white dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      <span>Risk Distribution</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={dashboardData.riskDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                        >
                          {dashboardData.riskDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Monthly Trends */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="shadow-lg border-none bg-white dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span>Monthly Trends</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={dashboardData.monthlyTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={3} name="Risk %" />
                        <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={3} name="Attendance %" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Top Risk Factors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="shadow-lg border-none bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span>Top Risk Factors</span>
                  </CardTitle>
                  <CardDescription>Most common factors contributing to dropout risk</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.topRiskFactors.map((factor, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                            index === 0 ? 'from-red-400 to-red-600' :
                            index === 1 ? 'from-orange-400 to-orange-600' :
                            index === 2 ? 'from-yellow-400 to-yellow-600' :
                            'from-gray-400 to-gray-600'
                          }`} />
                          <span className="font-medium">{factor.factor}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-slate-600 dark:text-slate-400">{factor.count} students</span>
                          <Badge variant="secondary">{factor.percentage}%</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Data Uploads Tab */}
          <TabsContent value="uploads" className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Data Management</h2>
                <p className="text-slate-600 dark:text-slate-400">Upload required Excel files to generate AI predictions</p>
              </div>
              <Button 
                onClick={generatePredictions}
                disabled={generating}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
              >
                {generating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Generate AI Predictions
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadCards.map((card, index) => (
                <motion.div
                  key={card.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-none shadow-md bg-white dark:bg-slate-800 group hover:scale-105">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                          <card.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{card.title}</CardTitle>
                          <CardDescription className="text-sm">{card.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <input
                        type="file"
                        ref={fileRefs[card.key]}
                        accept=".xlsx,.xls,.csv"
                        onChange={(e) => handleFileUpload(card.key, e.target.files?.[0])}
                        className="hidden"
                      />
                      
                      <Button
                        variant="outline"
                        disabled={uploading[card.key]}
                        onClick={() => fileRefs[card.key].current?.click()}
                        className="w-full border-dashed border-2 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {uploading[card.key] ? "Uploading..." : "Upload File"}
                      </Button>

                      {uploadStatus[card.key] === "success" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-700 dark:text-green-400">
                              Upload successful!
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      )}
                      
                      {uploadStatus[card.key] === "error" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-700 dark:text-red-400">
                              Upload failed. Try again.
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Student Details Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Student Risk Analysis</h2>
                <p className="text-slate-600 dark:text-slate-400">AI-powered insights and notifications</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Badge variant="destructive" className="px-3 py-1">
                  {highRiskStudents.length} High Risk
                </Badge>
              </div>
            </div>

            {/* Student Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPredictions.map((student, index) => (
                <motion.div
                  key={student.student_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`shadow-lg border-none transition-all duration-300 hover:shadow-xl ${
                    student.risk_score > 0.5 
                      ? 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200' 
                      : 'bg-white dark:bg-slate-800'
                  }`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg font-semibold">{student.name}</CardTitle>
                          <CardDescription className="text-sm">
                            {student.student_id} • {student.course}
                          </CardDescription>
                        </div>
                        <Badge 
                          variant={student.risk_score > 0.5 ? "destructive" : "default"}
                          className="font-medium"
                        >
                          {(student.risk_score * 100).toFixed(1)}% Risk
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span>Attendance: {student.attendance}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BarChart3 className="h-4 w-4 text-green-600" />
                          <span>Avg Score: {student.avgScore}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Activity className="h-4 w-4 text-purple-600" />
                          <span>Last Login: {student.lastLogin}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-orange-600" />
                          <span>
  {student.email?.split('@')[0] ?? "Unknown"}...
</span>

                        </div>
                      </div>

                      {student.explanation && (
                        <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-700 dark:text-red-400 text-xs">
                            <strong>AI Analysis:</strong> {student.explanation}
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => sendNotification(student.student_id, 'email')}
                          className="flex-1 text-xs"
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => sendNotification(student.student_id, 'whatsapp')}
                          className="flex-1 text-xs"
                        >
                          <MessageSquare className="h-3 w-3 mr-1" />
                          WhatsApp
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setSelectedStudent(student)}
                          className="px-3"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredPredictions.length === 0 && (
              <div className="text-center py-12">
                <Brain className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400">No predictions available</h3>
                <p className="text-slate-500 dark:text-slate-500">Upload all required files and generate predictions to see student risk analysis.</p>
              </div>
            )}
          </TabsContent>

          {/* Configuration Tab */}
          <TabsContent value="config" className="space-y-6">
            <Card className="shadow-lg border-none bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  <span>AI Model Configuration</span>
                </CardTitle>
                <CardDescription>Configure thresholds and notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Attendance Threshold (%)</Label>
                    <Input type="number" defaultValue="75" className="w-full" />
                    <p className="text-xs text-slate-500">Below this triggers risk alert</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Assessment Threshold</Label>
                    <Input type="number" defaultValue="40" className="w-full" />
                    <p className="text-xs text-slate-500">Minimum passing marks</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Risk Score Threshold</Label>
                    <Input type="number" step="0.1" defaultValue="0.5" className="w-full" />
                    <p className="text-xs text-slate-500">Above this is high risk</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <div>
                          <span className="font-medium">Email Notifications</span>
                          <p className="text-xs text-slate-500">Send risk alerts via email</p>
                        </div>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                        <div>
                          <span className="font-medium">WhatsApp Notifications</span>
                          <p className="text-xs text-slate-500">Send risk alerts via WhatsApp</p>
                        </div>
                      </div>
                      <input type="checkbox" className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <Settings className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedStudent(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold">{selectedStudent.name}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{selectedStudent.student_id} • {selectedStudent.course}</p>
                </div>
                <Button variant="ghost" onClick={() => setSelectedStudent(null)}>
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Risk Score</p>
                    <p className="text-2xl font-bold text-red-600">{(selectedStudent.risk_score * 100).toFixed(1)}%</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Attendance</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedStudent.attendance}%</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Average Score</p>
                    <p className="text-2xl font-bold text-green-600">{selectedStudent.avgScore}%</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Last Activity</p>
                    <p className="text-lg font-semibold">{selectedStudent.lastLogin}</p>
                  </div>
                </div>
              </div>

              {selectedStudent.explanation && (
                <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20 mb-6">
                  <Brain className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700 dark:text-red-400">
                    <strong>AI Analysis:</strong> {selectedStudent.explanation}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex space-x-3">
                <Button 
                  onClick={() => sendNotification(selectedStudent.student_id, 'email')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email Alert
                </Button>
                <Button 
                  onClick={() => sendNotification(selectedStudent.student_id, 'whatsapp')}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}