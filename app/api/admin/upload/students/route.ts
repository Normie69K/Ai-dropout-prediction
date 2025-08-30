import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import * as XLSX from 'xlsx'
import formidable from 'formidable'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert file to buffer and parse Excel
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const workbook = XLSX.read(buffer, { type: 'buffer' })
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json(worksheet) as any[]

    const requiredColumns = ['student_id', 'course', 'admission_year', 'entry_exam_percentile', 'first_generation_learner']
    
    // Validate columns
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Empty file' }, { status: 400 })
    }

    const fileColumns = Object.keys(rows[0])
    const missingColumns = requiredColumns.filter(col => !fileColumns.includes(col))
    
    if (missingColumns.length > 0) {
      return NextResponse.json({ 
        error: `Missing required columns: ${missingColumns.join(', ')}` 
      }, { status: 400 })
    }

    // Process and insert data
    let processed = 0
    let errors = 0

    for (const row of rows) {
      try {
        await prisma.studentProfile.upsert({
          where: {
            instituteId_student_id: {
              instituteId: session.user.instituteId,
              student_id: String(row.student_id)
            }
          },
          update: {
            course: row.course || null,
            admission_year: row.admission_year ? parseInt(row.admission_year) : null,
            entry_exam_percentile: row.entry_exam_percentile ? parseFloat(row.entry_exam_percentile) : null,
            first_generation_learner: row.first_generation_learner === true || String(row.first_generation_learner).toLowerCase() === 'true'
          },
          create: {
            instituteId: session.user.instituteId,
            student_id: String(row.student_id),
            course: row.course || null,
            admission_year: row.admission_year ? parseInt(row.admission_year) : null,
            entry_exam_percentile: row.entry_exam_percentile ? parseFloat(row.entry_exam_percentile) : null,
            first_generation_learner: row.first_generation_learner === true || String(row.first_generation_learner).toLowerCase() === 'true'
          }
        })
        processed++
      } catch (error) {
        console.error('Error processing row:', row, error)
        errors++
      }
    }

    return NextResponse.json({ 
      message: 'Upload completed',
      processed,
      errors,
      total: rows.length
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}