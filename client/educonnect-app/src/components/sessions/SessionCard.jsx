// src/components/sessions/SessionCard.jsx
import React from 'react';

const SessionCard = ({ session, onAccept, onReject, onComplete, onDelete }) => {
    return (
        <div className="session-card">
            <p><strong>Subject:</strong> {session.subject}</p>
            <p><strong>Student:</strong> {session.student}</p>
            <p><strong>Date:</strong> {new Date(session.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {session.time}</p>
            <p><strong>Status:</strong> {session.status}</p>

            <div className="actions">
                {onAccept && <button onClick={() => onAccept(session._id)}>Accept</button>}
                {onReject && <button onClick={() => onReject(session._id)}>Reject</button>}
                {onComplete && <button onClick={() => onComplete(session._id)}>Mark Completed</button>}
                {onDelete && <button onClick={() => onDelete(session._id)}>Cancel</button>}
            </div>
        </div>
    );
};

export default SessionCard;
