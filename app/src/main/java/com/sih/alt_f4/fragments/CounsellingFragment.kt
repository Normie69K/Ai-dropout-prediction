package com.sih.alt_f4.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.sih.alt_f4.adapters.ChatAdapter // <-- The import that fixes the error
import com.sih.alt_f4.databinding.FragmentCounsellingBinding
import com.sih.alt_f4.models.ChatMessage

class CounsellingFragment : Fragment() {

    private var _binding: FragmentCounsellingBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCounsellingBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // 1. Create temporary chat data
        val chatData = listOf(
            ChatMessage(
                message = "Hello! I'm your AI counselor. How can I assist with your studies today?",
                timestamp = "07:26 PM", // Updated time
                isFromAI = true
            )
        )

        // 2. This is the line (39) where the error occurred.
        // It now works because of the import statement.
        val chatAdapter = ChatAdapter(chatData)

        // 3. Set up the RecyclerView
        binding.recyclerViewChat.apply {
            layoutManager = LinearLayoutManager(context)
            adapter = chatAdapter
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}