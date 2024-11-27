import { useState, useEffect } from "react";
import Modal from "../components/Modal";


export default function Browse() {
  const [podcasts, setPodcasts] = useState([]); // To store the podcasts
  const [selectedPodcast, setSelectedPodcast] = useState(null); // Store selected podcast for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [isLoading, setIsLoading] = useState(true); // To manage the loading state

  useEffect(() => {
    fetch("https://podcast-api.netlify.app") // Use fetch to get data
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON data
      })
      .then((data) => {
        // Sort podcasts alphabetically by title
        const sortedPodcasts = data.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        setPodcasts(sortedPodcasts); // Store the sorted podcasts in the state
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching podcast data:", error);
        setIsLoading(false); // Handle error and stop loading
      });
  }, []); // Empty array ensures this runs only once on mount

  const openModal = (podcast) => {
    setSelectedPodcast(podcast);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);


  return (
    <div className="podcast-container">
      <h1 className="page-title">Browse ALL</h1>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="podcast-grid">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="podcast-item">
              <button onClick={() => openModal(podcast)}>
                <img src={podcast.image} alt={podcast.title} />
              </button>
              <h4>{podcast.title}</h4>
            </div>
          ))}
        </div>
      )}
      <Modal
        podcast={selectedPodcast}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
