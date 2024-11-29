import { createContext, useState } from "react";
import PropTypes from "prop-types";


const PodcastContext = createContext();

export function PodcastProvider({ children}) {
    const [currentEpisode, setCurrentEpisode] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <PodcastContext.Provider
        value={{
            currentEpisode,
            setCurrentEpisode,
            isPlaying,
            setIsPlaying,
        }}
        >
            {children}
        </PodcastContext.Provider>
    );
}
PodcastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};