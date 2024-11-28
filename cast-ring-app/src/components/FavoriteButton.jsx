import PropTypes from "prop-types";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Heart icons from FontAwesome

export default function FavoriteButton({ episode, favorites, setFavorites }) {
    const toggleFavorite = () => {
      const updatedFavorites = [...favorites];
      const episodeIndex = updatedFavorites.findIndex(
        (fav) => fav.id === episode.id
      );

      if (episodeIndex !== -1) {
        // If the episode is already in favorites, remove it
        updatedFavorites.splice(episodeIndex, 1);
      } else {
        // If not in favorites, add it
        updatedFavorites.push(episode);
      }

      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
    };

    return (
      <>
        {favorites.some((fav) => fav.id === episode.id) ? (
          <FaHeart
            onClick={toggleFavorite}
            style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
          />
        ) : (
          <FaRegHeart
            onClick={toggleFavorite}
            style={{ cursor: "pointer", color: "gray", marginLeft: "10px" }}
          />
        )}
      </>
    );
};

// Define prop types
FavoriteButton.propTypes = {
  episode: PropTypes.shape({
    id: PropTypes.string.isRequired, // or 'number', depending on the type of 'id'
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
  }).isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // or 'number'
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      file: PropTypes.string.isRequired,
    })
  ).isRequired,
  setFavorites: PropTypes.func.isRequired,
};
