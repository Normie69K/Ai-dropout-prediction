package com.sih.alt_f4.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.sih.alt_f4.R
import com.sih.alt_f4.databinding.ItemAttendanceSubjectBinding
import com.sih.alt_f4.models.SubjectAttendance

class AttendanceAdapter(private val attendanceList: List<SubjectAttendance>) :
    RecyclerView.Adapter<AttendanceAdapter.AttendanceViewHolder>() {

    // Inner class to hold the views for each item
    inner class AttendanceViewHolder(val binding: ItemAttendanceSubjectBinding) :
        RecyclerView.ViewHolder(binding.root)

    // Creates a new ViewHolder
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AttendanceViewHolder {
        val binding = ItemAttendanceSubjectBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return AttendanceViewHolder(binding)
    }

    // Binds the data to the views in a specific list item
    override fun onBindViewHolder(holder: AttendanceViewHolder, position: Int) {
        val item = attendanceList[position]
        val context = holder.binding.root.context

        holder.binding.apply {
            subjectName.text = item.subjectName
            subjectCode.text = item.subjectCode
            attendancePercentage.text = "${item.attendancePercentage}%"
            progressBar.progress = item.attendancePercentage

            // Dynamically set the status tag color and text
            when {
                item.attendancePercentage >= 85 -> {
                    statusTag.text = "Good"
                    statusTag.background = ContextCompat.getDrawable(context, R.drawable.bg_status_good)
                    statusTag.setTextColor(ContextCompat.getColor(context, R.color.status_good_text))
                }
                item.attendancePercentage in 75..84 -> {
                    statusTag.text = "Warning"
                    statusTag.background = ContextCompat.getDrawable(context, R.drawable.bg_status_warning)
                    statusTag.setTextColor(ContextCompat.getColor(context, R.color.status_warning_text))
                }
                else -> {
                    statusTag.text = "Critical"
                    statusTag.background = ContextCompat.getDrawable(context, R.drawable.bg_status_critical)
                    statusTag.setTextColor(ContextCompat.getColor(context, R.color.status_critical_text))
                }
            }
        }
    }

    // Returns the total number of items in the list
    override fun getItemCount() = attendanceList.size
}