import PropTypes from "prop-types";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function FavoriteButton({ episode, isFavorite,toggleFavorite, }) {
  return isFavorite ? (
    <FaHeart
      onClick={() => toggleFavorite(episode)}
      style={{
        cursor: "pointer",
        color: "red",
        marginLeft: "10px",
      }}
    />
  ) : (
    <FaRegHeart
      onClick={() => toggleFavorite(episode)}
      style={{
        cursor: "pointer",
        color: "gray",
        marginLeft: "10px",
      }}
    />
  );
}
// Add PropTypes validation
FavoriteButton.propTypes = {
  episode: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    episode: PropTypes.number.isRequired,
    file: PropTypes.string.isRequired,
  }).isRequired, // `episode` should be an object with specific properties
  isFavorite: PropTypes.bool.isRequired, // `isFavorite` should be a boolean
  toggleFavorite: PropTypes.func.isRequired, // `toggleFavorite` should be a function
};
