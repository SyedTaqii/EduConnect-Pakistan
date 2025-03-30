// src/pages/tutor/ProfilePage.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [form, setForm] = useState({
        tutorId: '',
        name: '',
        bio: '',
        subjects: '',
        hourlyRate: '',
        availability: '',
        teachingType: '',
        pricePerSession: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('/tutor/sessions'); // workaround to get tutorId
                if (res.data.length > 0) {
                    setForm(prev => ({
                        ...prev,
                        tutorId: res.data[0].tutor,
                        name: user.name,
                    }));
                }
            } catch (err) {
                console.error('Error loading tutor profile:', err);
            }
        };
        fetchProfile();
    }, [user]);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const data = {
                ...form,
                subjects: form.subjects.split(',').map(s => s.trim()),
                availability: [{ day: 'Monday', times: ['10:00', '14:00'] }],
                hourlyRate: parseInt(form.hourlyRate),
                pricePerSession: parseInt(form.pricePerSession)
            };
            await axios.put('/tutor/profile', data);
            setMessage('Profile updated successfully!');
        } catch (err) {
            setMessage('Failed to update profile.');
        }
    };

    return (
        <div className="page">
            <h2>Update Tutor Profile</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} />
                <input name="subjects" placeholder="Subjects (comma-separated)" value={form.subjects} onChange={handleChange} required />
                <input name="hourlyRate" placeholder="Hourly Rate" type="number" value={form.hourlyRate} onChange={handleChange} required />
                <input name="teachingType" placeholder="Teaching Type (Online/In-Person)" value={form.teachingType} onChange={handleChange} required />
                <input name="pricePerSession" placeholder="Price Per Session" type="number" value={form.pricePerSession} onChange={handleChange} required />
                <button type="submit">Save Changes</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ProfilePage;
