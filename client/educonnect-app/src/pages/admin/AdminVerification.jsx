import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const AdminVerifications = () => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const res = await api.get('/admin/verifications');
            setRequests(res.data);
        } catch {
            alert('Failed to load verification requests');
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleDecision = async (id, status) => {
        const comment = prompt(`Comment for ${status}:`);
        if (!comment) return;

        try {
            await api.put(`/admin/verifications/${id}`, { status, comment });
            fetchRequests();
        } catch {
            alert('Failed to update request');
        }
    };

    return (
        <div>
            <h2>Tutor Verification Requests</h2>
            {requests.length === 0 ? (
                <p>No requests found</p>
            ) : (
                requests.map((req) => (
                    <div key={req._id} className="verification-card">
                        <h4>{req.tutorId.name}</h4>
                        <p>Email: {req.tutorId.email}</p>
                        <p>Status: {req.status}</p>
                        <p>Credentials: {req.credentials}</p>
                        <p>Comment: {req.comment}</p>
                        {req.status === 'pending' && (
                            <>
                                <button onClick={() => handleDecision(req._id, 'approved')}>Approve</button>
                                <button onClick={() => handleDecision(req._id, 'rejected')}>Reject</button>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default AdminVerifications;
