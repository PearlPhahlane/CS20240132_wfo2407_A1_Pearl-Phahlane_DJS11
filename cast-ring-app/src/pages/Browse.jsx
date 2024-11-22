import { useState, useEffect } from "react";
import axios from "axios";

export default function Browse() {
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://podcast-api.netlify.app")
      .then((response) => {
        setPodcasts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching podcast data:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="podcast-container">
      <h1 className="page-title">Browse ALL</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="podcast-grid">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="podcast-item">
              <img
                src={podcast.image}
                alt={podcast.title}
                className="podcast-image"
              />
              <h3 className="podcast-title">{podcast.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
