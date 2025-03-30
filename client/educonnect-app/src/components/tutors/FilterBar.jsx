import React from 'react';

const FilterBar = ({ filters, onChange }) => {
    return (
        <div className="filter-bar">
            <input
                type="text"
                name="subject"
                placeholder="Search subject"
                value={filters.subject}
                onChange={onChange}
            />
            <select name="city" value={filters.city} onChange={onChange}>
                <option value="">All Cities</option>
                <option value="online">Online</option>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Islamabad">Islamabad</option>
            </select>
            <input
                type="number"
                name="minRate"
                placeholder="Min Rate"
                value={filters.minRate}
                onChange={onChange}
            />
            <input
                type="number"
                name="maxRate"
                placeholder="Max Rate"
                value={filters.maxRate}
                onChange={onChange}
            />
            <input
                type="number"
                name="minRating"
                placeholder="Min Rating"
                value={filters.minRating}
                onChange={onChange}
            />
        </div>
    );
};

export default FilterBar;
