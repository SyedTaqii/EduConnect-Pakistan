// src/pages/students/SearchTutorsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';

const SearchTutorsPage = () => {
    const [filters, setFilters] = useState({
        subject: '',
        priceMin: '',
        priceMax: '',
        rating: '',
        teachingType: ''
    });

    const [tutors, setTutors] = useState([]);

    const handleChange = e => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('/student/search-tutors', { params: filters });
            setTutors(response.data);
        } catch (err) {
            console.error('Search failed:', err);
        }
    };

    useEffect(() => {
        handleSearch(); // fetch all tutors initially
    }, []);

    return (
        <div className="page">
            <h2>Search Tutors</h2>

            <div className="filter-form">
                <input name="subject" placeholder="Subject" onChange={handleChange} />
                <input name="priceMin" placeholder="Min Price" type="number" onChange={handleChange} />
                <input name="priceMax" placeholder="Max Price" type="number" onChange={handleChange} />
                <input name="rating" placeholder="Min Rating" type="number" onChange={handleChange} />
                <select name="teachingType" onChange={handleChange}>
                    <option value="">Any</option>
                    <option value="online">Online</option>
                    <option value="in-person">In-Person</option>
                </select>
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className="tutor-list">
                {tutors.map(tutor => (
                    <div key={tutor._id} className="tutor-card">
                        <h3>{tutor.name}</h3>
                        <p>Subjects: {tutor.subjects.join(', ')}</p>
                        <p>Hourly Rate: Rs {tutor.hourlyRate}</p>
                        <p>Rating: {tutor.rating}</p>
                        <p>Teaching Type: {tutor.teachingType}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchTutorsPage;
