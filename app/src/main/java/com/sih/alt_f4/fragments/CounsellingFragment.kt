package com.sih.alt_f4.fragments

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.sih.alt_f4.adapters.ChatAdapter
import com.sih.alt_f4.databinding.FragmentCounsellingBinding
import com.sih.alt_f4.models.ChatMessage
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class CounsellingFragment : Fragment() {

    private var _binding: FragmentCounsellingBinding? = null
    private val binding get() = _binding!!

    private val chatMessages = mutableListOf<ChatMessage>()
    private lateinit var chatAdapter: ChatAdapter

    // TODO: Initialize the Gemini API Model here when you're ready
    // private lateinit var geminiModel: GenerativeModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCounsellingBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // TODO: Add your Gemini API key and initialize the model in this function
        // val generativeModel = GenerativeModel( ... )

        chatAdapter = ChatAdapter(chatMessages)
        binding.recyclerViewChat.apply {
            layoutManager = LinearLayoutManager(context).apply {
                stackFromEnd = true
            }
            adapter = chatAdapter
        }

        addInitialMessage()

        binding.buttonSend.setOnClickListener {
            sendMessage()
        }
    }

    private fun addInitialMessage() {
        chatMessages.add(
            ChatMessage(
                "Hello! I'm your AI counselor. How can I assist with your studies today?",
                getCurrentTimestamp(),
                isFromAI = true
            )
        )
        chatAdapter.notifyItemInserted(chatMessages.size - 1)
    }

    private fun sendMessage() {
        val messageText = binding.editTextMessage.text.toString().trim()
        if (messageText.isNotEmpty()) {
            val userMessage = ChatMessage(messageText, getCurrentTimestamp(), isFromAI = false)
            chatMessages.add(userMessage)
            chatAdapter.notifyItemInserted(chatMessages.size - 1)
            binding.recyclerViewChat.scrollToPosition(chatMessages.size - 1)

            binding.editTextMessage.setText("")

            // Call the function to get a real AI reply
            getRealAiReply(messageText)
        }
    }

    private fun getRealAiReply(userMessage: String) {
        // 1. Show a "typing..." indicator to the user (optional)

        // 2. Use the AI's SDK to send the user's message
        //    This is the space for your Gemini API call
        /*
        geminiModel.generateContent(userMessage) { result ->
            // 3. When the AI responds, get its text
            val aiResponseText = result.text ?: "Sorry, I can't answer that right now."

            // 4. Create a new ChatMessage and add it to your list
            val aiReply = ChatMessage(aiResponseText, getCurrentTimestamp(), true)
            chatMessages.add(aiReply)

            // 5. Update the UI on the main thread
            activity?.runOnUiThread {
                chatAdapter.notifyItemInserted(chatMessages.size - 1)
                binding.recyclerViewChat.scrollToPosition(chatMessages.size - 1)
                // 6. Hide the "typing..." indicator
            }
        }
        */

        // As a fallback, here is the old simulation logic so the app still works
        // You can remove this when you implement the real API call above.
        Handler(Looper.getMainLooper()).postDelayed({
            val aiReply = ChatMessage(
                "This is a simulated reply. Replace this with your Gemini API call.",
                getCurrentTimestamp(),
                isFromAI = true
            )
            chatMessages.add(aiReply)
            chatAdapter.notifyItemInserted(chatMessages.size - 1)
            binding.recyclerViewChat.scrollToPosition(chatMessages.size - 1)
        }, 1500)
    }

    private fun getCurrentTimestamp(): String {
        return SimpleDateFormat("hh:mm a", Locale.getDefault()).format(Date())
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}