// src/pages/auth/RegisterPage.jsx
import React, { useState } from 'react';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        city: '',
        role: 'student', // default
        // tutor fields:
        subjects: '',
        hourlyRate: '',
        availability: '',
        teachingType: '',
        pricePerSession: ''
    });

    const [error, setError] = useState('');

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        const data = { ...form };

        // Parse array and number fields for tutor
        if (form.role === 'tutor') {
            data.subjects = form.subjects.split(',').map(s => s.trim());
            data.availability = [{ day: 'Monday', times: ['10:00', '14:00'] }]; // Hardcoded for now
            data.hourlyRate = parseInt(form.hourlyRate);
            data.pricePerSession = parseInt(form.pricePerSession);
        }

        try {
            await axios.post('/auth/register', data);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />

                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                </select>

                {form.role === 'tutor' && (
                    <>
                        <input name="subjects" placeholder="Subjects (comma-separated)" value={form.subjects} onChange={handleChange} required />
                        <input name="hourlyRate" placeholder="Hourly Rate" value={form.hourlyRate} onChange={handleChange} required />
                        <input name="teachingType" placeholder="Teaching Type (online/in-person)" value={form.teachingType} onChange={handleChange} required />
                        <input name="pricePerSession" placeholder="Price Per Session" value={form.pricePerSession} onChange={handleChange} required />
                    </>
                )}

                {error && <p className="error">{error}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
