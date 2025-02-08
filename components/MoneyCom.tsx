"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Cookies from "js-cookie"; 
import { Loader2 } from "lucide-react";

interface TimerButtonProps {
  telegramId: string;
  telegramUrl: string;
}

const MoneyCommunity: React.FC<TimerButtonProps> = ({ telegramId, telegramUrl}) => {
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load state from LocalStorage
  useEffect(() => {
    const clickedState = Cookies.get(`money_${telegramId}`);  // Ensure proper key formatting
    if (clickedState === "true") {
      setHasClicked(true);
    }
  }, [telegramId]);

  const handleClick = async () => {
    if (hasClicked || loading) return;
    setLoading(true);
    setHasClicked(true);

    Cookies.set(`money_${telegramId}`, "true", { expires: 365, path: "" }); 

    try {
      // Notify backend to increment points
      const response = await fetch("/api/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegramId, points: 500 }),
      });

      if (!response.ok) {
        throw new Error("Failed to update points");
      }

      // Redirect to external URL
      window.location.href = telegramUrl;
    } catch (error) {
      console.error("Error updating points:", error);

      Cookies.remove(`money_${telegramId}`);
      setHasClicked(false);
    } finally {
      setLoading(false)
    }
  };

  return (
    <button
    onClick={handleClick}
    className={`text-text-color text-[12px] font-bold p-2 rounded-md ${
      hasClicked || loading ? "bg-primary-bg cursor-not-allowed" : "bg-button-color"
    }`}
    disabled={hasClicked || loading}
  >
      {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : hasClicked ? <Image src="/check.svg" alt="" width={14} height={14} /> : "500 Sloth"}
    </button>
  );
};

export default MoneyCommunity;
