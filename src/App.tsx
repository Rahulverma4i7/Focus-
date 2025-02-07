import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const quotes = [
  "You will do it. I have faith in you.",
  "Every small step counts. Keep going!",
  "Focus is the key to unlocking your potential.",
  "Believe in yourself and all that you are.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Stay focused, stay positive, and keep pushing forward.",
  "You are capable of amazing things.",
  "Dream big, work hard, stay focused.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
];

function App() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState("bg2.jpg");

  // Detect sections in view
  const [headerRef, headerInView] = useInView({ threshold: 0.5 });
  const [purposeRef, purposeInView] = useInView({ threshold: 0.5 });
  const [suggestionsRef, suggestionsInView] = useInView({ threshold: 0.5 });
  const [quotesRef, quotesInView] = useInView({ threshold: 0.5 });
  const [supportRef, supportInView] = useInView({ threshold: 0.5 });

  // Change background image based on the active section
  useEffect(() => {
    if (headerInView) setBackgroundImage("bg2.jpg");
    if (purposeInView) setBackgroundImage("bg2.jpg");
    if (suggestionsInView) setBackgroundImage("bg2.jpg");
    if (quotesInView) setBackgroundImage("bg3.jpg");
    if (supportInView) setBackgroundImage("bg3.jpg");
  }, [
    headerInView,
    purposeInView,
    suggestionsInView,
    quotesInView,
    supportInView,
  ]);

  // Rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden transition-all duration-500"
      style={{
        backgroundImage: `url('/Image/${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Ensures the background image stays fixed
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* Circular Logo in Top-Left Corner */}
      <div className="absolute top-4 left-4 z-20">
        <img
          src="/Image/logo1.jpg" // Replace with your logo path
          alt="Logo"
          className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl w-full">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: headerInView ? 1 : 0, y: headerInView ? 0 : 50 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-8xl font-bold text-gray-300 mb-4">
            Welcome to Enhance Your Focus
          </h1>
          <h3 className="text-xl text-gray-200 mb-12">
            We will help you focus on your work. You only need to play a small
            game to train your focus.
          </h3>
        </motion.div>

        {/* Purpose and Suggestions Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Purpose Card */}
          <motion.div
            ref={purposeRef}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-opacity-90 p-8 rounded-2xl shadow-xl cursor-pointer"
          >
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">
              Purpose of This Game
            </h2>
            <p className="text-gray-300">
              This game is designed to improve your focus and relax your body
              after long hours of work or to help you concentrate before
              starting your tasks. It’s a simple yet effective way to train your
              mind and stay productive.
            </p>
          </motion.div>

          {/* Suggestions Card */}
          <motion.div
            ref={suggestionsRef}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-opacity-90 p-8 rounded-2xl shadow-xl cursor-pointer"
          >
            <h2 className="text-2xl font-semibold text-gray-200 mb-6">
              Suggestions: Before We Start This Game
            </h2>
            <ol className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-gray-900 rounded-full flex items-center justify-center mr-3">
                  1
                </span>
                Get a natural fragrance like Attar or Oud.
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                  2
                </span>
                Have a mint chewing gum.
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                  3
                </span>
                Drink electrolytes or enough water.
              </li>
            </ol>
          </motion.div>
        </motion.div>

        {/* Get Started Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: headerInView ? 1 : 0, y: headerInView ? 0 : 50 }}
          transition={{ duration: 0.5 }}
          className="mt-12 pb-4  "
        >
          <Link to="/Stay-focus">
            <Button>Get Started</Button>
          </Link>
        </motion.div>

        {/* Positive Quotes Section */}
        <motion.div
          ref={quotesRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: quotesInView ? 1 : 0, y: quotesInView ? 0 : 50 }}
          transition={{ duration: 0.5 }}
          className="bg-opacity-90 p-8 rounded-2xl shadow-xl mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
            Motivational Quotes
          </h2>
          <div className="space-y-4 text-gray-400 italic">
            <p key={currentQuoteIndex} className="animate-fade-in">
              “{quotes[currentQuoteIndex]}”
            </p>
          </div>
        </motion.div>

        {/* Buy Me a Coffee Section */}
        <motion.div
          ref={supportRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: supportInView ? 1 : 0,
            y: supportInView ? 0 : 50,
          }}
          transition={{ duration: 0.5 }}
          className="bg-opacity-90 p-8 rounded-2xl shadow-xl mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
            Support My Work
          </h2>
          <p className="text-gray-400 mb-4">
            If you find this helpful, consider buying me a coffee!
          </p>
          <div className="flex justify-center ml-[35%] border-4 rounded-lg w-48">
            <img
              src="/Image/QR.jpg" // Replace with your QR code image
              alt="Buy Me a Coffee QR Code"
              className="w-68 h-48"
            />
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 mt-12 text-center text-gray-200">
        <p className="mb-4">Made with ❤️ by Rahul | Follow me on:</p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://www.linkedin.com/in/rahul-verma-4213b9231"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Rahulverma4i7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfy90lwmBSJVqPyV2hpeFkyx2n6xJaroSLTo8I2H-Rd8l2l3w/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            FeedBack
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
