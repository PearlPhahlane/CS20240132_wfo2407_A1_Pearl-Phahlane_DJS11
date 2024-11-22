import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import logoImg from "../assets/cast-ring-logo2.png";

export default function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // State to control media player visibility
  const audioRef = useRef(null); // Ref for the audio element

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

   const handleAudioPlay = () => {
     setIsAudioPlaying(true); // Show media player when audio is playing
   };

   const handleAudioPause = () => {
     setIsAudioPlaying(false); // Hide media player when audio is paused
   };

  return (
    <header>
      <div className="logo">
        <img src={logoImg} alt="Logo" />
      </div>

      {/* Media Player Section */}
      <div className={`media-player ${isAudioPlaying ? "active" : ""}`}>
        <audio
          ref={audioRef}
          controls
          onPlay={handleAudioPlay}
          onPause={handleAudioPause}
        >
          <source src="your-audio-file.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
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
