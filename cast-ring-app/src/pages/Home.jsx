import { useState, useEffect } from "react";
import Slider from "react-slick";
import Modal from "../components/Modal";

export default function Home() {
  const [podcasts, setPodcasts] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null); // Store selected podcast for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  fetch("https://podcast-api.netlify.app")
    .then((response) => response.json())
    .then((data) => {
      setPodcasts(data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching podcasts:", error);
      setIsLoading(false);
    });
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
     {isLoading ? (
       <p>Loading...</p>
     ) : (
       <Slider {...settings}>
         {podcasts.map((podcast) => (
           <div key={podcast.id} className="podcast-item">
             <button onClick={() => openModal(podcast)}>
               <img src={podcast.image} alt={podcast.title} />
             </button>
             <h4>{podcast.title}</h4>
           </div>
         ))}
       </Slider>
     )}
     <Modal
       podcast={selectedPodcast}
       isOpen={isModalOpen}
       onClose={closeModal}
     />
   </div>
 );
}
