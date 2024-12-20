import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./searchModal.css";

// Search Modal Component
export default function SearchModal({ isOpen, onClose }) {
  const [searchCriteria, setSearchCriteria] = useState({
    podcastName: "", // Only search by title
  });

  const [suggestions, setSuggestions] = useState([]); // To store podcast title suggestions
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(""); // To handle any errors
  const [allPodcasts, setAllPodcasts] = useState([]); // Store all podcasts for filtering
  

  const navigate = useNavigate(); // Initialize navigate hook

  // Fetch podcasts from the API once when the modal is opened
  useEffect(() => {
    const fetchPodcasts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("https://podcast-api.netlify.app/");
        if (!response.ok) {
          throw new Error("Failed to fetch podcasts");
        }

        const data = await response.json();
        setAllPodcasts(data); // Store all podcasts for filtering locally
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchPodcasts(); // Fetch podcasts when the modal opens
    } else {
      setSuggestions([]); // Clear suggestions if the modal is closed
    }
  }, [isOpen]); // Re-fetch podcasts when modal opens

  // Function to handle input changes
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter podcasts based on the search query
  useEffect(() => {
    if (searchCriteria.podcastName.length >= 3) {
      const filteredSuggestions = allPodcasts.filter((podcast) =>
        podcast.title
          .toLowerCase()
          .includes(searchCriteria.podcastName.toLowerCase())
      );
      setSuggestions(filteredSuggestions); // Update suggestions based on search query
    } else {
      setSuggestions([]); // Clear suggestions if query is too short
    }
  }, [searchCriteria.podcastName, allPodcasts]); // Filter when searchCriteria or allPodcasts change

  

  // Function to handle suggestion click
  const handleSuggestionClick = (id) => {
    // Navigate to the podcast detail page with the podcast ID
    navigate(`/podcast/${id}`); // Use `navigate` for navigation
    // Clear the search input after selecting a suggestion
    setSearchCriteria({ podcastName: "" });
    onClose(); // Close the modal on any suggestion click
  };

  // Handle the search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCriteria.podcastName) {
      // Find the selected podcast
      const selectedPodcast = allPodcasts.find(
        (podcast) =>
          podcast.title.toLowerCase() ===
          searchCriteria.podcastName.toLowerCase()
      );
      if (selectedPodcast) {
        // Navigate to the podcast detail page
        navigate(`/podcast/${selectedPodcast.id}`);
        setSearchCriteria({ podcastName: "" }); // Clear the search input after successful search
        onClose(); // Close the modal after search
      } else {
        alert("Podcast not found");
      }
    } else {
      alert("Please enter a podcast name to search.");
    }
  };
  // Function to handle close button click
  const handleClose = () => {
    onClose(); // Close the modal when the close button is clicked
  };

  if (!isOpen) return null; // Don't render modal if not open

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      {" "}
      {/* Close modal when clicking outside */}
      <div
        className="search-modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <h2>Search Podcasts</h2>
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label>Podcast Name: </label>
            <input
              type="text"
              name="podcastName"
              value={searchCriteria.podcastName}
              onChange={handleSearchChange}
              placeholder="Enter podcast name"
            />
          </div>

          {/* Show search suggestions */}
          {loading && (
            <div className="loading" style={{ color: "black" }}>
              Loading...
            </div>
          )}
          {error && <div className="error">{error}</div>}

          <div className="suggestions-list">
            {suggestions.length > 0 ? (
              suggestions.map((podcast) => (
                <div
                  key={podcast.id}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(podcast.id)} // Handle click
                >
                  {podcast.title}
                </div>
              ))
            ) : (
              <div className="no-results">No results found</div>
            )}
          </div>

          <button type="submit" className="search-submit-btn">
            Search
          </button>
          <button
            type="button"
            className="search-close-btn"
            onClick={handleClose}
          >
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
};
