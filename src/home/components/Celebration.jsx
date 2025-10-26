import React from "react";
import "./Celebration.css";
import star from "../assets/Star.png";

export default function Celebration({ count = 18 }) {
  return (
    <div className="celebrate-overlay" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="confetti"
          style={{
            backgroundImage: `url(${star})`,
            // randomize motion/delay/duration via CSS variables
            "--rot": `${Math.random() * 360}deg`,
            "--tx": `${(Math.random() * 1.8 - 0.9) * 100}vw`,
            "--ty": `${(Math.random() * 0.6 + 0.8) * 100}vh`,
            "--delay": `${Math.floor(Math.random() * 300)}ms`,
            "--dur": `${1000 + Math.floor(Math.random() * 900)}ms`,
          }}
        />
      ))}
    </div>
  );
}
