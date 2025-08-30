import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !['ADMIN', 'TEACHER'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { studentId } = await req.json()

    // Get student data for prediction
    const student = await prisma.studentProfile.findFirst({
      where: {
        id: studentId,
        instituteId: session.user.instituteId
      },
      include: {
        attendances: {
          orderBy: { date: 'desc' },
          take: 30 // Last 30 days
        },
        assessments: {
          orderBy: { id: 'desc' },
          take: 10 // Last 10 assessments
        },
        activities: {
          orderBy: { date: 'desc' },
          take: 20
        },
        fees: {
          where: { status: { not: 'PAID' } }
        }
      }
    })

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // Get institute config for thresholds
    const config = await prisma.instituteConfig.findUnique({
      where: { instituteId: session.user.instituteId }
    })

    // Calculate risk factors
    const attendanceRate = student.attendances.length > 0 
      ? (student.attendances.filter(a => a.is_present).length / student.attendances.length) * 100
      : 100

    const recentScores = student.assessments.map(a => (a.score_obtained / a.max_score) * 100)
    const avgScore = recentScores.length > 0 
      ? recentScores.reduce((sum, score) => sum + score, 0) / recentScores.length
      : 100

    const unpaidFees = student.fees.reduce((sum, fee) => sum + (fee.amount_due - fee.amount_paid), 0)
    const recentActivities = student.activities.filter(a => 
      new Date(a.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length

    // Simple risk calculation (replace with actual ML model)
    let riskScore = 0
    const factors = []

    if (attendanceRate < (config?.attendanceCutoff || 75)) {
      riskScore += 0.3
      factors.push('Low attendance')
    }

    if (avgScore < (config?.finalSemCutoff || 40)) {
      riskScore += 0.4
      factors.push('Poor academic performance')
    }

    if (unpaidFees > 10000) {
      riskScore += 0.2
      factors.push('Pending fees')
    }

    if (recentActivities < 2) {
      riskScore += 0.1
      factors.push('Low engagement')
    }

    const riskLevel = riskScore > 0.7 ? 'CRITICAL' : 
                     riskScore > 0.5 ? 'HIGH' : 
                     riskScore > 0.3 ? 'MEDIUM' : 'LOW'

    // Save prediction
    const prediction = await prisma.dropoutPrediction.create({
      data: {
        studentId: student.id,
        risk_score: riskScore,
        risk_level: riskLevel,
        confidence: 0.85, // Mock confidence
        contributing_factors: factors,
        recommendations: generateRecommendations(factors)
      }
    })

    return NextResponse.json({
      riskScore,
      riskLevel,
      factors,
      recommendations: prediction.recommendations,
      attendanceRate,
      avgScore,
      unpaidFees,
      recentActivities
    })

  } catch (error) {
    console.error('Prediction error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generateRecommendations(factors: string[]) {
  const recommendations = []
  
  if (factors.includes('Low attendance')) {
    recommendations.push('Schedule counseling session for attendance improvement')
    recommendations.push('Contact parents/guardians')
  }
  
  if (factors.includes('Poor academic performance')) {
    recommendations.push('Arrange peer tutoring or extra classes')
    recommendations.push('Academic counseling with subject teachers')
  }
  
  if (factors.includes('Pending fees')) {
    recommendations.push('Fee payment reminder and assistance')
    recommendations.push('Financial aid consultation')
  }
  
  if (factors.includes('Low engagement')) {
    recommendations.push('Encourage participation in extracurricular activities')
    recommendations.push('Mentorship program enrollment')
  }

  return recommendations
}

// Utility function for triggering notifications
async function triggerLowScoreNotifications(instituteId: string) {
  try {
    const config = await prisma.instituteConfig.findUnique({
      where: { instituteId }
    })

    if (!config?.emailNotifications) return

    // Find students with recent low scores
    const lowScoreStudents = await prisma.$queryRaw`
      SELECT DISTINCT sp.id, sp.student_id, u.email, u.name
      FROM "Assessment" a
      JOIN "StudentProfile" sp ON sp.id = a."studentId"
      LEFT JOIN "User" u ON u."studentId" = sp.student_id AND u."instituteId" = sp."instituteId"
      WHERE sp."instituteId" = ${instituteId}
        AND a."createdAt" > NOW() - INTERVAL '7 days'
        AND (a."score_obtained" / NULLIF(a."max_score",0)) * 100 < ${config.finalSemCutoff}
        AND u.email IS NOT NULL
    `

    // Send notifications (implement based on your notification service)
    for (const student of lowScoreStudents as any[]) {
      try {
        await sendEmail(
          student.email,
          'Academic Performance Alert',
          `<p>Dear ${student.name}, your recent assessment performance has fallen below the institute threshold. Please check your portal for detailed analysis and contact your counselor.</p>`
        )

        await prisma.notification.create({
          data: {
            studentId: student.id,
            type: 'EMAIL',
            content: 'Low score alert sent',
            status: 'SENT',
            recipient: student.email
          }
        })
      } catch (error) {
        console.error('Failed to send notification to:', student.email, error)
      }
    }
  } catch (error) {
    console.error('Notification trigger error:', error)
  }
}