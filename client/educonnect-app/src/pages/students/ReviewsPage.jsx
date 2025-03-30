// src/pages/students/ReviewsPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from '../../utils/axios';
import { AuthContext } from '../../context/AuthContext';

const ReviewsPage = () => {
    const { user } = useContext(AuthContext);
    const [sessions, setSessions] = useState([]);
    const [form, setForm] = useState({
        tutorId: '',
        rating: '',
        comment: ''
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch completed sessions so student can review
        const fetchCompletedSessions = async () => {
            try {
                const res = await axios.get('/student/sessions');
                const completed = res.data.filter(s => s.status === 'completed');
                setSessions(completed);
            } catch (err) {
                console.error('Failed to load sessions:', err);
            }
        };

        fetchCompletedSessions();
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const data = {
                tutorId: form.tutorId,
                studentId: user._id,
                rating: parseInt(form.rating),
                comment: form.comment
            };
            await axios.post('/student/reviews', data);
            setMessage('Review submitted!');
            setForm({ tutorId: '', rating: '', comment: '' });
        } catch (err) {
            setMessage('Failed to submit review.');
        }
    };

    return (
        <div className="page">
            <h2>Submit a Review</h2>

            {sessions.length === 0 ? (
                <p>You have no completed sessions yet to review.</p>
            ) : (
                <form onSubmit={handleSubmit} className="auth-form">
                    <select name="tutorId" value={form.tutorId} onChange={handleChange} required>
                        <option value="">Select Tutor</option>
                        {sessions.map(session => (
                            <option key={session._id} value={session.tutor}>
                                {session.subject} with Tutor ID: {session.tutor}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        name="rating"
                        placeholder="Rating (1-5)"
                        value={form.rating}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        required
                    />
                    <textarea
                        name="comment"
                        placeholder="Comment"
                        value={form.comment}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <button type="submit">Submit Review</button>
                    {message && <p className="success">{message}</p>}
                </form>
            )}
        </div>
    );
};

export default ReviewsPage;
