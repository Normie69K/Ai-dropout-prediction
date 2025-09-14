# Alt-F4: Student Success Platform (Prototype)

**Alt-F4** is a prototype Android application that demonstrates the structure and workflow of a student early-warning system. This app is built to showcase the **UI flow, role-based dashboards, and explainable risk alerts** without any backend or database integration.

-----

## 📸 Screenshots

| Login | Dashboard | Marks Screen |
| :---: | :---: | :---: |
|  |  |  |
| **Counselling Chat** | **Study Strategy** | **Attendance** |
|  |  |  |

-----

## 📌 Key Features (Prototype Scope)

- **Static Role-Based Screens**: Navigate through pre-built screens for Login, Dashboard, Counselling, Study Strategy, Marks, and Attendance. The focus is on UI and navigation flow, not real user accounts.
- **Risk Visualization (UI Only)**: See predefined Green, Amber, and Red risk indicators in the UI to simulate student alerts. No real-time data processing is involved.
- **Mocked Counselling Chat**: Experience a simulated AI conversation with static or delayed responses to demonstrate the chat interface.
- **Static Study Strategy**: View pre-made cards showing study tips, important topics, and targeted strategies.
- **Modern UI/UX**: Built with a clean interface featuring a Glassmorphism `BottomNavigationView` (Android 12+), Light/Dark mode support, and smooth fragment transitions using Jetpack Navigation.

-----

## 🛠️ Tech Stack & Libraries

* **Language:** **Kotlin**
* **Architecture:** Single-Activity, Multi-Fragment
* **UI Toolkit:** Android Views + **Material Design 3**
* **Core Libraries:**
    * Jetpack Navigation (for navigation and animations)
    * Jetpack View Binding
    * RecyclerView
    * AndroidX Fragment + AppCompat

-----

## ⚙️ Setup & Installation

### Prerequisites

* **Android Studio** (latest stable version)
* **JDK 17+**
* **Android SDK 24+** (minimum)

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Normie69K/Ai-dropout-prediction/tree/`Alt-F4_app`
    cd Alt-F4_app
    ```
2.  **Open the project** in Android Studio.
3.  Wait for the **Gradle sync** to complete successfully.
4.  **Run the application** on an emulator or a physical device using **Run → Run ‘app’**.

-----

## 📖 How to Use (Prototype)

1.  **Launch the App**: Opens the login screen (UI only, no actual authentication).
2.  **Navigate the Dashboard**: View static sample cards for attendance, marks, and risk alerts.
3.  **Check Marks/Attendance**: Tap to see lists with mocked subject data.
4.  **Use Counselling Chat**: Type a message, and the app will show a simulated AI response.
5.  **View Study Strategy**: Tap on a risk alert to see static study tips.

-----

## 🚧 Limitations (Prototype)

* **No Backend Integration**: The app does not connect to any server, database, or API.
* **No Real Authentication**: User roles and login are for demonstration purposes only.
* **No Dynamic Data**: All data (marks, attendance, etc.) is mocked and hardcoded. Excel/CSV uploads are not functional.

-----

## 🔮 Future Roadmap

### Backend & Data

- **Full Backend Integration**: Connect to a live server/database to store and retrieve real student data via REST APIs.
- **Data Upload & Parsing**: Implement Excel/CSV uploads for attendance, marks, and fees with validation and error handling.

### Authentication & Roles

- **Secure Authentication**: Implement secure login (JWT, Firebase Auth) with distinct roles: Super Admin, HOD, Mentor, Advisor, and Student.
- **Role-Based Access Control (RBAC)**: Ensure users can only access features relevant to their role.

### Core Logic & AI

- **Real Risk Engine**: Develop a rule-based engine to trigger alerts based on thresholds for attendance, marks, and fee payments.
- **Explainable AI**: Enhance alerts with human-readable explanations for why a student is flagged.
- **AI Upgrade**: Integrate ML models for dropout prediction, personalized study recommendations, and predictive analytics.

### Features & Dashboards

- **Advanced Dashboards**:
    - **HOD**: Department Health Index, performance heatmaps.
    - **Mentors**: Assigned student lists, private counseling notes, and escalation tools.
    - **Students**: A personal "Health Card" to track their academic timeline.
- **Notifications**: Implement push notifications for critical alerts to students, parents, and mentors, with future integration for SMS/Email/WhatsApp.