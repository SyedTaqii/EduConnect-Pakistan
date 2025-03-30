import React, { useEffect, useState } from 'react';
import FilterBar from '../../components/tutors/FilterBar';
import TutorCard from '../../components/tutors/TutorCard';
import api from '../../utils/api';

const StudentHome = () => {
    const [filters, setFilters] = useState({
        subject: '',
        city: '',
        minRate: '',
        maxRate: '',
        minRating: ''
    });

    const [tutors, setTutors] = useState([]);

    const fetchTutors = async () => {
        try {
            const res = await api.get('/student/tutors', { params: filters });
            setTutors(res.data);
        } catch (err) {
            console.error('Error fetching tutors', err);
        }
    };

    useEffect(() => {
        fetchTutors();
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleAddToWishlist = async (tutorId) => {
        try {
            await api.post('/student/wishlist/add', { tutorId });
            alert('Added to wishlist');
        } catch {
            alert('Failed to add');
        }
    };

    return (
        <div>
            <h2>Search Tutors</h2>
            <FilterBar filters={filters} onChange={handleFilterChange} />
            <div className="tutor-list">
                {tutors.map((tutor) => (
                    <TutorCard key={tutor._id} tutor={tutor} onWishlistClick={handleAddToWishlist} />
                ))}
            </div>
        </div>
    );
};

export default StudentHome;
