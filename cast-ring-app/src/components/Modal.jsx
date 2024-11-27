import PropTypes from "prop-types";

const genreMapping = {
  1: "Personal Growth",
  2: "Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

export default function Modal({ podcast, isOpen, onClose }) {
  if (!isOpen || !podcast) return null;

  // Map genre IDs to names
  const genreNames = podcast.genres
    .map((genreId) => genreMapping[genreId])
    .filter(Boolean); // Remove undefined values (in case of invalid IDs)

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
          <strong>Genre:</strong> {genreNames.join(", ") || "Unknown"}{" "}
          {/* Join genres into a single string */}
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
