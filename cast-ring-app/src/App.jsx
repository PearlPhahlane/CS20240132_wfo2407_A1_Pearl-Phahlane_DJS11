import { BrowserRouter, Routes, Route} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Favorites from "./pages/Favorites";
import PodcastDetail from "./pages/PodcastDetail";
import Layout from './components/Layout';
import AudioPlayerProvider from "./AudioPlayerContex";


function App() {
  return (
    <BrowserRouter>
      <AudioPlayerProvider>
        {" "}
        {/* Wrap application with the provider */}
        <Routes>
          {/* Route for landingpage at '/' */}
          <Route path="/" element={<LandingPage />} />

          {/* Wrapped Layout Route for other pages*/}
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="browse" element={<Browse />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="podcast/:podcastId" element={<PodcastDetail />} />
          </Route>
        </Routes>
      </AudioPlayerProvider>
    </BrowserRouter>
  );
}

export default App
