import React from 'react';
import '../style/Filter.css'; // Importing CSS styles

const Filter = ({ 
  genres, 
  tempGenre, 
  setTempGenre, 
  developers, 
  tempDeveloper, 
  setTempDeveloper, 
  publishers, 
  tempPublisher, 
  setTempPublisher, 
  tempRatingRange, 
  setTempRatingRange, 
  onApplyFilters 
}) => {
  return (
    <div className="filter-container">
      <h2 className="filter-title">Filters</h2>
      <div className="filter-group">
        <h3>Genre</h3>
        <select value={tempGenre} onChange={(e) => setTempGenre(e.target.value)}>
          <option value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <h3>Developer</h3>
        <select value={tempDeveloper} onChange={(e) => setTempDeveloper(e.target.value)}>
          <option value="">Select Developer</option>
          {developers.map((dev) => (
            <option key={dev} value={dev}>{dev}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <h3>Publisher</h3>
        <select value={tempPublisher} onChange={(e) => setTempPublisher(e.target.value)}>
          <option value="">Select Publisher</option>
          {publishers.map((pub) => (
            <option key={pub} value={pub}>{pub}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <h3>Rating Range</h3>
        <div className="rating-range">
          <input
            type="number"
            placeholder="Min"
            value={tempRatingRange.min}
            onChange={(e) => setTempRatingRange({ ...tempRatingRange, min: e.target.value })}
            className="filter-rating-input"
          />
          <input
            type="number"
            placeholder="Max"
            value={tempRatingRange.max}
            onChange={(e) => setTempRatingRange({ ...tempRatingRange, max: e.target.value })}
            className="filter-rating-input"
          />
        </div>
      </div>
      <button className="btn-apply" onClick={onApplyFilters}>Apply</button>
    </div>
  );
};

export default Filter;
