"use client"

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import {
  School,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Shield,
  Users,
  GraduationCap
} from 'lucide-react'

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    instituteCode: ''
  })

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        instituteCode: formData.instituteCode,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid credentials or institute code')
      } else {
        window.location.href = '/dashboard'
      }
    } catch (error) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <School className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              EduEWS
            </h1>
          </div>
          <p className="text-muted-foreground">Educational Early Warning System</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instituteCode">Institute Code (Optional for Admin)</Label>
                <Input
                  id="instituteCode"
                  value={formData.instituteCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, instituteCode: e.target.value }))}
                  placeholder="8-character code"
                  maxLength={8}
                />
                <p className="text-xs text-muted-foreground">
                  Required for teachers and students only
                </p>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                onClick={handleSubmit}
                className="w-full" 
                disabled={loading || !formData.email || !formData.password}
              >
                {loading ? 'Signing In...' : 'Sign In'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <Separator className="my-6" />

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">Don't have an account?</p>
              <Button variant="outline" className="w-full">
                Create New Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials Card */}
        <Card className="mt-6 bg-gray-50/80 backdrop-blur-sm border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Demo Credentials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-3 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-white/50">
                <div className="flex items-center space-x-2">
                  <Shield className="h-3 w-3 text-blue-600" />
                  <span className="font-medium">Admin:</span>
                </div>
                <span className="font-mono">admin@demo.edu</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white/50">
                <div className="flex items-center space-x-2">
                  <Users className="h-3 w-3 text-green-600" />
                  <span className="font-medium">Teacher:</span>
                </div>
                <span className="font-mono">teacher@demo.edu</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white/50">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-3 w-3 text-purple-600" />
                  <span className="font-medium">Student:</span>
                </div>
                <span className="font-mono">student@demo.edu</span>
              </div>
              <p className="text-center text-gray-600 mt-2">
                Password: <span className="font-mono">demo123</span> | Code: <span className="font-mono">demo1234</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}