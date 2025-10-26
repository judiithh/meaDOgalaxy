import React, { useState, useEffect } from "react";
/*
import logo from './logo.svg'
import './App.css'
*/
function Todo() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [encouragement, setEncouragement] = useState("");

  const cheerMessages = [
    "Slow motion is still motion!",
    "without rain there are no flowers.",
    "to be or not to be",
    "Stretch your legs!",
    "Breathe",
  ];

  const breakMessages = [
    "Stay hydrated!",
    "Snacks, maybe?",
    "Take a deep breath!",
    "Look away from the screen!",
    "Stand up and stretch!",
  ];

  //Encouragement message updater
  useEffect(() => {
    let messageInterval;

    if (isRunning) {
      const messages = isBreak ? breakMessages : cheerMessages;
      setEncouragement(messages[0]);
      let index = 1;

      messageInterval = setInterval(() => {
        setEncouragement(messages[index]);
        index = (index + 1) % messages.length;
      }, 4000); // every 4 seconds
    } else {
      setEncouragement("");
    }

    return () => clearInterval(messageInterval);
  }, [isRunning, isBreak]);

  //Countdown timer
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const switchMode = (breakMode) => {
    setIsBreak(breakMode);
    setIsRunning(false);
    setTimeLeft(breakMode ? 5 * 60 : 25 * 60);
  };

  const handleClick = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div>
        {/*<h1>To-do Page</h1>
            <button>Home</button>*/}

        <button className="closeButton">Close</button>
      </div>

      <div className="home-content">
        <div className="home-controls">
          <button className="image-button" onClick={() => switchMode(false)}>
            Work
          </button>
          <button className="image-button" onClick={() => switchMode(true)}>
            Break
          </button>
        </div>

        <p className={`encouragement-text ${isRunning ? "hidden" : ""}`}>
          {encouragement}
        </p>

        <h1 className="home-timer">{formatTime(timeLeft)}</h1>

        <button className="home-button" onClick={handleClick}>
          Start
        </button>
      </div>
    </div>
  );
}

export default Todo;
