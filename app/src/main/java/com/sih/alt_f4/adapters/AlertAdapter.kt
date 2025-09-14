package com.sih.alt_f4.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.sih.alt_f4.databinding.ItemAcademicAlertBinding
import com.sih.alt_f4.models.AcademicAlert

class AlertAdapter(
    private val alerts: List<AcademicAlert>,
    private val onStudyPlanClick: (AcademicAlert) -> Unit
) : RecyclerView.Adapter<AlertAdapter.AlertViewHolder>() {

    inner class AlertViewHolder(val binding: ItemAcademicAlertBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AlertViewHolder {
        val binding = ItemAcademicAlertBinding.inflate(
            LayoutInflater.from(parent.context), parent, false)
        return AlertViewHolder(binding) // Correctly return the ViewHolder
    }

    override fun onBindViewHolder(holder: AlertViewHolder, position: Int) {
        val alert = alerts[position]
        holder.binding.alertTitle.text = alert.title
        holder.binding.alertDescription.text = alert.description

        holder.binding.buttonStudyPlan.setOnClickListener {
            onStudyPlanClick(alert)
        }
    }

    override fun getItemCount() = alerts.size
}