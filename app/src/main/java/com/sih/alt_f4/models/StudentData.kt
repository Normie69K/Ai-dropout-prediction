package com.sih.alt_f4.models

// Represents a single subject's attendance record
data class SubjectAttendance(
    val subjectName: String,
    val subjectCode: String,
    val totalClasses: Int,
    val attendedClasses: Int
) {
    // Calculated property for percentage
    val attendancePercentage: Int
        get() = if (totalClasses > 0) (attendedClasses * 100) / totalClasses else 0
}

// Represents a single subject's marks
data class SubjectMarks(
    val subjectName: String,
    val subjectCode: String,
    val grade: String,
    val test1Score: String,
    val test2Score: String,
    val finalScore: String
)

// Represents a single chat message
data class ChatMessage(
    val message: String,
    val timestamp: String,
    val isFromAI: Boolean
)

data class Chapter(
    val chapterNumber: String,
    val chapterTitle: String,
    val pageCount: Int
)


data class AcademicAlert(
    val type: String, // e.g., "Critical", "Info"
    val title: String,
    val description: String,
    val hasStudyPlan: Boolean = false
)
