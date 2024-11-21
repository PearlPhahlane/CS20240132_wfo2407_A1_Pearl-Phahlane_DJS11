import { NavLink} from "react-router-dom";


export default function Header() {
  return (
    <header>
      <div className="media-player">
        <audio controls>
          <source src="your-audio-file.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/browse">Browse</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        <NavLink to="/search">Search</NavLink>
      </nav>
    </header>
  );
}
