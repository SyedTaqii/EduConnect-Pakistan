// src/pages/tutor/EarningsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';

const EarningsPage = () => {
    const [earnings, setEarnings] = useState({ totalEarnings: 0, pricePerSession: 0 });

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                const res = await axios.get('/tutor/earnings');
                setEarnings(res.data);
            } catch (err) {
                console.error('Error loading earnings:', err);
            }
        };
        fetchEarnings();
    }, []);

    return (
        <div className="page">
            <h2>Earnings Summary</h2>
            <p><strong>Total Earnings:</strong> Rs {earnings.totalEarnings}</p>
            <p><strong>Price Per Session:</strong> Rs {earnings.pricePerSession}</p>
        </div>
    );
};

export default EarningsPage;
