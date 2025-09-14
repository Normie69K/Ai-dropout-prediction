package com.sih.alt_f4.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.sih.alt_f4.adapters.AttendanceAdapter
import com.sih.alt_f4.databinding.FragmentAttendanceBinding
import com.sih.alt_f4.models.SubjectAttendance

class AttendanceFragment : Fragment() {

    private var _binding: FragmentAttendanceBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentAttendanceBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // 1. Create temporary user data
        val attendanceData = listOf(
            SubjectAttendance("Data Structures", "CS301", 40, 38),
            SubjectAttendance("Database Systems", "CS302", 35, 28),
            SubjectAttendance("Computer Networks", "CS303", 32, 20),
            SubjectAttendance("Software Engineering", "CS304", 38, 37)
        )

        // 2. Create and set up the adapter
        val attendanceAdapter = AttendanceAdapter(attendanceData)
        binding.recyclerViewAttendance.apply {
            layoutManager = LinearLayoutManager(context)
            adapter = attendanceAdapter
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}