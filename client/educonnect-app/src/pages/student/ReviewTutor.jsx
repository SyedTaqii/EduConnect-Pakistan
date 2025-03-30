import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import ReviewForm from '../../components/reviews/ReviewForm';
import ReviewList from '../../components/reviews/ReviewList';

const ReviewTutor = () => {
    const { sessionId } = useParams();
    const [session, setSession] = useState(null);
    const [reviews, setReviews] = useState([]);

    const loadData = async () => {
        try {
            const s = await api.get('/student/my-sessions');
            const match = s.data.find((s) => s._id === sessionId && s.status === 'completed');
            if (!match) return alert('No eligible session found');
            setSession(match);

            const r = await api.get(`/student/tutor-reviews/${match.tutorId._id}`);
            setReviews(r.data);
        } catch {
            alert('Failed to load data');
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async (reviewData) => {
        try {
            await api.post('/student/submit-review', reviewData);
            alert('Review submitted');
            loadData();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to submit review');
        }
    };

    return session ? (
        <div>
            <h3>Review {session.tutorId.name}</h3>
            <ReviewForm sessionId={sessionId} onSubmit={handleSubmit} />
            <ReviewList reviews={reviews} />
        </div>
    ) : (
        <p>Loading session info...</p>
    );
};

export default ReviewTutor;
