import PropTypes from "prop-types";

export default function Modal({ podcast, isOpen, onClose }) {
  if (!isOpen || !podcast) return null; // If modal is closed or no podcast is selected, return null

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-btn">
          X
        </button>
        <h2>{podcast.name}</h2>
        <img src={podcast.image} alt={podcast.name} />
        <p>
          <strong>Title:</strong> {podcast.name}
        </p>
        <p>
          <strong>Genre:</strong> {podcast.genre}
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
  podcast: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    seasons: PropTypes.number.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
