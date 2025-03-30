// src/routes/AppRoutes.jsx
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

import DashboardStudent from '../pages/students/DashboardPage';
import SearchTutorsPage from '../pages/students/SearchTutorsPage';
import MySessionsPage from '../pages/students/MySessionsPage';
import WishlistPage from '../pages/students/WishlistPage';
import ReviewsPage from '../pages/students/ReviewsPage';
import ProfilePageStudent from '../pages/students/ProfilePage';

import DashboardTutor from '../pages/tutor/DashboardPage';
import SessionsPage from '../pages/tutor/SessionsPage';
import ProfilePageTutor from '../pages/tutor/ProfilePage';
import EarningsPage from '../pages/tutor/EarningsPage';

import DashboardAdmin from '../pages/admin/DasboardPage';
import VerificationsPage from '../pages/admin/VerificationPage';
import ReportsPage from '../pages/admin/ReportsPage';
import UsersPage from '../pages/admin/UsersPage';

import { AuthContext } from '../context/AuthContext';

const AppRoutes = () => {
    const { user } = useContext(AuthContext);

    const isStudent = user?.role === 'student';
    const isTutor = user?.role === 'tutor';
    const isAdmin = user?.role === 'admin';

    return (
        <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Student Routes */}
            {isStudent && (
                <>
                    <Route path="/student/dashboard" element={<DashboardStudent />} />
                    <Route path="/student/search-tutors" element={<SearchTutorsPage />} />
                    <Route path="/student/sessions" element={<MySessionsPage />} />
                    <Route path="/student/wishlist" element={<WishlistPage />} />
                    <Route path="/student/reviews" element={<ReviewsPage />} />
                    <Route path="/student/profile" element={<ProfilePageStudent />} />
                </>
            )}

            {/* Tutor Routes */}
            {isTutor && (
                <>
                    <Route path="/tutor/dashboard" element={<DashboardTutor />} />
                    <Route path="/tutor/sessions" element={<SessionsPage />} />
                    <Route path="/tutor/profile" element={<ProfilePageTutor />} />
                    <Route path="/tutor/earnings" element={<EarningsPage />} />
                </>
            )}

            {/* Admin Routes */}
            {isAdmin && (
                <>
                    <Route path="/admin/dashboard" element={<DashboardAdmin />} />
                    <Route path="/admin/verifications" element={<VerificationsPage />} />
                    <Route path="/admin/reports" element={<ReportsPage />} />
                    <Route path="/admin/users" element={<UsersPage />} />
                </>
            )}

            {/* Default Fallback */}
            <Route
                path="*"
                element={
                    user
                        ? <Navigate to={`/${user.role}/dashboard`} />
                        : <Navigate to="/login" />
                }
            />
        </Routes>
    );
};

export default AppRoutes;
