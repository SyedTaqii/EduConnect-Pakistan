import React, { useState } from 'react';

const BookingForm = ({ tutor, onBook }) => {
    const [subject, setSubject] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState('online');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!subject || !date || !time || !type) {
            alert('Please fill all fields');
            return;
        }
        onBook({ subject, date, time, type, tutorId: tutor.userId._id });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Book a Session with {tutor.userId.name}</h3>
            <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <select value={time} onChange={(e) => setTime(e.target.value)}>
                <option value="">Select Time</option>
                {tutor.availability?.flatMap(a => a.times.map(t => ({
                    label: `${a.day} - ${t}`,
                    value: t
                }))).map((slot, i) => (
                    <option key={i} value={slot.value}>{slot.label}</option>
                ))}
            </select>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="online">Online</option>
                <option value="in-person">In-Person</option>
            </select>
            <button type="submit">Book Session</button>
        </form>
    );
};

export default BookingForm;
