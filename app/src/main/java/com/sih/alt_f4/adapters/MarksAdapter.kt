package com.sih.alt_f4.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.sih.alt_f4.databinding.ItemMarksSubjectBinding
import com.sih.alt_f4.models.SubjectMarks

class MarksAdapter(private val marksList: List<SubjectMarks>) :
    RecyclerView.Adapter<MarksAdapter.MarksViewHolder>() {

    inner class MarksViewHolder(val binding: ItemMarksSubjectBinding) :
        RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MarksViewHolder {
        val binding = ItemMarksSubjectBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return MarksViewHolder(binding)
    }

    override fun onBindViewHolder(holder: MarksViewHolder, position: Int) {
        val item = marksList[position]
        holder.binding.apply {
            subjectNameMarks.text = item.subjectName
            subjectCodeMarks.text = item.subjectCode
            gradeTag.text = item.grade
            // Assuming the breakdown text views are nested
            // You'll need to add IDs to the TextViews inside the breakdown LinearLayouts
            // For example: textTest1Score.text = item.test1Score
        }
    }

    override fun getItemCount() = marksList.size
}