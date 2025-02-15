import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";

export const Focus = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(-1); // -1 means no dot is active initially
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(2000); // Initial speed: 2 seconds
  const [showPopup, setShowPopup] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true); // Show instructions initially

  // Start the game
  const startGame = () => {
    setIsRunning(true);
    setActiveIndex(0); // Start from the first dot
    setTimeElapsed(0); // Reset the timer
    setScore(0); // Reset the score
    setSpeed(2000); // Reset the speed
    setShowPopup(false); // Hide the popup
    setShowInstructions(false); // Hide instructions
  };

  // Stop the game
  const stopGame = () => {
    setIsRunning(false);
    setActiveIndex(-1); // Reset active dot
    setShowPopup(true); // Show the popup
  };

  // Handle dot click
  const handleDotClick = (index: number) => {
    if (index === activeIndex) {
      setScore((prev) => prev + 5); // Add 5 points for clicking the active dot
      if (score % 10 === 0 && score !== 0) {
        setSpeed((prev) => prev * 0.8); // Increase speed by 20% every 10 points
      }
    }
  };

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, []);

  // Exit the game (replace with your navigation logic)
  const handleExit = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 25); // Cycle through 25 boxes (5x5 grid)
      setTimeElapsed((prev) => prev + speed); // Increment time elapsed by current speed
    }, speed);

    // Stop after 5 minutes (300,000 milliseconds)
    const timeout = setTimeout(() => {
      stopGame();
    }, 300000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isRunning, speed]);

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center bg-no-repeat w-full overflow-hidden"
      style={{
        backgroundImage: `url('/Image/gbg.jpg')`, // Replace with your background image
        backgroundSize: "cover", // Ensures the image fits within the container
        backgroundPosition: "center", // Centers the image
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-30">
          <div className=" p-8 rounded-2xl shadow-lg text-center max-w-[90vw] max-h-[90vh] overflow-y-auto">
            <h2 className="text-4xl text-gray-500 font-bold mb-4">
              Instructions
            </h2>
            <p className="text-gray-400 mb-6">
              Follow the dots and click on them as fast as you can. Each correct
              click earns you 5 points. The speed of the dots will increase as
              you score more points. The game lasts for 5 minutes. Good luck!
            </p>
            <Button
              onClick={startGame}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            >
              Start Game
            </Button>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-5 gap-4 mb-8 h-[450px] w-[1100px] relative z-10">
        {Array.from({ length: 25 }).map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-8 h-8 rounded-full transition-opacity duration-500 cursor-pointer ${
              index === activeIndex ? "bg-blue-500" : "bg-gray-300 opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Timer and Score Display */}
      {isRunning && (
        <div className="text-white text-lg mb-4 z-10">
          <p>Time Elapsed: {Math.floor(timeElapsed / 1000)} seconds</p>
          <p>Score: {score}</p>
        </div>
      )}

      {/* End Game Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-20">
          <div
            className="relative p-8 rounded-2xl shadow-lg text-center bg-cover bg-center max-w-[90vw] max-h-[90vh] overflow-hidden"
            style={{ backgroundImage: "url('/Image/gbg2.jpg')" }}
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              You are focused now!
            </h2>
            <div className="flex gap-4">
              <Button
                onClick={startGame}
                className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
              >
                Play Again
              </Button>
              <Button
                onClick={handleExit}
                className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
              >
                Back to Work
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
