// src/components/admin/VerificationCard.jsx
import { useState } from "react";

const VerificationCard = ({ request, onAction }) => {
    const [comment, setComment] = useState("");

    return (
        <div className="verification-card">
            <h4>{request.tutorName}</h4>
            <p><strong>Qualifications:</strong> {request.qualifications}</p>
            <p><strong>Subjects:</strong> {request.subjects.join(", ")}</p>
            <p><strong>Status:</strong> {request.status}</p>

            <textarea
                placeholder="Add comment (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            ></textarea>

            {request.status === "pending" && (
                <div>
                    <button onClick={() => onAction(request._id, "approved", comment)}>Approve</button>
                    <button onClick={() => onAction(request._id, "rejected", comment)}>Reject</button>
                </div>
            )}
        </div>
    );
};

export default VerificationCard;
