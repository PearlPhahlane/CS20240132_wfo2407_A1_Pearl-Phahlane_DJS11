import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Heart icons from FontAwesome

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // fetch favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Handle adding/removing a single favorite episode
  const toggleFavorite = (episodeToToggle) => {
    const updatedFavorites = [...favorites];
    const episodeIndex = updatedFavorites.findIndex(
      (episode) => episode.id === episodeToToggle.id // Match by unique identifier (e.g. 'id')
    );

    if (episodeIndex !== -1) {
      // If the episode is already in favorites, remove it
      updatedFavorites.splice(episodeIndex, 1);
    } else {
      // If not in favorites, add it
      updatedFavorites.push(episodeToToggle);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
  };

  return (
    <div className="favorites">
      <h2>Your Favorite Episodes</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        <ul>
          {favorites.map((episode, index) => (
            <li key={index}>
              <h4>{episode.title}</h4>
              <p>{episode.description}</p>
              <audio controls>
                <source src={episode.file} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>

              {/* Heart icon to toggle favorite status */}
              {favorites.some((fav) => fav.id === episode.id) ? (
                <FaHeart
                  onClick={() => toggleFavorite(episode)} // Remove from favorites
                  style={{
                    cursor: "pointer",
                    color: "red",
                    marginLeft: "10px",
                  }}
                />
              ) : (
                <FaRegHeart
                  onClick={() => toggleFavorite(episode)} // Add to favorites
                  style={{
                    cursor: "pointer",
                    color: "gray",
                    marginLeft: "10px",
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
