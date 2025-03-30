import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const TutorDashboard = () => {
    const [sessions, setSessions] = useState([]);
    const [earnings, setEarnings] = useState({ totalEarnings: 0, completedSessions: 0 });

    const fetchData = async () => {
        try {
            const s = await api.get('/tutor/sessions');
            const e = await api.get('/tutor/earnings');
            setSessions(s.data);
            setEarnings(e.data);
        } catch {
            alert('Failed to load dashboard');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const respondToSession = async (id, response) => {
        try {
            await api.put(`/tutor/sessions/${id}/respond`, { response });
            fetchData();
        } catch {
            alert('Failed to respond');
        }
    };

    const markCompleted = async (id) => {
        try {
            await api.put(`/tutor/sessions/${id}/complete`);
            fetchData();
        } catch {
            alert('Failed to mark completed');
        }
    };

    return (
        <div>
            <h2>My Sessions</h2>
            <p>Total Earnings: Rs. {earnings.totalEarnings}</p>
            <p>Completed Sessions: {earnings.completedSessions}</p>

            {sessions.length === 0 ? (
                <p>No sessions found</p>
            ) : (
                sessions.map((s) => (
                    <div key={s._id} className="session-card">
                        <p><strong>{s.subject}</strong></p>
                        <p>Student: {s.studentId?.name}</p>
                        <p>Date: {s.date}, {s.time}</p>
                        <p>Type: {s.type}</p>
                        <p>Status: {s.status}</p>
                        <p>Response: {s.tutorResponse}</p>

                        {s.tutorResponse === 'pending' && (
                            <>
                                <button onClick={() => respondToSession(s._id, 'accepted')}>Accept</button>
                                <button onClick={() => respondToSession(s._id, 'declined')}>Decline</button>
                            </>
                        )}

                        {s.status === 'booked' && s.tutorResponse === 'accepted' && (
                            <button onClick={() => markCompleted(s._id)}>Mark Completed</button>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default TutorDashboard;
