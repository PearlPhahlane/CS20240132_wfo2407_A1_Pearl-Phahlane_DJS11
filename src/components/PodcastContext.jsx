import { createContext, useState } from "react";
import PropTypes from "prop-types";


const PodcastContext = createContext();

export function PodcastProvider({ children}) {
    const [currentEpisode, setCurrentEpisode] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1); // Default volume is 100%
    const [isMute, setIsMute] = useState(false);

    return (
      <PodcastContext.Provider
        value={{
          currentEpisode,
          setCurrentEpisode,
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
        }}
      >
        {children}
      </PodcastContext.Provider>
    );
}
PodcastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PodcastContext; 