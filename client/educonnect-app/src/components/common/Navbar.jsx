import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{ padding: '1rem', background: '#f1f1f1', marginBottom: '1rem' }}>
            <Link to="/">Home</Link> |{' '}
            {!user && <><Link to="/login">Login</Link> | <Link to="/register">Register</Link></>}

            {user && user.role === 'student' && (
                <>
                    <Link to="/my-sessions">My Sessions</Link> |
                    <Link to="/wishlist">Wishlist</Link> |
                </>
            )}

            {user && user.role === 'tutor' && (
                <>
                    <Link to="/tutor/profile">My Profile</Link> |
                    <Link to="/tutor/dashboard">Dashboard</Link> |
                </>
            )}

            {user && user.role === 'admin' && (
                <>
                    <Link to="/admin/verifications">Verifications</Link> |
                    <Link to="/admin/reports">Reports</Link> |
                </>
            )}

            {user && (
                <>
                    <span style={{ marginLeft: '1rem' }}><strong>{user.role.toUpperCase()}</strong></span>
                    <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>Logout</button>
                </>
            )}
        </nav>
    );
};

export default Navbar;
