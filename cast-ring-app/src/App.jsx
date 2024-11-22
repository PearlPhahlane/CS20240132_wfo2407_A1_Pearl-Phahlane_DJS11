import { BrowserRouter, Routes, Route} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Favorites from "./pages/Favorites";
import Layout from './components/Layout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
         <Route path="home" element={<Home />} />
         <Route path="browse" element={<Browse />} />
         <Route path="favorites" element={<Favorites />} />
         

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
