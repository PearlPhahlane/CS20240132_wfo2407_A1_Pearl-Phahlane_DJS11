import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
// Hardcoded genres
const genreMapping = {
  1: "Personal Growth",
  2: "Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

export default function PodcastDetail() {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSeason, setSelectedSeason] = useState(""); // Track selected season
  const [episodes, setEpisodes] = useState([]); // Track episodes of selected season

  // Fetch podcast data from the API
  useEffect(() => {
    const fetchPodcast = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("https://podcast-api.netlify.app/");
        if (!response.ok) {
          throw new Error("Failed to fetch podcasts");
        }
        const data = await response.json();

        // Find the podcast by its ID
        const foundPodcast = data.find((podcast) => podcast.id === podcastId);
        if (!foundPodcast) {
          setError("Podcast not found!");
        } else {
          setPodcast(foundPodcast);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcast();
  }, [podcastId]);

  // Handle season change
  const handleSeasonChange = (e) => {
    const selected = e.target.value;
    setSelectedSeason(selected);
    if (selected && podcast) {
      // Assuming each podcast has an array of episodes per season (you may need to adjust this)
      setEpisodes(podcast.seasons[selected] || []);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!podcast) return <div>Podcast not found!</div>;

  return (
    <div className="podcast-detail">
      <div className="content">
        <div className="description">
          <h2>{podcast.title}</h2>
          <p>{podcast.description}</p>
          <div>
            <strong>Genres:</strong>
            {podcast.genres.map((genreId) => genreMapping[genreId]).join(", ")}
          </div>
          <div>
            <strong>Seasons:</strong>
            <select
              value={selectedSeason}
              onChange={handleSeasonChange}
              className="season-dropdown"
            >
              <option value="">Select a season</option>
              {Array.from({ length: podcast.seasons }, (_, i) => (
                <option key={i} value={i + 1}>
                  Season {i + 1}
                </option>
              ))}
            </select>
          </div>
          {episodes.length > 0 && (
            <div className="episodes">
              <h3>Episodes:</h3>
              <ul>
                {episodes.map((episode, index) => (
                  <li key={index}>{episode.title}</li>
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
  podcasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      seasons: PropTypes.number.isRequired,
      genres: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
};
