# EduConnect Pakistan — Backend (Express + MongoDB)

This is the backend API for EduConnect Pakistan.

## 🔧 Tech Used

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Role-based middleware

## 🚀 Setup Instructions

1. Go to the server folder:
cd server npm install npm run dev


2. Runs on: http://localhost:5000

## 📁 Key Structure

- /models → User, Tutor, Session, Review, Wishlist, Verification
- /controllers → Logic per user role
- /routes → API routes per role
- /middleware → Auth and role checks

## 📌 Features by Role

### 👨‍🎓 Student
- Register/login
- Book sessions
- Manage bookings
- Reviews and wishlist

### 👨‍🏫 Tutor
- Profile and availability
- Session control
- Earnings tracking

### 👮 Admin
- View and update tutor verification
- Platform stats (subjects, cities, completion rate, growth)
