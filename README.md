# EduMeet - Student-Teacher Booking Appointment System

**EduMeet** is a modern, responsive web application designed to bridge the gap between students and teachers through an intuitive appointment scheduling interface. 


## 🚀 Live Demo
Vercel: [edu-meet-gamma.vercel.app](https://edu-meet-gamma.vercel.app)

## 🎥 Project Demo Video

 **[Watch Demo Video](https://drive.google.com/file/d/18-CNowlFDj9Qg18RctPSQ1ZWdaA1zyDh/view?usp=sharing)**

## 📖 Project Overview
EduMeet provides a centralized platform for educational institutions to manage student-teacher interactions. It simplifies the process of finding educators, checking their availability, and booking sessions, ensuring a seamless experience for both parties.



## 🔐 Default Admin Credentials

> **Note:**
> ⚠️ These credentials are for testing purposes only.
>  Only admin credentials are provided above for testing purposes
> **Students** and **Teachers** can register themselves using the registration form
- **Role:** Admin  
- **Email:** `admin@gmail.com`  
- **Password:** `admin4545@#`


## 🛠️ Technologies Used
- **Frontend:** 
  - HTML5 (Semantic Structure)
  - CSS3 (Vanilla CSS, Responsive Design, Custom Grid System)
  - JavaScript (ES6 Modules, Dynamic UI Rendering)
- **Backend & Services:**
  - **Firebase Authentication:** Secure login and role-based access control.
  - **Firebase Firestore:** Real-time NoSQL database for users and appointments.
- **Deployment:**
  - Vercel (Primary Hosting)
  - Firebase Hosting (Alternative)
- **Typography:** Inter (via Google Fonts)


## 🔹 Workflow of the System

- Users register and log in through Firebase Authentication.
- Admin verifies and approves student registrations.
- Admin adds and manages teacher profiles.
- Teachers set their availability and appointment schedule.
- Students search for teachers based on subject or department.
- Students book appointments according to available time slots.
- Teachers approve or reject appointment requests.
- Students can send messages specifying the purpose of the meeting.
- Appointment status is updated in real-time using Firestore.

## ✨ Features

### 🔑 Authentication
- Role-based registration and login system (Admin, Teacher, Student)
- Secure session management using Firebase Auth and local storage.
- Password-protected access with proper authentication flows.

### 🛡️ Admin Features
- **Dashboard:** Real-time overview of system statistics and user management.
- **Teacher Management:** Approve and manage existing teacher profiles.
- **Student Approvals:** Review and approve student registration requests.
- **Message Management:** Handle contact messages and user inquiries.
- **Access Control:** Oversee user roles and system integrity.

### 👨‍🏫 Teacher Features
- **Dashboard:** Real-time view of upcoming and pending appointments.
- **Appointment Management:** Approve or reject student requests with meeting link integration.
- **Availability Scheduling:** Set and manage custom time slots for student bookings.
- **Profile Settings:** Customize professional details, subjects, and experience.
- **Session History:** Complete view of all past and upcoming appointments.

### 🎓 Student Features
- **Teacher Search & Browse:** Find teachers by name, subject, or department with real-time filtering.
- **Detailed Profiles:** View teacher bios, expertise, ratings, and availability.
- **Instant Booking:** Choose available slots and book appointments instantly.
- **Appointment Tracking:** Monitor status of requests (Pending, Approved, Completed, Rejected).
- **Rating System:** Rate teachers after completed sessions.



## 🔥 Firebase Usage
- **Real-time Synchronization:** Appointments and profile updates reflect instantly across dashboards.
- **Scalable Database:** Firestore handles complex relationships between students, teachers, and schedules.
- **Secure Auth:** Direct integration with Firebase Auth ensures user data protection.
- **Cloud Functions:** Server-side logic for secure operations.

## 💻 How to Run Project

### 1. Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local server environment (required for ES6 modules)
- Node.js (optional, for local development server)

### 2. Setup
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```
2. **Navigate to project directory:**
   ```bash
   cd Student-Teacher_Booking Appointment
   ```

### 3. Execution
- **Using VS Code Live Server (Recommended):**
  - Open the project in VS Code
  - Install "Live Server" extension
  - Right-click `public/index.html` and select **"Open with Live Server"**
- **Using Node.js:**
  ```bash
  cd public
  npx serve
  ```
- **Using Python:**
  ```bash
  cd public
  python -m http.server 8000
  ```

## 📂 Project Structure
```text
Student-Teacher_Booking Appointment/
├── public/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── style.css          # Main stylesheet with responsive design
│   │   │   └── variables.css      # CSS variables and theme definitions
│   │   ├── js/
│   │   │   ├── utils.js           # Firebase utilities and authentication
│   │   │   ├── data.js            # Mock data and helper functions
│   │   │   └── student.js         # Student-specific functionality
│   │   └── img/                   # Images and assets
│   ├── auth/
│   │   ├── login.html             # Login page
│   │   └── register.html          # Registration page
│   ├── roles/
│   │   ├── admin/
│   │   │   ├── admin.html         # Admin dashboard
│   │   │   └── manage-teacher.html # Manage existing teachers
│   │   ├── teacher/
│   │   │   ├── teacher.html       # Teacher dashboard
│   │   │   ├── all-appointments.html # View all appointments
│   │   │   ├── approve-appointment.html # Manage requests
│   │   │   ├── schedule-appointment.html # Create appointments
│   │   │   └── profile-settings.html # Teacher profile
│   │   └── student/
│   │       ├── student.html       # Student dashboard
│   │       ├── search-teacher.html # Find teachers
│   │       ├── book-appointment.html # Book appointments
│   │       ├── view-appointments.html # Appointment history
│   │       └── view-teacher.html   # Teacher details
│   ├── about.html                 # About page
│   ├── contact.html               # Contact page
│   ├── privacy.html               # Privacy policy
│   ├── terms.html                 # Terms of service
│   └── index.html                 # Landing page
├── firebase.json                  # Firebase configuration
├── vercel.json                    # Vercel deployment settings
└── README.md                      # This file
```

## 🚀 Deployment
- **Vercel:** Automatic deployment from Git repository
- **Firebase Hosting:** Alternative hosting option
- **Static Hosting:** Can be deployed on any static hosting service



## 📞 Support
For issues, questions, or support, please:
- Contact through the project's contact form



&copy; 2026 EduMeet. Built with ❤️ for better education.
