// src/pages/tutor/SessionsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';

const SessionsPage = () => {
    const [sessions, setSessions] = useState([]);

    const fetchSessions = async () => {
        try {
            const res = await axios.get('/tutor/sessions');
            setSessions(res.data);
        } catch (err) {
            console.error('Error fetching sessions:', err);
        }
    };

    const handleAction = async (id, action) => {
        try {
            await axios.put(`/tutor/sessions/${action}/${id}`);
            fetchSessions();
        } catch (err) {
            console.error(`Error on ${action}:`, err);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    return (
        <div className="page">
            <h2>My Sessions</h2>
            {sessions.length === 0 ? (
                <p>No sessions found.</p>
            ) : (
                sessions.map(session => (
                    <div key={session._id} className="session-card">
                        <p><strong>Subject:</strong> {session.subject}</p>
                        <p><strong>Student:</strong> {session.student}</p>
                        <p><strong>Date:</strong> {new Date(session.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {session.time}</p>
                        <p><strong>Status:</strong> {session.status}</p>

                        {session.status === 'pending' && (
                            <div>
                                <button onClick={() => handleAction(session._id, 'accept')}>Accept</button>
                                <button onClick={() => handleAction(session._id, 'reject')}>Reject</button>
                            </div>
                        )}

                        {session.status === 'accepted' && (
                            <button onClick={() => handleAction(session._id, 'complete')}>Mark Completed</button>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default SessionsPage;