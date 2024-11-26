import PropTypes from "prop-types";

export default function Modal({ podcast, isOpen, onClose }) {
  if (!isOpen || !podcast) return null; // If modal is closed or no podcast is selected, return null

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
          <strong>Genre:</strong>  
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
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    seasons: PropTypes.number.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
