# EduConnect Pakistan – Frontend

This is the frontend for EduConnect Pakistan, a role-based tutoring platform built with Vite + React. It supports three user roles: Student, Tutor, and Admin — each with their own dashboard and features.

---

## Tech Stack

- React (with Vite)
- Axios (for API integration)
- React Router DOM (routing)
- Context API (auth handling)
- Simple custom CSS (light theme)

---

## Folder Structure

src/
├── assets/
│   └── css/
├── components/
│   ├── common/
│   ├── sessions/
│   ├── tutors/
│   └── wishlist/
├── context/
├── pages/
│   ├── admin/
│   ├── auth/
│   ├── students/
│   └── tutor/
├── routes/
├── utils/

---

## Getting Started

1. Clone the frontend project

   git clone https://github.com/your-username/educonnect-frontend.git
   cd educonnect-frontend

2. Install dependencies

   npm install

3. Run the app

   npm run dev

- App will be available at: http://localhost:5173
- Ensure the backend server is running at: http://localhost:5000

---

## Authentication Flow

- JWT token is stored in localStorage
- AuthContext manages login/logout state
- Axios includes the token for all secure requests

---

## Role-Based Routes

Student:        /student/dashboard
Tutor:          /tutor/dashboard
Admin:          /admin/dashboard

All routes are protected and shown based on user role

---

## Axios Config

In src/utils/axios.js

  const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true
  });

---

## Styling

- Global CSS: src/assets/css/global.css
- Clean light-themed layout
- Responsive forms and cards
- Styled Navbar and Buttons

---

## Features by Role

STUDENT:
- Register / Login
- Search tutors with filters
- Book, reschedule, cancel sessions
- Leave reviews
- Manage wishlist
- Update profile

TUTOR:
- Register / Login
- View assigned sessions
- Accept / Reject / Complete sessions
- Update profile
- View earnings

ADMIN:
- Login only (no registration)
- View pending tutor verifications
- Approve / Reject tutors with comments
- View verification stats
- View platform reports
- Export reports
- View & delete users

---

## Final Notes

- Fully integrated with backend routes
- Token-based secure auth
- Mobile-friendly responsive layout
- Reusable components for tutor cards, sessions, etc.

---

Project by: EduConnect Pakistan | Web Engineering Assignment – FAST NUCES
