import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { useLocation, useNavigate } from "react-router-dom";

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

export default function Browse() {
  const [podcasts, setPodcasts] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    sort: "alphabetical",
    genre: "",
    releaseDate: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [podcastsPerPage] = useState(10);

  const location = useLocation();
  const Navigate = useNavigate();

  useEffect(() => {
    fetch("https://podcast-api.netlify.app")
      .then((response) => response.json())
      .then((data) => {
        setPodcasts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching podcast data:", error);
        setIsLoading(false);
      });
  }, []);

  const filteredPodcasts = podcasts
    .filter((podcast) => {
      if (filters.genre && !podcast.genres.includes(parseInt(filters.genre))) {
        return false;
      }
      if (
        filters.releaseDate &&
        podcast.updated.substring(0, 10) !== filters.releaseDate
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "alphabetical") {
        return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
      } else if (filters.sort === "releaseDate") {
        return new Date(a.updated) - new Date(b.updated);
      }
      return 0;
    });

  const indexOfLastPodcast = currentPage * podcastsPerPage;
  const indexOfFirstPodcast = indexOfLastPodcast - podcastsPerPage;
  const currentPodcasts = filteredPodcasts.slice(
    indexOfFirstPodcast,
    indexOfLastPodcast
  );

  const openModal = (podcast) => {
    setSelectedPodcast(podcast);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      sort: "alphabetical",
      genre: "",
      releaseDate: "",
    });
    setCurrentPage(1);
    Navigate.push(location.pathname);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredPodcasts.length / podcastsPerPage);

  return (
    <div className="podcast-container">
      <h1 className="browse-page-title">Browse ALL</h1>
      <div className="filters">
        <select name="sort" value={filters.sort} onChange={handleFilterChange}>
          <option value="alphabetical">Alphabetical</option>
          <option value="releaseDate">Release Date (Oldest)</option>
        </select>

        {/* Genre Filter */}
        <select
          name="genre"
          value={filters.genre}
          onChange={handleFilterChange}
        >
          <option value="">All Genres</option>
          {Object.entries(genreMapping).map(([genreId, genreName]) => (
            <option key={genreId} value={genreId}>
              {genreName}
            </option>
          ))}
        </select>

        <button
          onClick={clearFilters}
          style={{
            fontSize: "16px",
            margin: "0",
            padding: "15px",
            color: "#ffffff",
            width: "200px",
            height: "60px",
          }}
        >
          Clear Filters
        </button>
      </div>

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="podcast-grid">
          {currentPodcasts.map((podcast) => (
            <div key={podcast.id} className="podcast-item">
              <button onClick={() => openModal(podcast)}>
                <img src={podcast.image} alt={podcast.title} />
              </button>
              <h4>{podcast.title}</h4>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <Modal
        podcast={selectedPodcast}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
