import React from 'react';

{
    session.status === 'completed' && (
        <Link to={`/review/${session._id}`}>Review</Link>
    )
}


const SessionCard = ({ session, onReschedule, onCancel }) => {
    return (
        <div className="session-card">
            <h4>{session.subject}</h4>
            <p>With: {session.tutorId?.name}</p>
            <p>Date: {session.date}</p>
            <p>Time: {session.time}</p>
            <p>Type: {session.type}</p>
            <p>Status: {session.status}</p>

            {session.status === 'booked' && (
                <>
                    <button onClick={() => onReschedule(session)}>Reschedule</button>
                    <button onClick={() => onCancel(session._id)}>Cancel</button>
                </>
            )}
        </div>
    );
};

export default SessionCard;
