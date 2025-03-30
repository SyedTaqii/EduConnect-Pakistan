import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';

// Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Student Pages
import StudentHome from './pages/student/StudentHome';
import StudentSessions from './pages/student/StudentSession';
import StudentWishlist from './pages/student/StudentWishlist';
import BookSession from './pages/student/BookSession';
import ReviewTutor from './pages/student/ReviewTutor';

// Tutor Pages
import TutorProfile from './pages/tutor/TutorProfile';
import TutorDashboard from './pages/tutor/TutorDashboard';

// Admin Pages
import AdminVerifications from './pages/admin/AdminVerification';
import AdminReports from './pages/admin/AdminReport';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* 🔐 Default route now points to Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Student Routes */}
        <Route path="/student/home" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentHome />
          </ProtectedRoute>
        } />
        <Route path="/my-sessions" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentSessions />
          </ProtectedRoute>
        } />
        <Route path="/wishlist" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentWishlist />
          </ProtectedRoute>
        } />
        <Route path="/book/:id" element={
          <ProtectedRoute allowedRoles={['student']}>
            <BookSession />
          </ProtectedRoute>
        } />
        <Route path="/review/:sessionId" element={
          <ProtectedRoute allowedRoles={['student']}>
            <ReviewTutor />
          </ProtectedRoute>
        } />

        {/* ✅ Tutor Routes */}
        <Route path="/tutor/profile" element={
          <ProtectedRoute allowedRoles={['tutor']}>
            <TutorProfile />
          </ProtectedRoute>
        } />
        <Route path="/tutor/dashboard" element={
          <ProtectedRoute allowedRoles={['tutor']}>
            <TutorDashboard />
          </ProtectedRoute>
        } />

        {/* ✅ Admin Routes */}
        <Route path="/admin/verifications" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminVerifications />
          </ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminReports />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
