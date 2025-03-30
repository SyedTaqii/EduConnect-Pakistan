import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const TutorProfile = () => {
    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({
        subjects: '',
        city: '',
        rate: '',
        mode: 'online',
        bio: '',
        profilePicture: '',
        availability: [{ day: 'Monday', times: ['10:00 AM'] }]
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/tutor/profile');
                setProfile(res.data);
                setForm({
                    ...res.data,
                    subjects: res.data.subjects.join(', ')
                });
            } catch {
                console.log('No profile yet');
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...form,
                subjects: form.subjects.split(',').map((s) => s.trim()),
                availability: form.availability // keep static or allow editing
            };
            await api.post('/tutor/profile', payload);
            alert('Profile saved');
        } catch {
            alert('Failed to save profile');
        }
    };

    return (
        <div>
            <h2>My Tutor Profile</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="subjects"
                    placeholder="Subjects (comma separated)"
                    value={form.subjects}
                    onChange={handleChange}
                />
                <input
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                />
                <input
                    name="rate"
                    placeholder="Rate per hour"
                    type="number"
                    value={form.rate}
                    onChange={handleChange}
                />
                <select name="mode" value={form.mode} onChange={handleChange}>
                    <option value="online">Online</option>
                    <option value="in-person">In-Person</option>
                    <option value="both">Both</option>
                </select>
                <textarea
                    name="bio"
                    placeholder="Bio"
                    value={form.bio}
                    onChange={handleChange}
                />
                <input
                    name="profilePicture"
                    placeholder="Profile Picture URL"
                    value={form.profilePicture}
                    onChange={handleChange}
                />
                <button type="submit">Save Profile</button>
            </form>

            {profile && (
                <div className="preview">
                    <h4>Preview</h4>
                    <p><strong>Subjects:</strong> {profile.subjects?.join(', ')}</p>
                    <p><strong>Rate:</strong> Rs. {profile.rate}/hr</p>
                    <p><strong>City:</strong> {profile.city}</p>
                    <p><strong>Mode:</strong> {profile.mode}</p>
                    <p>{profile.bio}</p>
                </div>
            )}
        </div>
    );
};

export default TutorProfile;
