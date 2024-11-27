import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logoImg from "../assets/cast-ring-logo2.png";
import PodcastPlayer from "./PodcastPlayer"; // Import the PodcastPlayer component
import { FaSearch } from "react-icons/fa"; //import search icon
import SearchModal from "./SearchModal" //import Searchmodal Component

const activeStyles = {
  fontWeight: "bold",
  color: "#e09f3e",
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal
  const [searchCriteria, setSearchCriteria] = useState({
    podcastName: "",
    genre: "",
    releaseYear: "",
  });

  const navigate = useNavigate(); // Use useNavigate hook

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle the search from the modal
  const handleSearch = (criteria) => {
    setSearchCriteria(criteria); // Update the search criteria state
    console.log("Searching for:", criteria); // You can add your search logic here, like filtering podcasts

    // Navigate to SearchResults page and pass search criteria via state
    navigate("/search-results", {
      state: { searchCriteria: criteria },
    });

    closeModal(); // Close the modal after performing the search
  };
  return (
    <header>
      <div className="logo">
        <img src={logoImg} alt="Logo" />
      </div>

      
      {/* Media Player Section */}
      <div className={`media-player ${isAudioPlaying ? "active" : ""}`}>
        <PodcastPlayer
          audioUrl="your-audio-file.mp3"
          episodeTitle="Your Episode Title"
          showName="Your Show Name"
          episodeImage="/path/to/episode-image.jpg"
          onPlay={() => setIsAudioPlaying(true)}
          onPause={() => setIsAudioPlaying(false)}
        />
      </div>

      {/* Navigation Section */}
      <nav>
        {/* Hamburger Icon for mobile */}
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Navigation Links */}
        <ul className={isMenuOpen ? "active" : ""}>
          <button className="close-btn" onClick={closeMenu}>
            ✖
          </button>
          <li>
            <NavLink
              to="/home"
              onClick={closeMenu}
              end
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/browse"
              onClick={closeMenu}
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Browse
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              onClick={closeMenu}
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Favorites
            </NavLink>
          </li>
          <li>
            <button
              className="search-btn"
              onClick={openModal}
              style={{
                fontSize: "20px",
                marginTop: "-10px",
                padding: "15px",
                color: "#ffffff",
              }}
            >
              <FaSearch />
            </button>
          </li>
        </ul>
      </nav>

      {/* Modal for Search */}
      <SearchModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSearch={handleSearch} // Pass the handleSearch function to the modal
      />
    </header>
  );
}
