import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";


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
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${podcastId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch podcast");
        }
        const data = await response.json();
        setPodcast(data);
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
      // Get the selected season data
      const seasonData = podcast.seasons.find(
        (season) => season.season === parseInt(selected)
      );
      setEpisodes(seasonData ? seasonData.episodes : []);
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
  podcasts: PropTypes.arrayOf(
    PropTypes.shape({
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
      genres: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  )
};
