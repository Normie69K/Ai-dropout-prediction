package com.sih.alt_f4.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import androidx.viewbinding.ViewBinding
import com.sih.alt_f4.databinding.ItemChatBubbleAiBinding
import com.sih.alt_f4.databinding.ItemChatBubbleUserBinding
import com.sih.alt_f4.models.ChatMessage

private const val VIEW_TYPE_AI = 1
private const val VIEW_TYPE_USER = 2

class ChatAdapter(private val chatMessages: List<ChatMessage>) :
    RecyclerView.Adapter<ChatAdapter.MessageViewHolder>() {

    sealed class MessageViewHolder(binding: ViewBinding) : RecyclerView.ViewHolder(binding.root) {
        class AiMessageViewHolder(val binding: ItemChatBubbleAiBinding) : MessageViewHolder(binding)
        class UserMessageViewHolder(val binding: ItemChatBubbleUserBinding) : MessageViewHolder(binding)
    }

    override fun getItemViewType(position: Int): Int {
        return if (chatMessages[position].isFromAI) VIEW_TYPE_AI else VIEW_TYPE_USER
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MessageViewHolder {
        return if (viewType == VIEW_TYPE_AI) {
            val binding = ItemChatBubbleAiBinding.inflate(LayoutInflater.from(parent.context), parent, false)
            MessageViewHolder.AiMessageViewHolder(binding)
        } else {
            val binding = ItemChatBubbleUserBinding.inflate(LayoutInflater.from(parent.context), parent, false)
            MessageViewHolder.UserMessageViewHolder(binding)
        }
    }

    override fun onBindViewHolder(holder: MessageViewHolder, position: Int) {
        val message = chatMessages[position]
        when (holder) {
            is MessageViewHolder.AiMessageViewHolder -> {
                holder.binding.aiMessageText.text = message.message
                holder.binding.aiMessageTimestamp.text = message.timestamp
            }
            is MessageViewHolder.UserMessageViewHolder -> {
                holder.binding.userMessageText.text = message.message
            }
        }
    }

    override fun getItemCount() = chatMessages.size
}