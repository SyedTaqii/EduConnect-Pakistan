// src/pages/students/ProfilePage.jsx
import React, { useState, useContext } from 'react';
import axios from '../../utils/axios';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
    const { user, login } = useContext(AuthContext);

    const [form, setForm] = useState({
        studentId: user?._id || '',
        name: user?.name || '',
        email: user?.email || '',
        city: user?.city || ''
    });

    const [message, setMessage] = useState('');

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.put('/student/profile', form);
            setMessage('Profile updated successfully!');
            login(res.data.student, localStorage.getItem('token')); // update context
        } catch (err) {
            setMessage('Failed to update profile.');
        }
    };

    return (
        <div className="page">
            <h2>Update Profile</h2>

            <form onSubmit={handleSubmit} className="auth-form">
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
                <button type="submit">Save Changes</button>
                {message && <p className="success">{message}</p>}
            </form>
        </div>
    );
};

export default ProfilePage;
