package com.sih.alt_f4

import android.content.Context
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.WindowManager
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
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

        hideSystemBars()

        val navHostFragment = supportFragmentManager
            .findFragmentById(R.id.nav_host_fragment) as NavHostFragment
        navController = navHostFragment.navController

        // Checks if the user is already logged in to decide the starting screen
        checkLoginState()

        // Sets up the glassy/blurry navigation bar
        enableBlurEffect()
        binding.bottomNavigation.setBackgroundResource(R.drawable.bg_glass_effect)

        // Links the bottom navigation view with the navigation controller
        NavigationUI.setupWithNavController(binding.bottomNavigation, navController)

        // Sets up the logic to show/hide UI elements based on the current screen
        setupNavigationVisibility()
    }

    private fun hideSystemBars() {
        val windowInsetsController = WindowCompat.getInsetsController(window, window.decorView)
        windowInsetsController.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        windowInsetsController.hide(WindowInsetsCompat.Type.systemBars())
    }


    /**
     * Checks SharedPreferences for a login flag and sets the appropriate
     * starting screen for the app (Login or Dashboard).
     */
    private fun checkLoginState() {
        val sharedPreferences = getSharedPreferences("app_prefs", Context.MODE_PRIVATE)
        val isLoggedIn = sharedPreferences.getBoolean("is_logged_in", false)

        val navGraph = navController.navInflater.inflate(R.navigation.nav_graph)
        if (isLoggedIn) {
            navGraph.setStartDestination(R.id.main_nav_graph)
        } else {
            navGraph.setStartDestination(R.id.loginFragment)
        }
        navController.graph = navGraph
    }


    /**
     * Handles the visibility of the toolbar and bottom navigation.
     * It also switches the toolbar's content for the login screen.
     */
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
//                        iconNotifications.visibility = View.GONE
//                        iconMenu.visibility = View.GONE
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
//                        iconNotifications.visibility = View.VISIBLE
//                        iconMenu.visibility = View.VISIBLE
                    }
                }
            }
        }
    }


    /**
     * Enables the glassy blur effect on supported devices (Android 12+).
     */
    private fun enableBlurEffect() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            window.setBackgroundBlurRadius(50)
            window.attributes.flags = window.attributes.flags or
                    WindowManager.LayoutParams.FLAG_BLUR_BEHIND
        }
    }
}