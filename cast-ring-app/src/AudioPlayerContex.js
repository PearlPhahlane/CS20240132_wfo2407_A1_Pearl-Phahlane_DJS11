import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create a context
const AudioPlayerContext = createContext();

// Create a provider for the context
export const AudioPlayerProvider = ({ children }) => {
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    audioUrl: null,
    episodeTitle: "",
    showName: "",
  });

  const playAudio = (url, title, show) => {
    setAudioState({
      isPlaying: true,
      audioUrl: url,
      episodeTitle: title,
      showName: show,
    });
  };

  const pauseAudio = () => {
    setAudioState((prevState) => ({ ...prevState, isPlaying: false }));
  };

  return (
    <AudioPlayerContext.Provider value={{ audioState, playAudio, pauseAudio }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
AudioPlayerProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is passed
};

export default AudioPlayerProvider;