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
        // The binding now connects to the IDs in your layout
        holder.binding.apply {
            subjectNameMarks.text = item.subjectName
            subjectCodeMarks.text = item.subjectCode
            gradeTag.text = item.grade

            // These lines now work correctly
            textTest1.text = item.test1Score
            textTest2.text = item.test2Score
            textFinal.text = item.finalScore
        }
    }

    override fun getItemCount() = marksList.size
}