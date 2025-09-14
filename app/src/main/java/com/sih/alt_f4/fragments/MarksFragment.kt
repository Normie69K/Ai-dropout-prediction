package com.sih.alt_f4.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.sih.alt_f4.adapters.MarksAdapter
import com.sih.alt_f4.databinding.FragmentMarksBinding
import com.sih.alt_f4.models.SubjectMarks

class MarksFragment : Fragment() {

    private var _binding: FragmentMarksBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentMarksBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Create temporary data to display
        val marksData = listOf(
            SubjectMarks("Data Structures", "CS301", "A+", "18/20", "19/20", "72/80"),
            SubjectMarks("Database Systems", "CS302", "A", "15/20", "17/20", "68/80"),
            SubjectMarks("Computer Networks", "CS303", "F", "8/20", "10/20", "40/80")
        )

        // Create and set up the adapter
        val marksAdapter = MarksAdapter(marksData)
        binding.recyclerViewMarks.apply {
            layoutManager = LinearLayoutManager(context)
            adapter = marksAdapter
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}