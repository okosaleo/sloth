"use client"
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface TimerButtonProps {
  telegramId: string;  // Telegram ID is a string but represents BigInt in database
  thirdRetweetUrl: string;
}

const ThirdRetweetButton: React.FC<TimerButtonProps> = ({ telegramId, thirdRetweetUrl }) => {
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load state from the backend API
  useEffect(() => {
    const fetchButtonState = async () => {
      const response = await fetch(`/api/points/bnt?telegramId=${telegramId}`);
      if (response.ok) {
        const data = await response.json();
        setHasClicked(data.clicked);
      }
    };

    fetchButtonState();
  }, [telegramId]);

  const handleClick = async () => {
    if (hasClicked || loading) return; // Prevent multiple clicks while loading or if already clicked
    setLoading(true);
    setHasClicked(true);

    try {
      // Notify the backend to increment points
      const response = await fetch("/api/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegramId, points: 1200 }),
      });

      if (!response.ok) {
        throw new Error("Failed to update points");
      }

      // Notify backend to update the button state in the database
      await fetch(`/api/points/button-state`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegramId, clicked: true }),
      });

      // Redirect to external URL
      window.location.href = thirdRetweetUrl;
    } catch (error) {
      console.error("Error updating points:", error);
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
      {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : hasClicked ? <Image src="/check.svg" alt="" width={14} height={14} /> : "1200 Sloth"}
    </button>
  );
};

export default ThirdRetweetButton;

