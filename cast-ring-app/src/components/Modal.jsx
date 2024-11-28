import PropTypes from "prop-types";
import GenreMapping from "./GenreMapping";


export default function Modal({ podcast, isOpen, onClose }) {
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
          <GenreMapping genreIds={podcast.genres} />{" "}
          {/* Pass the genres to GenreMapping */}
        </p>
        <p>
          <strong>Seasons:</strong> {podcast.seasons}
        </p>
        <button onClick={() => console.log("Show all episodes")}>
          See All Episodes
        </button>
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
