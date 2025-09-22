package com.sih.alt_f4.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import com.sih.alt_f4.adapters.ChatAdapter
import com.sih.alt_f4.databinding.FragmentCounsellingBinding
import com.sih.alt_f4.models.ChatMessage
import com.sih.alt_f4.network.DeepSeekChatRequest
import com.sih.alt_f4.network.DeepSeekMessage
import com.sih.alt_f4.network.RetrofitClient
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class CounsellingFragment : Fragment() {

    private var _binding: FragmentCounsellingBinding? = null
    private val binding get() = _binding!!

    private lateinit var chatAdapter: ChatAdapter
    private val chatMessages = mutableListOf<ChatMessage>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCounsellingBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupRecyclerView()
        setupInitialMessage()

        binding.buttonSend.setOnClickListener {
            val userMessage = binding.editTextMessage.text.toString().trim()
            if (userMessage.isNotEmpty()) {
                sendMessage(userMessage)
                binding.editTextMessage.text.clear()
            }
        }
    }

    private fun setupRecyclerView() {
        chatAdapter = ChatAdapter(chatMessages)
        binding.recyclerViewChat.apply {
            layoutManager = LinearLayoutManager(context)
            adapter = chatAdapter
        }
    }

    private fun setupInitialMessage() {
        if (chatMessages.isEmpty()) {
            val welcomeMessage = ChatMessage(
                "Hello! I am your AI Mentor Mitra powered by DeepSeek. How can I assist you today?",
                getCurrentTimestamp(),
                isFromAI = true
            )
            chatMessages.add(welcomeMessage)
            chatAdapter.notifyItemInserted(0)
        }
    }

    private fun sendMessage(messageText: String) {
        val userMessage = ChatMessage(messageText, getCurrentTimestamp(), isFromAI = false)
        chatMessages.add(userMessage)
        chatAdapter.notifyItemInserted(chatMessages.size - 1)
        binding.recyclerViewChat.scrollToPosition(chatMessages.size - 1)
        getRealAiReply(messageText)
    }

    private fun getRealAiReply(userMessage: String) {
        val typingIndicator = ChatMessage("...", getCurrentTimestamp(), isFromAI = true, isTyping = true)
        chatMessages.add(typingIndicator)
        val typingPosition = chatMessages.size - 1
        chatAdapter.notifyItemInserted(typingPosition)
        binding.recyclerViewChat.scrollToPosition(typingPosition)

        lifecycleScope.launch(Dispatchers.IO) {
            try {
                // Use DeepSeekChatRequest instead of ChatRequest
                val request = DeepSeekChatRequest(
                    model = "deepseek-chat",
                    messages = listOf(
                        DeepSeekMessage("system", "You are Mentor Mitra, a helpful and empathetic AI counselor. Provide supportive, professional guidance."),
                        DeepSeekMessage("user", userMessage)
                    ),
                    temperature = 0.7,
                    max_tokens = 500
                )

                val response = RetrofitClient.deepSeekApi.sendMessage(request).execute()

                withContext(Dispatchers.Main) {
                    chatMessages.removeAt(typingPosition)
                    chatAdapter.notifyItemRemoved(typingPosition)

                    if (response.isSuccessful && response.body() != null) {
                        val aiResponse = response.body()!!.choices.firstOrNull()?.message?.content
                            ?: "Sorry, I can't process that right now. Please try again."
                        val aiReply = ChatMessage(aiResponse, getCurrentTimestamp(), true)
                        chatMessages.add(aiReply)
                        chatAdapter.notifyItemInserted(chatMessages.size - 1)
                        binding.recyclerViewChat.scrollToPosition(chatMessages.size - 1)
                    } else {
                        val errorMessage = when (response.code()) {
                            401 -> "Authentication error. Please check your API key."
                            429 -> "Rate limit exceeded. Please wait a moment."
                            500 -> "Server error. Please try again later."
                            else -> "Error: ${response.code()} - ${response.errorBody()?.string()}"
                        }
                        val errorReply = ChatMessage(errorMessage, getCurrentTimestamp(), true)
                        chatMessages.add(errorReply)
                        chatAdapter.notifyItemInserted(chatMessages.size - 1)
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    if (typingPosition < chatMessages.size && chatMessages[typingPosition].isTyping) {
                        chatMessages.removeAt(typingPosition)
                        chatAdapter.notifyItemRemoved(typingPosition)
                    }
                    val errorMessage = when (e) {
                        is java.net.SocketTimeoutException -> "Request timeout. Please check your connection."
                        is java.net.UnknownHostException -> "No internet connection."
                        else -> "Error: ${e.localizedMessage ?: "Unknown error"}"
                    }
                    val errorReply = ChatMessage(errorMessage, getCurrentTimestamp(), true)
                    chatMessages.add(errorReply)
                    chatAdapter.notifyItemInserted(chatMessages.size - 1)
                    binding.recyclerViewChat.scrollToPosition(chatMessages.size - 1)
                }
            }
        }
    }

    private fun getCurrentTimestamp(): String {
        return SimpleDateFormat("hh:mm a", Locale.getDefault()).format(Date())
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}