import React, { useState } from 'react';

const ReviewForm = ({ sessionId, onSubmit }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!rating || rating < 1 || rating > 5) return alert('Invalid rating');
        onSubmit({ sessionId, rating, comment });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4>Submit Review</h4>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
                ))}
            </select>
            <textarea
                placeholder="Write your feedback..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;
