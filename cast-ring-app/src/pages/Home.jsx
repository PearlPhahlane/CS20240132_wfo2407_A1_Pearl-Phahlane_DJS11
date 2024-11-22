import { useState, useEffect } from "react";
import Slider from "react-slick";

export default function Home() {
 const [podcasts, setPodcasts] = useState([]);

 useEffect(() => {
   fetch("https://podcast-api.netlify.app")
     .then((response) => response.json())
     .then((data) => {
       setPodcasts(data); // Store podcast data
     })
     .catch((error) => console.error("Error fetching podcasts:", error));
 }, []);

 // Configure slider settings
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
           <img src={podcast.image} alt={podcast.name} />
           <h3>{podcast.name}</h3>
         </div>
       ))}
     </Slider>
   </div>
 );

}
