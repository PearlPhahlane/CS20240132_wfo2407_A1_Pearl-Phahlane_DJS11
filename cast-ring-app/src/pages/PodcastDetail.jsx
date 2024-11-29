import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import GenreMapping from "../components/GenreMapping";
import FavoriteButton from "../components/FavoriteButton";
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";
import "./podcastDetails.css";

export default function PodcastDetail() {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(null);
  const audioElement = useRef (new Audio());
  const [volume, setVolume] = useState(1); // Default volume to 100%

  useEffect(() => {
    const fetchPodcastData = async () => {
      setLoading(true);
      setError("");

      try {
        const podcastResponse = await fetch(
          `https://podcast-api.netlify.app/id/${podcastId}`
        );
        if (!podcastResponse.ok) {
          throw new Error("Failed to fetch podcast details");
        }
        const podcastData = await podcastResponse.json();
        setPodcast(podcastData);

        const showsResponse = await fetch("https://podcast-api.netlify.app/");
        if (!showsResponse.ok) {
          throw new Error("Failed to fetch shows");
        }
        const shows = await showsResponse.json();
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

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleSeasonChange = (e) => {
    const selected = e.target.value;
    setSelectedSeason(selected);
    if (selected && podcast) {
      const seasonData = podcast.seasons.find(
        (season) => season.season === parseInt(selected)
      );
      setEpisodes(seasonData ? seasonData.episodes : []);
    }
  };

  const handlePlayPause = (episode) => {
    if (audioPlaying === episode.title) {
      audioElement.pause();
      setAudioPlaying(null);
    } else {
      audioElement.src = episode.file;
      audioElement.play();
      setAudioPlaying(episode.title);
    }
  };

  const toggleFavoriteEpisode = (episode) => {
    const isAlreadyFavorited = favorites.some(
      (fav) => fav.title === episode.title
    );

    let updatedFavorites;
    if (isAlreadyFavorited) {
      updatedFavorites = favorites.filter((fav) => fav.title !== episode.title);
    } else {
      updatedFavorites = [...favorites, episode];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioElement.volume = newVolume;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!podcast) return <div>Podcast not found!</div>;

  return (
    <div className="podcast-detail">
      <div className="image">
        <img src={podcast.image} alt={podcast.title} />
      </div>
      <div className="content">
        <div className="description">
          <h2>{podcast.title}</h2>
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
                    <button
                      className="play-pause-btn"
                      onClick={() => handlePlayPause(episode)}
                    >
                      {audioPlaying === episode.title ? (
                        <FaPause size={24} />
                      ) : (
                        <FaPlay size={24} />
                      )}
                    </button>
                    <FavoriteButton
                      episode={episode}
                      isFavorite={favorites.some(
                        (fav) => fav.title === episode.title
                      )}
                      toggleFavorite={toggleFavoriteEpisode}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="audio-player">
        <button
          className="play-pause-btn"
          onClick={() => {
            if (audioPlaying) {
              audioElement.pause();
              setAudioPlaying(null);
            } else {
              audioElement.play();
            }
          }}
        >
          {audioPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
        <FaVolumeUp />
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