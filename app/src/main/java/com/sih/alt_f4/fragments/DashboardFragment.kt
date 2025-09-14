package com.sih.alt_f4.fragments

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import com.sih.alt_f4.R
import com.sih.alt_f4.adapters.AlertAdapter
import com.sih.alt_f4.adapters.DashboardSubjectAdapter
import com.sih.alt_f4.databinding.FragmentDashboardBinding
import com.sih.alt_f4.models.AcademicAlert
import com.sih.alt_f4.models.SubjectAttendance

class DashboardFragment : Fragment(R.layout.fragment_dashboard) {

    private var _binding: FragmentDashboardBinding? = null
    private val binding get() = _binding!!

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        _binding = FragmentDashboardBinding.bind(view)

        // Populate static text
        binding.textGpa.text = "GPA: 8.2 / 10"
        binding.textPassPercent.text = "Passed: 95%"
        binding.textBacklogs.text = "1 Failed Subject: Computer Networks"


        // THE FIX IS HERE: Added the 'type' parameter
        val alerts = listOf(
            AcademicAlert(
                type = "Critical",
                title = "Poor Performance: Computer Networks",
                description = "Current GPA: 4.83. Below passing grade.",
                hasStudyPlan = true
            ),
            AcademicAlert(
                type = "Critical",
                title = "High Backlog Risk: Computer Networks",
                description = "Both attendance (63%) and performance are low.",
                hasStudyPlan = true
            )
        )

        val alertAdapter = AlertAdapter(alerts) { clickedAlert ->
            findNavController().navigate(R.id.action_dashboardFragment_to_studyStrategyFragment)
        }
        binding.recyclerViewAlerts.layoutManager = LinearLayoutManager(context)
        binding.recyclerViewAlerts.adapter = alertAdapter


        // Dummy subject data
        val subjectData = listOf(
            SubjectAttendance("Data Structures", "CS301", 40, 38),
            SubjectAttendance("Database Systems", "CS302", 35, 28),
            SubjectAttendance("Computer Networks", "CS303", 32, 20),
            SubjectAttendance("Software Engineering", "CS304", 38, 37)
        )

        // Set up the Subjects RecyclerView
        val subjectAdapter = DashboardSubjectAdapter(subjectData)
        binding.recyclerViewSubjects.apply {
            layoutManager = LinearLayoutManager(context)
            adapter = subjectAdapter
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}