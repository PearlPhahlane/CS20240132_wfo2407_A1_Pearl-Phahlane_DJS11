import { useState, useEffect } from "react";
import FavoriteButton from "../components/FavoriteButton";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  // Fetch favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

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

              {/* Use FavoriteButton component to handle favoriting each episode */}
              <FavoriteButton
                episode={episode}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
