"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    show_8665123?: () => Promise<void>;
  }
}

interface TimerButtonProps {
  telegramId: string;
}

const TimerButton: React.FC<TimerButtonProps> = ({ telegramId }) => {
  const [hasClicked, setHasClicked] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);

  // Load the ad script on component mount
  useEffect(() => {
    if (window.show_8665123) return;

    const script = document.createElement("script");
    script.src = "//niphaumeenses.net/vignette.min.js";
    script.dataset.zone = "8665123";
    script.dataset.sdk = "show_8665123";
    document.body.appendChild(script);
  }, []);

  // Restore timer from localStorage on component mount
  useEffect(() => {
    const storedTimer = localStorage.getItem("timer");
    const timerEnd = localStorage.getItem("timerEnd");

    if (storedTimer && timerEnd) {
      const remainingTime = parseInt(timerEnd) - Date.now();
      if (remainingTime > 0) {
        setTimer(Math.ceil(remainingTime / 1000));
        setHasClicked(true);
      } else {
        localStorage.removeItem("timer");
        localStorage.removeItem("timerEnd");
      }
    }
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (timer === null) return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev !== null && prev > 0) {
          const newTimer = prev - 1;
          if (newTimer === 0) {
            setHasClicked(false);
            localStorage.removeItem("timer");
            localStorage.removeItem("timerEnd");
          }
          return newTimer;
        }
        return null;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const showAd = async () => {
    if (hasClicked) return;

    try {
      if (window.show_8665123) {
        // Display the ad
        await window.show_8665123();

        // Start cooldown timer (60 seconds)
        const cooldownTime = 60;
        const timerEnd = Date.now() + cooldownTime * 1000;

        setHasClicked(true);
        setTimer(cooldownTime);

        // Persist timer state in localStorage
        localStorage.setItem("timer", cooldownTime.toString());
        localStorage.setItem("timerEnd", timerEnd.toString());

        // Notify backend to increment points
        await fetch("/api/points", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ telegramId, points: 100 }),
        });
      } else {
        throw new Error("Ad script not loaded");
      }
    } catch (error) {
      console.error("Error displaying ad or updating points:", error);
      setHasClicked(false); // Reset state in case of error
    }
  };

  return (
    <button
      onClick={showAd}
      className={`text-text-color text-[12px] font-bold p-2 rounded-md ${
        hasClicked ? "bg-button-color cursor-not-allowed" : "bg-button-color"
      }`}
      disabled={hasClicked}
    >
      {hasClicked
        ? `Wait ${timer} seconds`
        : "100 Sloth"}
    </button>
  );
};

export default TimerButton;

