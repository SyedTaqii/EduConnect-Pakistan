import React from 'react';
import { Link } from 'react-router-dom';

const TutorCard = ({ tutor, onWishlistClick }) => {
    return (
        <div className="tutor-card">
            <h3>{tutor.userId?.name}</h3>
            <p>{tutor.subjects?.join(', ')}</p>
            <p>City: {tutor.city}</p>
            <p>Rate: Rs. {tutor.rate}/hr</p>
            <p>Rating: ⭐ {tutor.rating}</p>

            <Link to={`/book/${tutor.userId?._id}`}>Book</Link>
            <button onClick={() => onWishlistClick(tutor._id)}>Add to Wishlist</button>
        </div>
    );
};

export default TutorCard;
