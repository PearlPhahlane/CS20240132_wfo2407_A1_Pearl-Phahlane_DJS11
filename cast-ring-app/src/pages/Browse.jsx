import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { useLocation, useNavigate } from "react-router-dom";


//Hardcode genre mapping
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
  const [podcasts, setPodcasts] = useState([]); // To store the podcasts
  const [selectedPodcast, setSelectedPodcast] = useState(null); // Store selected podcast for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [isLoading, setIsLoading] = useState(true); // To manage the loading state
  const [filters, setFilters] = useState({
    sort: "alphabetical", // Default sort
    genre: "", // No genre filter by default
    releaseDate: "", // No release date filter by default
  });

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [podcastsPerPage] = useState(10); // Number of podcasts per page

  const location = useLocation();
  const Navigate = useNavigate();

  // Fetch podcasts
  useEffect(() => {
    fetch("https://podcast-api.netlify.app")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPodcasts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching podcast data:", error);
        setIsLoading(false);
      });
  }, []);

  // Apply filters to the podcasts
  const filteredPodcasts = podcasts
    .filter((podcast) => {
      // Genre Filter: Check if podcast has the selected genre
      if (filters.genre && !podcast.genres.includes(parseInt(filters.genre))) {
        return false;
      }

      // Release Date Filter: Check if podcast's release date matches the selected date
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
        return new Date(a.updated) - new Date(b.updated); // Sort by release date
      }
      return 0;
    });

  // Get the current page's podcasts
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
      sort: "alphabetical", // Reset to default sorting
      genre: "",
      releaseDate: "",
    });
    setCurrentPage(1); // Reset page to 1 when clearing filters
    Navigate.push(location.pathname); // Clear URL params if any
  };

  // Change page number
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredPodcasts.length / podcastsPerPage);


  return (
    <div className="podcast-container">
      <h1 className="browse-page-title">Browse ALL</h1>
      <div className="filters">
        {/* Sort Filter */}
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
          {Object.keys(genreMapping).map((genreId) => (
            <option key={genreId} value={genreId}>
              {genreMapping[genreId]}
            </option>
          ))}
        </select>

        {/* Clear Filters */}
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
      {/* Pagination Controls */}
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
