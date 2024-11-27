import { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchModal from "../components/SearchModal";

export default function SearchResults() {
  const location = useLocation();
  const searchCriteria = location.state?.searchCriteria || {};

  const [isModalOpen, setIsModalOpen] = useState(true); // Open the modal by default

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (criteria) => {
    console.log("Searching for:", criteria);
    // Perform search logic here...
    closeModal();
  };

  return (
    <div>
      <h2>Search Results</h2>
      <div>
        <p>Searching for:</p>
        <ul>
          {searchCriteria.podcastName && (
            <li>Podcast Name: {searchCriteria.podcastName}</li>
          )}
          {searchCriteria.genre && <li>Genre: {searchCriteria.genre}</li>}
          {searchCriteria.releaseYear && (
            <li>Release Year: {searchCriteria.releaseYear}</li>
          )}
        </ul>
      </div>

      {/* Modal for Search */}
      <SearchModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSearch={handleSearch} // Pass the handleSearch function to the modal
      />
    </div>
  );
}
