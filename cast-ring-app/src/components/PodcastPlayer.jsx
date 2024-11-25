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
    const[isMute, setIsMute] = useState(false);
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


//To handle functionality of the buttons on the player 


    //How the time should be formatted
    const formatTime = (time) => {
        const hours = Math.floor(time/3600);
        const minutes = Math.floor((time % 3600) * 60);
        const seconds = Math.floor(time % 60);

        if (hours > 0){
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    //to handle pause

    const handlePause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying);
    }


    //handle seeking by clicking progress bar
    
    const handleTimeUpdate = (e) => {
        const clickPosition = (e.nativeEvent.offsetX) / progressBarRef.current.offsetWidth;
        const newTime = clickPosition * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
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
        if(isMute) {
            audioRef.current.volume = volume;
            setIsMute(false);
        } else {
            audioRef.current.volume = 0;
            setIsMute(true)
        }
    };

    //handle skip in seconds

    const handleSkip = (second) => {
        const newTime = audioRef.current.currentTime + seconds;
        audioRef.current.currentTime = Math.max(0, Math.min(newTime, duration));
    };


    //play back rate 

    const handlePlaybackRateChange = (rate) => {
        audioRef.current.playbackRate = rate;
        setPlayBackRate(rate);
    };

    const playbackRates = [0.5, 0.8, 1, 1.2, 1.5, 2];


    return (
        <div className="podcast-player">
            <audio 
                ref={audioRef}
                src={audioUrl}
                className="hidden"
            />
            <div className="player-container">
                {/*Episode information*/}
                <div className="episode-info">
                    <img
                        src={episodeImage}
                        alt={episodeTitle}
                        className="episode-image"
                    />
                    <div className="episode-details">
                        <div className="episode-title">{episodeTitle}</div>
                        <div className="show-name">{showName}</div>
                    </div>
                </div>

                {/* Player Controls */}
                <div className="player-controls">
                    <div className="main-controls">
                        <button
                            onClick={() => handleSkip(-30)}
                            className="skip-button"
                            title="Skip back 30 seconds"
                        >
                            <Rewind size={20} />
                            <span className="skip-text">30</span>
                        </button>
                        <button
                            onClick={handlePause}
                            className="play-button"
                        >
                            {isPlaying ? (
                                <pause size={24} />
                            ) : (
                                <play size={24} />
                            )}
                        </button>
                    </div>
                </div>
                

            </div>


        </div>
    )


}