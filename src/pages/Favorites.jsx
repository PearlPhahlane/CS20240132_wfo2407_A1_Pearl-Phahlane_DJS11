import { useState, useEffect } from "react";
import FavoriteButton from "../components/FavoriteButton"; // Import the FavoriteButton component
import "./favorites.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Function to toggle favorite status
  const toggleFavorite = (episode) => {
    // Check if the episode is in favorites
    const isAlreadyFavorited = favorites.some(
      (fav) => fav.title === episode.title
    );

    let updatedFavorites;
    if (isAlreadyFavorited) {
      // Remove episode from favorites if it's already favorited
      updatedFavorites = favorites.filter((fav) => fav.title !== episode.title);
    } else {
      // Add episode to favorites if it's not already favorited
      updatedFavorites = [...favorites, episode];
    }

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
                <div className="favorite-heart">
                  <FavoriteButton
                    episode={episode} // Pass episode data
                    isFavorite={true} // Since it's in the favorites, it's always true
                    toggleFavorite={toggleFavorite} // Pass the toggleFavorite function
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
