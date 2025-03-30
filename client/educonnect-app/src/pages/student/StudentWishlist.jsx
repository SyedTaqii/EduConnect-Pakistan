import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import WishlistCard from '../../components/wishlist/WishCard';

const StudentWishlist = () => {
    const [tutors, setTutors] = useState([]);

    const fetchWishlist = async () => {
        try {
            const res = await api.get('/student/wishlist');
            setTutors(res.data.tutors);
        } catch {
            alert('Failed to fetch wishlist');
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const handleRemove = async (tutorId) => {
        try {
            await api.post('/student/wishlist/remove', { tutorId });
            fetchWishlist();
        } catch {
            alert('Failed to remove');
        }
    };

    return (
        <div>
            <h2>My Wishlist</h2>
            {tutors.length === 0 ? (
                <p>Your wishlist is empty</p>
            ) : (
                tutors.map((t) => (
                    <WishlistCard key={t._id} tutor={t} onRemove={handleRemove} />
                ))
            )}
            <p>Total Tutors: {tutors.length}</p>
        </div>
    );
};

export default StudentWishlist;
