
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import BackgroundVideo from "../components/BackgroundVideo";
import MusicPlayer from "../components/MusicPlayer";

export default function Home() {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    async function fetchQuotes() {
      const response = await axios.get("/api/quotes");
      setQuotes(response.data);
    }

    fetchQuotes();
  }, []);

  const handleSubmitAnswer = () => {
    const currentQuote = quotes[currentIndex];
    if (answer.toLowerCase() === currentQuote.character.toLowerCase()) {
      setScore(score + 1);
      setFeedback("Bravo!");
    } else {
      setFeedback(
        `Faux! La bonne réponse était ${currentQuote.character}.`
      );
    }
    setAnswered(true);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % quotes.length;
    setCurrentIndex(nextIndex);
    setAnswer("");
    setFeedback("");
    setAnswered(false);

    if (nextIndex === 0) {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswer("");
    setShowScore(false);
    setFeedback("");
    setAnswered(false);
  };

 
    
  const currentQuote = quotes[currentIndex];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundVideo />
      <header className="absolute top-0 left-0 w-full py-4  text-white text-center">
       
        <h1>Manga Quiz</h1>
      </header>
      <div className="relative flex flex-col items-center justify-center min-h-screen">
        {showScore ? (
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">
              Votre Score: {score} / {quotes.length}
            </h2>
            <button
              onClick={handleRestart}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Recommencer le Quiz
            </button>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
            {currentQuote && (
              <div>
                <p className="text-xl mb-4">{currentQuote.text}</p>
                <img
                  src={currentQuote.mangaImageUrl}
                  alt={currentQuote.mangaTitle}
                  className="mx-auto mb-4"
                />
                <h2 className="text-lg font-semibold mb-4">
                  {currentQuote.mangaTitle}
                </h2>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Nom du personnage"
                  className="border border-gray-300 p-2 rounded mb-4 w-full"
                  disabled={answered}
                />
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleSubmitAnswer}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-2"
                    disabled={answered}
                  >
                    Votre réponse
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    disabled={!answered}
                  >
                    Question suivante
                  </button>
                </div>
                {feedback && (
                  <p className="mt-4 text-lg text-gray-700">{feedback}</p>
                )}
              </div>
            )}
          </div>
        )}
        <MusicPlayer />
      </div>
    </div>
  );
}
