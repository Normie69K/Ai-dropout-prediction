package com.sih.alt_f4.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.sih.alt_f4.databinding.ItemDashboardSubjectBinding
import com.sih.alt_f4.models.SubjectAttendance

class DashboardSubjectAdapter(private val subjects: List<SubjectAttendance>) :
    RecyclerView.Adapter<DashboardSubjectAdapter.SubjectViewHolder>() {

    inner class SubjectViewHolder(val binding: ItemDashboardSubjectBinding) :
        RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SubjectViewHolder {
        val binding = ItemDashboardSubjectBinding.inflate(
            LayoutInflater.from(parent.context), parent, false)
        return SubjectViewHolder(binding)
    }

    override fun onBindViewHolder(holder: SubjectViewHolder, position: Int) {
        val subject = subjects[position]
        holder.binding.subjectTitle.text = subject.subjectName
        holder.binding.subjectCode.text = subject.subjectCode
        holder.binding.subjectAttendance.text = "${subject.attendancePercentage}%"
    }

    override fun getItemCount() = subjects.size
}