// src/components/tutors/TutorCard.jsx
import React from 'react';

const TutorCard = ({ tutor }) => {
    return (
        <div className="tutor-card">
            <h3>{tutor.name}</h3>
            <p><strong>Subjects:</strong> {tutor.subjects?.join(', ')}</p>
            <p><strong>Hourly Rate:</strong> Rs {tutor.hourlyRate}</p>
            <p><strong>Rating:</strong> {tutor.rating || 'Not rated yet'}</p>
            <p><strong>Teaching Type:</strong> {tutor.teachingType}</p>
        </div>
    );
};

export default TutorCard;
