"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface TimerButtonProps {
  telegramId: string;
  reactUrl: string;
}

const ReactCommunity: React.FC<TimerButtonProps> = ({ telegramId, reactUrl}) => {
  const [hasClicked, setHasClicked] = useState(false);

  // Load state from LocalStorage
  useEffect(() => {
    const clickedState = localStorage.getItem(`hasReact_${telegramId}`);
    if (clickedState === "true") {
      setHasClicked(true);
    }
  }, [telegramId]);

  const handleClick = async () => {
    if (hasClicked) return;

    setHasClicked(true);
    localStorage.setItem(`hasReact_${telegramId}`, "true");

    try {
      // Notify backend to increment points
      const response = await fetch("/api/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegramId, points: 100 }),
      });

      if (!response.ok) {
        throw new Error("Failed to update points");
      }

      // Redirect to external URL
      window.location.href = reactUrl;
    } catch (error) {
      console.error("Error updating points:", error);

      // Optionally: revert click state if needed
      localStorage.removeItem(`hasReact_${telegramId}`);
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
      {hasClicked ? <Image src="/check.svg" alt="" width={14} height={14} /> : "100 Sloth"}
    </button>
  );
};

export default ReactCommunity;
