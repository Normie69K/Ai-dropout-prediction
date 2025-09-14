package com.sih.alt_f4

import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.WindowManager
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.NavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.NavigationUI
import com.sih.alt_f4.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var navController: NavController

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        enableBlurEffect()
        binding.bottomNavigation.setBackgroundResource(R.drawable.bg_glass_effect)

        val navHostFragment = supportFragmentManager
            .findFragmentById(R.id.nav_host_fragment) as NavHostFragment
        navController = navHostFragment.navController

        NavigationUI.setupWithNavController(binding.bottomNavigation, navController)

        setupNavigationVisibility()
        // The call to setupToolbarClicks() has been removed.
    }

    // The setupToolbarClicks() and showPopupMenu() functions have been removed.

    private fun setupNavigationVisibility() {
        navController.addOnDestinationChangedListener { _, destination, _ ->
            when (destination.id) {
                R.id.loginFragment -> {
                    binding.appBarLayout.visibility = View.VISIBLE
                    binding.bottomNavigation.visibility = View.GONE
                    binding.toolbarLayout.apply {
                        toolbarGenericTitle.visibility = View.VISIBLE
                        cardInitials.visibility = View.GONE
                        toolbarTitle.visibility = View.GONE
                        toolbarSubtitle.visibility = View.GONE
                    }
                }
                else -> {
                    binding.appBarLayout.visibility = View.VISIBLE
                    binding.bottomNavigation.visibility = View.VISIBLE
                    binding.toolbarLayout.apply {
                        toolbarGenericTitle.visibility = View.GONE
                        cardInitials.visibility = View.VISIBLE
                        toolbarTitle.visibility = View.VISIBLE
                        toolbarSubtitle.visibility = View.VISIBLE
                    }
                }
            }
        }
    }

    private fun enableBlurEffect() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            window.setBackgroundBlurRadius(50)
            window.attributes.flags = window.attributes.flags or
                    WindowManager.LayoutParams.FLAG_BLUR_BEHIND
        }
    }
}