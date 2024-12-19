"use client";

import WebApp from "@twa-dev/sdk";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface EmojiCheckButtonProps {
  telegramId: string;
}

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  username?: string;
  language_code: string;
  is_premium: boolean;
}

const EmojiCheckButton: React.FC<EmojiCheckButtonProps> = ({ telegramId }) => {
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const localStorageKey = `emojiCheck_${telegramId}`;

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

  const updatePoints = async () => {
    const response = await fetch("/api/points", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ telegramId, points: 2000 }),
    });

    if (!response.ok) {
      throw new Error("Failed to update points");
    }
  };

  const handleClick = async () => {
    if (hasClicked || loading) return;

    setLoading(true);
    setError(null);

    try {
      if (userData?.first_name?.includes("🦥")) {
        await updatePoints();
        setHasClicked(true);
        localStorage.setItem(localStorageKey, "true");
      } else {
        throw new Error("Username does not contain the sloth emoji");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setHasClicked(false);
      localStorage.removeItem(localStorageKey);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`text-text-color text-[12px] font-bold p-2 rounded-md ${
          hasClicked || loading ? "bg-primary-bg cursor-not-allowed" : "bg-button-color"
        }`}
        disabled={hasClicked || loading}
      >
        {loading ?  <Loader2 className="mr-2 size-4 animate-spin" /> : hasClicked ? <Image src="/check.svg" alt="" width={14} height={14} /> : "2000 Sloth"}
      </button>
      {error && <p className="text-[#db1e1ee5] mt-2 font-Nohemi text-[10px]">{error}</p>}
    </div>
  );
};

export default EmojiCheckButton;

