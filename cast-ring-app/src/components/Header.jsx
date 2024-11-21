import { NavLink} from "react-router-dom";


export default function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/browse">Browse</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        <NavLink to="/search">Search</NavLink>
      </nav>
    </header>
  );
}
