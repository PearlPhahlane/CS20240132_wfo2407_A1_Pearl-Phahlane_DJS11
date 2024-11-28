import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import GenreMapping from "../components/GenreMapping";



export default function PodcastDetail() {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSeason, setSelectedSeason] = useState(""); // Track selected season
  const [episodes, setEpisodes] = useState([]); // Track episodes of selected season
  const [favorites, setFavorites] = useState([]);

  // Fetch podcast data from the API
  useEffect(() => {
    const fetchPodcastData = async () => {
      setLoading(true);
      setError("");

      try {
        // Fetch podcast details
        const podcastResponse = await fetch(
          `https://podcast-api.netlify.app/id/${podcastId}`
        );
        if (!podcastResponse.ok) {
          throw new Error("Failed to fetch podcast details");
        }
        const podcastData = await podcastResponse.json();
        setPodcast(podcastData);

        // Fetch all shows to get genres
        const showsResponse = await fetch("https://podcast-api.netlify.app/");
        if (!showsResponse.ok) {
          throw new Error("Failed to fetch shows");
        }
        const shows = await showsResponse.json();

        // Find the current podcast and extract its genres
        const currentShow = shows.find((show) => show.id === podcastId);
        if (currentShow && currentShow.genres) {
          setGenres(currentShow.genres);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcastData();
  }, [podcastId]);

  // Handle season change
  const handleSeasonChange = (e) => {
    const selected = e.target.value;
    setSelectedSeason(selected);
    if (selected && podcast) {
      // Get the selected season data
      const seasonData = podcast.seasons.find(
        (season) => season.season === parseInt(selected)
      );
      setEpisodes(seasonData ? seasonData.episodes : []);
    }
  };

  // Handle favorite toggle for individual episode
  const toggleFavoriteEpisode = (episode) => {
    const updatedFavorites = favorites.includes(episode)
      ? favorites.filter((fav) => fav !== episode)
      : [...favorites, episode];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save favorites to localStorage
  };

  // Update the favorites list on initial load (from localStorage)
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!podcast) return <div>Podcast not found!</div>;

  return (
    <div className="podcast-detail">
      <div className="content">
        <div className="description">
          <h2>{podcast.title}</h2>

          {/* Display genres if available */}
          {genres.length > 0 && (
            <div className="podcast-genres">
              <strong>Genres: </strong>
              <GenreMapping genreIds={genres} />
            </div>
          )}

          <p>{podcast.description}</p>

          <div>
            <strong>Seasons: </strong>
            <select
              value={selectedSeason}
              onChange={handleSeasonChange}
              className="season-dropdown"
            >
              <option value="">Select a season</option>
              {podcast.seasons.map((season) => (
                <option key={season.season} value={season.season}>
                  {season.title}
                </option>
              ))}
            </select>
          </div>

          {/* Display episodes when a season is selected */}
          {episodes.length > 0 && (
            <div className="episodes">
              <h3>Episodes:</h3>
              <ul>
                {episodes.map((episode, index) => (
                  <li key={index}>
                    <h4>{episode.title}</h4>
                    <p>{episode.description}</p>
                    <p>
                      <strong>Episode {episode.episode}</strong>
                    </p>
                    <audio controls>
                      <source src={episode.file} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>

                    {/* Toggle Heart Icon */}
                    {favorites.includes(episode) ? (
                      <FaHeart
                        onClick={() => toggleFavoriteEpisode(episode)}
                        style={{
                          cursor: "pointer",
                          color: "red",
                          marginLeft: "10px",
                        }}
                      />
                    ) : (
                      <FaRegHeart
                        onClick={() => toggleFavoriteEpisode(episode)}
                        style={{
                          cursor: "pointer",
                          color: "gray",
                          marginLeft: "10px",
                        }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="image">
          <img src={podcast.image} alt={podcast.title} />
        </div>
      </div>
    </div>
  );
}

PodcastDetail.propTypes = {
  podcast: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    seasons: PropTypes.arrayOf(
      PropTypes.shape({
        season: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        episodes: PropTypes.arrayOf(
          PropTypes.shape({
            episode: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            file: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }),
};