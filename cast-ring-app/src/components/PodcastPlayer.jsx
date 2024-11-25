import { useState, useRef, useEffect } from "react";
import { Play, Pause, VolumeX, Volume2, Rewind, FastForward } from "lucide-react";
import PropTypes from "prop-types";
import "./podcastPlayer.css";

export default function CompactPodcastPlayer({
  audioUrl,
  episodeTitle = "Unknown Episode",
  showName = "Unknown Show",
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMute, setIsMute] = useState(false);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      isPlaying ? audio.pause() : audio.play();
      setIsPlaying(!isPlaying);
    }
  };

  //handle volume

  const newVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMute(newVolume === 0);
  };

  //toggle for mute

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
    <div className="compact-podcast-player">
      <audio ref={audioRef} src={audioUrl} />
      <div className="player-controls">
        <div className="episode-info">
          <div className="episode-details">
            <div className="episode-title">{episodeTitle}</div>
            <div className="show-name">{showName}</div>
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
            {isMute ? <VolumeX sixe={20} /> : <Volume2 size={20} />}
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

CompactPodcastPlayer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  episodeTitle: PropTypes.string,
  showName: PropTypes.string,
};
