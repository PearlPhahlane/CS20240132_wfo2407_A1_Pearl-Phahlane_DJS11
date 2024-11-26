import { useState } from "react";
import { NavLink } from "react-router-dom";
import logoImg from "../assets/cast-ring-logo2.png";
import PodcastPlayer from "./PodcastPlayer"; // Import the PodcastPlayer component
import { FaSearch } from "react-icons/fa"; //import search icon

const activeStyles = {
  fontWeight: "bold",
  color: "#e09f3e",
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
            <NavLink
              to="/search"
              onClick={closeMenu}
              style={{ fontSize: "24px", color: "#ffffff", }}
            >
              <FaSearch />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
