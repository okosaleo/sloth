"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface TimerButtonProps {
  telegramId: string;
  eraxUrl: string;
}

const Erax: React.FC<TimerButtonProps> = ({ telegramId, eraxUrl }) => {
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load state from LocalStorage
  useEffect(() => {
    const clickedState = localStorage.getItem(`erax_${telegramId}`);
    if (clickedState === "true") {
      setHasClicked(true);
    }
  }, [telegramId]);

  const handleClick = async () => {
    if (hasClicked) return;

    setHasClicked(true);
    localStorage.setItem(`erax_${telegramId}`, "true");

    try {
      // Notify backend to increment points
      const response = await fetch("/api/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegramId, points: 5000 }),
      });

      if (!response.ok) {
        throw new Error("Failed to update points");
      }

      // Redirect to external URL
      window.location.href = eraxUrl;
    } catch (error) {
      console.error("Error updating points:", error);

      // Optionally: revert click state if needed
      localStorage.removeItem(`erax_${telegramId}`);
      setHasClicked(false);
    } finally {
      setLoading(false);
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
         {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : hasClicked ? <Image src="/check.svg" alt="" width={14} height={14} /> : "5000 Sloth"}
    </button>
  );
};

export default Erax;