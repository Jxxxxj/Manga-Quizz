import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Image from "next/image";

const MusicPlayer = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const response = await axios.get("/api/tracks");
        setTracks(response.data);
        if (response.data.length > 0) {
          setCurrentTrackIndex(0);
        }
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
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleNextTrack = useCallback(() => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    setIsPlaying(true);
  }, [tracks.length]);

  const handlePreviousTrack = useCallback(() => {
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length
    );
    setIsPlaying(true);
  }, [tracks.length]);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleEnded = () => {
      handleNextTrack();
    };

    if (audioElement) {
      audioElement.addEventListener("ended", handleEnded);

      return () => {
        audioElement.removeEventListener("ended", handleEnded);
      };
    }
  }, [handleNextTrack]);

  return (
    <div className=" m-2  justify-center items-center bg-white rounded-lg shadow-md">
      <audio
        ref={audioRef}
        src={
          tracks[currentTrackIndex]
            ? `/music/${tracks[currentTrackIndex].file}`
            : null
        }
      />
      <div className="flex items-center">
        <button
          onClick={handlePreviousTrack}
          className="p-2"
          disabled={tracks.length === 0}
        >
          <Image src="/back.png" alt="Previous" width={30} height={30} />
        </button>
        <button
          onClick={handlePlayPause}
          className="p-2"
          disabled={tracks.length === 0}
        >
          <Image
            src={isPlaying ? "/pause.png" : "/play.png"}
            alt={isPlaying ? "Pause" : "Play"}
            width={30}
            height={30}
          />
        </button>
        <button
          onClick={handleNextTrack}
          className="p-2"
          disabled={tracks.length === 0}
        >
          <Image src="/next.png" alt="Next" width={30} height={30} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
