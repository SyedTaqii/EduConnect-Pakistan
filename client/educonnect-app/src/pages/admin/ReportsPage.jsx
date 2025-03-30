// src/pages/admin/ReportsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';

const ReportsPage = () => {
    const [reports, setReports] = useState(null);

    const fetchReports = async () => {
        try {
            const res = await axios.get('/admin/reports');
            setReports(res.data);
        } catch (err) {
            console.error('Failed to load reports:', err);
        }
    };

    const exportReports = async () => {
        try {
            const res = await axios.get('/admin/reports/export', { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'reports.json');
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            console.error('Export failed:', err);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    return (
        <div className="page">
            <h2>Reports</h2>

            {!reports ? (
                <p>Loading report data...</p>
            ) : (
                <div>
                    <h4>Popular Subjects</h4>
                    <ul>
                        {reports.popularSubjects.map((s, i) => (
                            <li key={i}>{s._id} ({s.count} sessions)</li>
                        ))}
                    </ul>

                    <p><strong>Completion Rate:</strong> {reports.completionRate.toFixed(2)}%</p>

                    <h4>Platform Usage by City</h4>
                    <ul>
                        {reports.platformUsageByCity.map((c, i) => (
                            <li key={i}>{c._id}: {c.count}</li>
                        ))}
                    </ul>

                    <h4>User Growth Over Time</h4>
                    <ul>
                        {reports.userGrowth.map((u, i) => (
                            <li key={i}>{u._id}: {u.count} users</li>
                        ))}
                    </ul>

                    <button onClick={exportReports}>Export as JSON</button>
                </div>
            )}
        </div>
    );
};

export default ReportsPage;
