// src/pages/tutor/DashboardPage.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const DashboardPage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="page">
            <h2>Welcome, {user?.name}!</h2>
            <p>This is your tutor dashboard.</p>
        </div>
    );
};

export default DashboardPage;
