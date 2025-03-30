import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import SessionCard from '../../components/sessions/SessionCard';

const StudentSessions = () => {
    const [sessions, setSessions] = useState([]);

    const loadSessions = async () => {
        try {
            const res = await api.get('/student/my-sessions');
            setSessions(res.data);
        } catch {
            alert('Failed to load sessions');
        }
    };

    useEffect(() => {
        loadSessions();
    }, []);

    const handleCancel = async (id) => {
        if (!window.confirm('Cancel this session?')) return;
        try {
            await api.delete(`/student/my-sessions/${id}`);
            alert('Session cancelled');
            loadSessions();
        } catch {
            alert('Failed to cancel');
        }
    };

    const handleReschedule = async (session) => {
        const newDate = prompt('Enter new date (YYYY-MM-DD):', session.date);
        const newTime = prompt('Enter new time:', session.time);
        if (!newDate || !newTime) return;

        try {
            await api.put(`/student/my-sessions/${session._id}`, {
                date: newDate,
                time: newTime
            });
            alert('Session rescheduled');
            loadSessions();
        } catch {
            alert('Failed to reschedule');
        }
    };

    return (
        <div>
            <h2>My Sessions</h2>
            {sessions.length === 0 ? (
                <p>No sessions found</p>
            ) : (
                sessions.map((s) => (
                    <SessionCard
                        key={s._id}
                        session={s}
                        onCancel={handleCancel}
                        onReschedule={handleReschedule}
                    />
                ))
            )}
        </div>
    );
};

export default StudentSessions;
