import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

useEffect(() => {
    if (user) {
        const { role } = user;
        if (role === 'student') navigate('/student/home');
        else if (role === 'tutor') navigate('/tutor/dashboard');
        else if (role === 'admin') navigate('/admin/verifications');
    }
}, [user]);


const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', form);
            login(res.data.user, res.data.token);
            alert('Login successful');

            const role = res.data.user.role;
            if (role === 'student') navigate('/student/home');
            else if (role === 'tutor') navigate('/tutor/dashboard');
            else if (role === 'admin') navigate('/admin/verifications');
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed');
        }
    };


    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
