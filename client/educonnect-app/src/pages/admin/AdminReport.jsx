import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const AdminReports = () => {
    const [subjects, setSubjects] = useState([]);
    const [cities, setCities] = useState([]);
    const [sessions, setSessions] = useState({});
    const [growth, setGrowth] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const [sub, city, sess, grow] = await Promise.all([
                    api.get('/admin/reports/subjects'),
                    api.get('/admin/reports/cities'),
                    api.get('/admin/reports/sessions'),
                    api.get('/admin/reports/users')
                ]);
                setSubjects(sub.data);
                setCities(city.data);
                setSessions(sess.data);
                setGrowth(grow.data);
            } catch {
                alert('Failed to load reports');
            }
        };
        fetchReports();
    }, []);

    return (
        <div>
            <h2>Platform Reports</h2>

            <section>
                <h3>Popular Subjects</h3>
                {subjects.map((s) => (
                    <p key={s.subject}>{s.subject}: {s.count}</p>
                ))}
            </section>

            <section>
                <h3>City Distribution</h3>
                {cities.map((c) => (
                    <p key={c.city}>{c.city}: {c.count}</p>
                ))}
            </section>

            <section>
                <h3>Session Stats</h3>
                <p>Total: {sessions.total}</p>
                <p>Completed: {sessions.completed}</p>
                <p>Cancelled: {sessions.cancelled}</p>
                <p>Completion Rate: {sessions.completionRate}</p>
            </section>

            <section>
                <h3>User Growth</h3>
                {growth.map((g) => (
                    <p key={g.date}>{g.date}: {g.count} users</p>
                ))}
            </section>
        </div>
    );
};

export default AdminReports;
