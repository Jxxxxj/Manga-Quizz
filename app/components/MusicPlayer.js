<<<<<<< HEAD
import { useState, useEffect, useRef, useCallback } from "react";
=======
import { useState, useEffect, useRef } from "react";
>>>>>>> 747eef60e947f129e2e507a50466c8ecc3fb524f
import axios from "axios";
import Image from "next/image";

const MusicPlayer = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
<<<<<<< HEAD
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  
=======
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

>>>>>>> 747eef60e947f129e2e507a50466c8ecc3fb524f
  useEffect(() => {
    async function fetchTracks() {
      try {
        const response = await axios.get("/api/tracks");
        setTracks(response.data);
<<<<<<< HEAD
        if (response.data.length > 0) {
          
          setCurrentTrackIndex(0);
        }
=======
>>>>>>> 747eef60e947f129e2e507a50466c8ecc3fb524f
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    }

    fetchTracks();
  }, []);

<<<<<<< HEAD
  

=======
>>>>>>> 747eef60e947f129e2e507a50466c8ecc3fb524f
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
<<<<<<< HEAD
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
    <div className="flex items-center justify-center m-2 bg-white rounded-lg shadow-md	">
=======
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
>>>>>>> 747eef60e947f129e2e507a50466c8ecc3fb524f
      <audio
        ref={audioRef}
        src={
          tracks[currentTrackIndex]
            ? `/music/${tracks[currentTrackIndex].file}`
            : null
        }
      />
<<<<<<< HEAD
      <div className="flex">
=======
      <div className="flex  ">
>>>>>>> 747eef60e947f129e2e507a50466c8ecc3fb524f
        <button
          onClick={handlePreviousTrack}
          className="p-2"
          disabled={tracks.length === 0}
        >
<<<<<<< HEAD
          <Image src="/back.png" alt="Previous" width={30} height={30} />
=======
          <Image
            src="/back.png"
            alt="Previous"
            width={30}
            height={30}
          />
>>>>>>> 747eef60e947f129e2e507a50466c8ecc3fb524f
        </button>
        <button
          onClick={handlePlayPause}
          className="p-2"
          disabled={tracks.length === 0}
        >
          <Image
<<<<<<< HEAD
            src={isPlaying ? "/pause.png" : "/play.png"}
=======
            src={isPlaying ? "/play.png" : "/pause.png"}
>>>>>>> 747eef60e947f129e2e507a50466c8ecc3fb524f
            alt={isPlaying ? "Pause" : "Play"}
            width={30}
            height={30}
          />
        </button>
<<<<<<< HEAD
        <button
          onClick={handleNextTrack}
          className="p-2"
          disabled={tracks.length === 0}
        >
          <Image src="/next.png" alt="Next" width={30} height={30} />
        </button>
=======
        <div >
          <button
            onClick={handleNextTrack}
            className="p-2"
            disabled={tracks.length === 0}
          >
            <Image src="/next.png" alt="Next" width={30} height={30} />
          </button>
        </div>
>>>>>>> 747eef60e947f129e2e507a50466c8ecc3fb524f
      </div>
    </div>
  );
};

export default MusicPlayer;
