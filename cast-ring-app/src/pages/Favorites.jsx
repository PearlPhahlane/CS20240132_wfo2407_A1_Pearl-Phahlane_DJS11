import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import "./favorites.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Function to remove an episode from favorites
  const removeFromFavorites = (episodeToRemove) => {
    const updatedFavorites = favorites.filter(
      (episode) => episode.title !== episodeToRemove.title
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites">
      <h2>Your Favorite Episodes</h2>
      {favorites.length === 0 ? (
        <p className="no-favorites">No favorites yet!</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((episode, index) => (
            <div key={index} className="favorite-item">
              <h4>{episode.title}</h4>
              <p>{episode.description}</p>
              <div className="audio-container">
                <audio controls>
                  <source src={episode.file} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
                <div
                  className="favorite-heart"
                  onClick={() => removeFromFavorites(episode)}
                  title="Remove from Favorites"
                >
                  <FaHeart className="heart-icon heart-filled" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
