// src/pages/students/MySessionsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';

const MySessionsPage = () => {
    const [sessions, setSessions] = useState([]);
    const [rescheduleId, setRescheduleId] = useState(null);
    const [form, setForm] = useState({ newDate: '', newTime: '' });

    const fetchSessions = async () => {
        try {
            const res = await axios.get('/student/sessions'); // Make sure this route exists
            setSessions(res.data);
        } catch (err) {
            console.error('Failed to fetch sessions:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/student/sessions/${id}`);
            fetchSessions();
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const handleReschedule = async (id) => {
        try {
            await axios.put(`/student/sessions/reschedule/${id}`, form);
            setRescheduleId(null);
            setForm({ newDate: '', newTime: '' });
            fetchSessions();
        } catch (err) {
            console.error('Reschedule error:', err);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    return (
        <div className="page">
            <h2>My Sessions</h2>
            {sessions.length === 0 ? (
                <p>No sessions booked yet.</p>
            ) : (
                sessions.map(session => (
                    <div key={session._id} className="session-card">
                        <p><strong>Subject:</strong> {session.subject}</p>
                        <p><strong>Date:</strong> {new Date(session.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {session.time}</p>
                        <p><strong>Status:</strong> {session.status}</p>
                        <div>
                            <button onClick={() => setRescheduleId(session._id)}>Reschedule</button>
                            <button onClick={() => handleDelete(session._id)}>Cancel</button>
                        </div>

                        {rescheduleId === session._id && (
                            <div className="reschedule-form">
                                <input
                                    type="date"
                                    name="newDate"
                                    value={form.newDate}
                                    onChange={e => setForm({ ...form, newDate: e.target.value })}
                                    required
                                />
                                <input
                                    type="time"
                                    name="newTime"
                                    value={form.newTime}
                                    onChange={e => setForm({ ...form, newTime: e.target.value })}
                                    required
                                />
                                <button onClick={() => handleReschedule(session._id)}>Submit</button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default MySessionsPage;
