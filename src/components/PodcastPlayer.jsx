import { useRef, useEffect } from "react";
import { Play, Pause, VolumeX, Volume2, Rewind, FastForward } from "lucide-react";
import PropTypes from "prop-types";
import { usePodcastContext } from "../usePodcastContext";
import "./podcastPlayer.css";

export default function PodcastPlayer({
  audioUrl,
  episodeTitle,
  showName 
}) {
  const {
    currentEpisode,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    volume,
    setVolume,
    isMute,
    setIsMute,
    setCurrentEpisode,
  } = usePodcastContext();

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    console.log("Audio element:", audio);
    console.log("Audio volume:", audio.volume);
    console.log("Audio is muted:", isMute);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [setDuration, setCurrentTime, isMute]);

  useEffect(() => {
    if (currentEpisode?.audioUrl) {
      const audio = audioRef.current; // Assuming you have a reference to your audio element

      audio.src = currentEpisode.audioUrl; // Update audio source
      if (isPlaying) {
        audio.play(); // Play the audio if isPlaying is true
      } else {
        audio.pause(); // Pause the audio if isPlaying is false
      }
    }
  }, [currentEpisode, isPlaying]); // Dependency on currentEpisode and isPlaying

  useEffect(() => {
    setCurrentEpisode({ title: episodeTitle, show: showName, url: audioUrl });
  }, [audioUrl, episodeTitle, showName, setCurrentEpisode]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      // Ensure audio is played when clicked - this is for the audio player
      isPlaying ? audio.pause() : audio.play();
      setIsPlaying(!isPlaying);
    }
  };

  const newVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMute(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMute) {
      audioRef.current.volume = volume;
      setIsMute(false);
    } else {
      audioRef.current.volume = 0;
      setIsMute(true);
    }
  };

  const handleSkip = (seconds) => {
    const audio = audioRef.current;
    const newTime = audio.currentTime + seconds;
    audio.currentTime = Math.max(0, Math.min(newTime, duration));
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="podcast-player">
      <audio ref={audioRef} src={currentEpisode?.audioUrl} />
      <div className="player-controls">
        <div className="episode-info">
          <div className="episode-details">
            <div className="episode-title">{currentEpisode?.title}</div>
            <div className="show-name">{currentEpisode?.showName}</div>
          </div>
        </div>

        <div className="playback-controls">
          <button onClick={() => handleSkip(-30)} className="skip-back">
            <Rewind size={16} />
          </button>
          <button onClick={togglePlayPause} className="play-pause">
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button onClick={() => handleSkip(30)} className="skip-forward">
            <FastForward size={16} />
          </button>
        </div>

        <div ref={progressBarRef} className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        <div className="time-display">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        {/* Volume Control */}

        <div className="volume-control">
          <button onClick={toggleMute} className="volume-button">
            {isMute ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMute ? 0 : volume}
            onChange={newVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  );
}

PodcastPlayer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  episodeTitle: PropTypes.string,
  showName: PropTypes.string,
};