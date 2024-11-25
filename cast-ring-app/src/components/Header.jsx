import { useState } from "react";
import { NavLink } from "react-router-dom";
import logoImg from "../assets/cast-ring-logo2.png";
import PodcastPlayer from "./PodcastPlayer"; // Import the PodcastPlayer component

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
            <NavLink to="/home" onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/browse" onClick={closeMenu}>
              Browse
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" onClick={closeMenu}>
              Favorites
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" onClick={closeMenu}>
              Search
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
