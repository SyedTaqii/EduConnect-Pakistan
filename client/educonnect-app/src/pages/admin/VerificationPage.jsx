// src/pages/admin/VerificationsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';

const VerificationsPage = () => {
    const [pending, setPending] = useState([]);
    const [comment, setComment] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    const fetchPending = async () => {
        try {
            const res = await axios.get('/admin/tutors/pending-verifications');
            setPending(res.data);
        } catch (err) {
            console.error('Error loading verifications:', err);
        }
    };

    const approveTutor = async (id) => {
        try {
            await axios.put(`/admin/tutors/${id}/approve`);
            fetchPending();
        } catch (err) {
            console.error('Approval failed:', err);
        }
    };

    const rejectTutor = async (id) => {
        try {
            await axios.put(`/admin/tutors/${id}/reject`, { comments: comment });
            setSelectedId(null);
            setComment('');
            fetchPending();
        } catch (err) {
            console.error('Rejection failed:', err);
        }
    };

    useEffect(() => {
        fetchPending();
    }, []);

    return (
        <div className="page">
            <h2>Pending Tutor Verifications</h2>
            {pending.length === 0 ? (
                <p>No pending tutors to review.</p>
            ) : (
                pending.map(v => (
                    <div key={v._id} className="tutor-card">
                        <p><strong>Tutor ID:</strong> {v.tutor}</p>
                        <p><strong>Status:</strong> {v.status}</p>
                        <button onClick={() => approveTutor(v.tutor)}>Approve</button>
                        <button onClick={() => setSelectedId(v.tutor)}>Reject</button>

                        {selectedId === v.tutor && (
                            <div className="reject-form">
                                <textarea
                                    placeholder="Reason for rejection"
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    required
                                />
                                <button onClick={() => rejectTutor(v.tutor)}>Submit Rejection</button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default VerificationsPage;
