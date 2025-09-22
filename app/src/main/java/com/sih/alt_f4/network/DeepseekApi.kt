package com.sih.alt_f4.network

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface DeepSeekApi {
    @POST("chat/completions")
    fun sendMessage(@Body request: DeepSeekChatRequest): Call<DeepSeekChatResponse>
}