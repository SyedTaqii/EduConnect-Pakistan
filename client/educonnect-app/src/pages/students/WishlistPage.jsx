// src/pages/students/WishlistPage.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);

    const fetchWishlist = async () => {
        try {
            const res = await axios.get('/student/wishlist');
            setWishlist(res.data.tutors || []);
        } catch (err) {
            console.error('Failed to load wishlist:', err);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    return (
        <div className="page">
            <h2>My Wishlist</h2>

            {wishlist.length === 0 ? (
                <p>No tutors saved to wishlist.</p>
            ) : (
                <div className="tutor-list">
                    {wishlist.map(tutor => (
                        <div key={tutor._id} className="tutor-card">
                            <h3>{tutor.name}</h3>
                            <p>Subjects: {tutor.subjects?.join(', ')}</p>
                            <p>Rate: Rs {tutor.hourlyRate}</p>
                            <p>Rating: {tutor.rating || 'Not rated yet'}</p>
                            <p>Teaching: {tutor.teachingType}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
