import { useState } from "react";
import PropTypes from "prop-types";

export default function SearchModal({ isOpen, onClose, onSearch}) {
    const [searchCriteria, setSearchCriteria] = useState({
        podcastName: "",
        genre: "",
        releaseYear: "",
    })

    const handleSearchChange = (e) => {
        const {name, value} = e.target;
        setSearchCriteria((prev) => ({
            ...prev,
            [name] : value,
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();

        //if there's at least one filter, initiate search
        if(searchCriteria.podcastName || searchCriteria.genre || searchCriteria.releaseYear) {
            onSearch(searchCriteria); //pass search criteria to parent component
            onClose(); //close modal after search
        } else {
            alert("Please enter at least one search criteria.");
        }
    };

    if (!isOpen) return null; //don't reneder modal if its not open 

     return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Search Podcasts</h2>
        <form onSubmit={handleSearch}>
          <div>
            <label>Podcast Name</label>
            <input
              type="text"
              name="podcastName"
              value={searchCriteria.podcastName}
              onChange={handleSearchChange}
              placeholder="Enter podcast name"
            />
          </div>

          <div>
            <label>Genre</label>
            <select
              name="genre"
              value={searchCriteria.genre}
              onChange={handleSearchChange}
            >
              <option value="">Select Genre</option>
              <option value="1">Personal Growth</option>
              <option value="2">Investigative Journalism</option>
              <option value="3">History</option>
              <option value="4">Comedy</option>
              <option value="5">Entertainment</option>
              <option value="6">Business</option>
              <option value="7">Fiction</option>
              <option value="8">News</option>
              <option value="9">Kids and Family</option>
            </select>
          </div>

          <div>
            <label>Release Year</label>
            <select
              name="releaseYear"
              value={searchCriteria.releaseYear}
              onChange={handleSearchChange}
            >
              <option value="">Select Year</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <button type="submit">Search</button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
    
}

SearchModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired, // Define onSearch as a required function
};