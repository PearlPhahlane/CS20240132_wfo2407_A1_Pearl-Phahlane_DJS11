import { useState, useRef, useEffect} from "react";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Settings,
    Rewind,
    FastForward
} from "lucide-react";

export default function PodcastPlayer({ 
  audioUrl, 
  episodeTitle = "Unknown Episode", 
  showName = "Unknown Show",
  episodeImage = "/api/placeholder/60/60"
}) {
    const[isPlaying, setIsPlaying] = useState(false);
    const[duration, setDuration] = useState(0);
    const[currentTime, setCurrentTime] = useState(0);
    const[volume, setVolume] = useState(1);
    const[isMute, setMute] = useState(false);
    const[playbackRate, setPlayBackRate] = useState(1);

    const audioRef = useRef(null);
    const progressBarRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;

        const handleLoadedMetaData = () => {
            setDuration(audio.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetaData);
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.removeEventListner('loadedmetadata', handleLoadedMetaData);
            audio.removeEventListner('timeupdate', handleTimeUpdate);
        };
    }, []);

    
}