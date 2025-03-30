import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import BookingForm from '../../components/sessions/BookingForm';

const BookSession = () => {
    const { id } = useParams();
    const [tutor, setTutor] = useState(null);

    useEffect(() => {
        const fetchTutor = async () => {
            try {
                const res = await api.get('/student/tutors', { params: { tutorId: id } });
                setTutor(res.data[0]); // assuming filtered result
            } catch {
                alert('Failed to load tutor');
            }
        };
        fetchTutor();
    }, [id]);

    const handleBooking = async (data) => {
        try {
            await api.post('/student/book-session', data);
            alert('Session booked successfully!');
        } catch (err) {
            alert(err.response?.data?.message || 'Booking failed');
        }
    };

    return (
        <div>
            {tutor ? (
                <BookingForm tutor={tutor} onBook={handleBooking} />
            ) : (
                <p>Loading tutor info...</p>
            )}
        </div>
    );
};

export default BookSession;
