import { BrowserRouter, Routes, Route} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Favorites from "./pages/Favorites";
import SearchResults from "./pages/SearchResults";
import Layout from './components/Layout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for landingpage at '/' */}
        <Route path="/" element={<LandingPage />} />

        {/* Wrapped Layout Route for other pages*/}
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="browse" element={<Browse />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="search-results" element={<SearchResults />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
