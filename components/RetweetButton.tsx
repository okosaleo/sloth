"use client";

import { CheckCheck } from "lucide-react";
import { useState, useEffect } from "react";

interface TimerButtonProps {
  telegramId: string;
  retweetUrl: string;
}

const RetweetButton: React.FC<TimerButtonProps> = ({ telegramId, retweetUrl }) => {
  const [hasClicked, setHasClicked] = useState(false);

  // Load state from LocalStorage
  useEffect(() => {
    const clickedState = localStorage.getItem(`hasClicked_${telegramId}`);
    if (clickedState === "true") {
      setHasClicked(true);
    }
  }, [telegramId]);

  const handleClick = async () => {
    if (hasClicked) return;

    setHasClicked(true);
    localStorage.setItem(`hasClicked_${telegramId}`, "true");

    try {
      // Notify backend to increment points
      const response = await fetch("/api/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegramId, points: 1200 }),
      });

      if (!response.ok) {
        throw new Error("Failed to update points");
      }

      // Redirect to external URL
      window.location.href = retweetUrl;
    } catch (error) {
      console.error("Error updating points:", error);

      // Optionally: revert click state if needed
      localStorage.removeItem(`hasClicked_${telegramId}`);
      setHasClicked(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`text-text-color text-[12px] font-bold p-2 rounded-md ${
        hasClicked ? "bg-primary-bg cursor-not-allowed" : "bg-button-color"
      }`}
      disabled={hasClicked}
    >
      {hasClicked ? "✔️": "1200 Sloth"}
    </button>
  );
};

export default RetweetButton;