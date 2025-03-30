// src/pages/admin/DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';

const DashboardPage = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('/admin/tutors/stats');
                setStats(res.data);
            } catch (err) {
                console.error('Failed to load stats:', err);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="page">
            <h2>Admin Dashboard</h2>
            {!stats ? (
                <p>Loading stats...</p>
            ) : (
                <ul>
                    <li><strong>Total Verifications:</strong> {stats.totalVerifications}</li>
                    <li><strong>Pending:</strong> {stats.pendingVerifications}</li>
                    <li><strong>Approved:</strong> {stats.approvedVerifications}</li>
                    <li><strong>Rejected:</strong> {stats.rejectedVerifications}</li>
                </ul>
            )}
        </div>
    );
};

export default DashboardPage;
