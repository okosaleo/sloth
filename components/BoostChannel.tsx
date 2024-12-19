"use client";

import WebApp from "@twa-dev/sdk";
import { CheckCheck } from "lucide-react";
import { useState, useEffect } from "react";

interface TimerButtonProps {
  telegramId: string;
  boostUrl: string;
}

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  username?: string;
  language_code: string;
  is_premium: boolean;
}

const BoostButton: React.FC<TimerButtonProps> = ({ telegramId, boostUrl }) => {
  const [hasClicked, setHasClicked] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const localStorageKey = `boostCheck_${telegramId}`;

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
  }, []);

  useEffect(() => {
    const clickedState = localStorage.getItem(localStorageKey);
    if (clickedState === "true") {
      setHasClicked(true);
    }
  }, [localStorageKey]);

  const handleClick = async () => {
    if (userData?.is_premium) {
      try {
        // Determine points to award based on whether the user has clicked before
        const points = hasClicked ? 200 : 1000;

        // Notify backend to increment points
        const response = await fetch("/api/points", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ telegramId, points }),
        });

        if (!response.ok) {
          throw new Error("Failed to update points");
        }

        // Update click state and redirect to external URL
        setHasClicked(true);
        localStorage.setItem(localStorageKey, "true");
        window.location.href = boostUrl;
      } catch (error) {
        console.error("Error updating points:", error);
        setHasClicked(false);
        localStorage.removeItem(localStorageKey);
      }
    } else {
      console.log("User is not premium");
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
      {hasClicked ? <CheckCheck className="size-4 bg-text-color" /> : "1000 Sloth"}
    </button>
  );
};

export default BoostButton;
