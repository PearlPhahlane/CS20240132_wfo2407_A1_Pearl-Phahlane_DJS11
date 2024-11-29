import PropTypes from "prop-types";
import GenreMapping from "./GenreMapping";
import { useNavigate } from "react-router-dom";  // Import useNavigate


export default function Modal({ podcast, isOpen, onClose }) {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle navigation to PodcastDetail page
  const handleSeeAllEpisodesClick = () => {
    navigate(`/podcast/${podcast.id}`); // Navigate to the PodcastDetail page
  };

  if (!isOpen || !podcast) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-btn">
          X
        </button>
        <img src={podcast.image} alt={podcast.title} />
        <p>
          <strong>Title:</strong> {podcast.title}
        </p>
        <p>
          <strong>Genre: </strong>
          <GenreMapping genreIds={podcast.genres} />
        </p>
        <p>
          <strong>Seasons:</strong> {podcast.seasons}
        </p>
        <button onClick={handleSeeAllEpisodesClick}>See All Episodes</button>
      </div>
    </div>
  );
}

// Prop validation
Modal.propTypes = {
  podcast: PropTypes.object, // No need for .isRequired anymore
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
