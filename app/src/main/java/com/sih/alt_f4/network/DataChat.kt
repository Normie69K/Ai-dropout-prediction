package com.sih.alt_f4.network

// DeepSeek-specific data classes
data class DeepSeekChatRequest(
    val model: String = "deepseek-chat",
    val messages: List<DeepSeekMessage>,
    val temperature: Double = 0.7,
    val max_tokens: Int? = null,
    val stream: Boolean = false
)

data class DeepSeekMessage(
    val role: String,
    val content: String
)

data class DeepSeekChatResponse(
    val id: String,
    val choices: List<DeepSeekChoice>,
    val usage: DeepSeekUsage
)

data class DeepSeekChoice(
    val message: DeepSeekMessage,
    val finish_reason: String
)

data class DeepSeekUsage(
    val prompt_tokens: Int,
    val completion_tokens: Int,
    val total_tokens: Int
)