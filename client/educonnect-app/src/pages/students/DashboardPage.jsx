// src/pages/students/DashboardPage.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const DashboardPage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="page">
            <h2>Welcome, {user?.name}!</h2>
            <p>This is your student dashboard.</p>
        </div>
    );
};

export default DashboardPage;
