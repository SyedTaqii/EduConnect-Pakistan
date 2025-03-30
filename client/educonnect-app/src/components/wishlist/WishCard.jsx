import React from 'react';

const WishlistCard = ({ tutor, onRemove }) => {
    return (
        <div className="wishlist-card">
            <h4>{tutor.name}</h4>
            <p>Email: {tutor.email}</p>
            <button onClick={() => onRemove(tutor._id)}>Remove</button>
        </div>
    );
};

export default WishlistCard;
