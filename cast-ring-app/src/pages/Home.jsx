import { useState, useEffect } from "react";
import Slider from "react-slick";

export default function Home() {
  const [podcasts, setPodcasts] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null); // Store selected podcast for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

 useEffect(() => {
   fetch("https://podcast-api.netlify.app")
     .then((response) => response.json())
     .then((data) => setPodcasts(data))
     .catch((error) => console.error("Error fetching podcasts:", error));
 }, []);

 const openModal = (podcast) => {
   setSelectedPodcast(podcast);
   setIsModalOpen(true);
 };

 const closeModal = () => setIsModalOpen(false);

 const settings = {
   infinite: true,
   speed: 500,
   slidesToShow: 3,
   slidesToScroll: 1,
   responsive: [
     {
       breakpoint: 1024,
       settings: {
         slidesToShow: 2,
         slidesToScroll: 1,
       },
     },
     {
       breakpoint: 600,
       settings: {
         slidesToShow: 1,
         slidesToScroll: 1,
       },
     },
   ],
 };

 return (
   <div className="carousel-container">
     <h1>New Shows</h1>
     <Slider {...settings}>
       {podcasts.slice(0, 6).map((podcast) => (
         <div key={podcast.id} className="podcast-item">
           <button onClick={() => openModal(podcast)}>
             <img src={podcast.image} alt={podcast.name} />
           </button>
           <h3>{podcast.name}</h3>
         </div>
       ))}
     </Slider>

     {isModalOpen && selectedPodcast && (
       <div className="modal">
         <div className="modal-content">
           <button onClick={closeModal} className="modal-close-btn">
             X
           </button>
           <h2>{selectedPodcast.name}</h2>
           <img src={selectedPodcast.image} alt={selectedPodcast.name} />
           <p>
             <strong>Genre:</strong> {selectedPodcast.genre}
           </p>
           <p>
             <strong>Release Date:</strong> {selectedPodcast.date}
           </p>
           <p>
             <strong>Seasons:</strong> {selectedPodcast.seasons}
           </p>
           <button onClick={() => console.log("Show all episodes")}>
             See All Episodes
           </button>
         </div>
       </div>
     )}
   </div>
 );
}
