import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";

const MusicPlayer = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const response = await axios.get("/api/tracks");
        setTracks(response.data);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    }

    fetchTracks();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((currentTrackIndex + 1) % tracks.length);
  };

  const handlePreviousTrack = () => {
    setCurrentTrackIndex(
      (currentTrackIndex - 1 + tracks.length) % tracks.length
    );
  };

  return (
    <div className="fixed top-2 right-4 p-2">
      <audio
        ref={audioRef}
        src={
          tracks[currentTrackIndex]
            ? `/music/${tracks[currentTrackIndex].file}`
            : null
        }
      />
      <div className="flex  ">
        <button
          onClick={handlePreviousTrack}
          className="p-2"
          disabled={tracks.length === 0}
        >
          <Image
            src="/back.png"
            alt="Previous"
            width={30}
            height={30}
          />
        </button>
        <button
          onClick={handlePlayPause}
          className="p-2"
          disabled={tracks.length === 0}
        >
          <Image
            src={isPlaying ? "/play.png" : "/pause.png"}
            alt={isPlaying ? "Pause" : "Play"}
            width={30}
            height={30}
          />
        </button>
        <div >
          <button
            onClick={handleNextTrack}
            className="p-2"
            disabled={tracks.length === 0}
          >
            <Image src="/next.png" alt="Next" width={30} height={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
