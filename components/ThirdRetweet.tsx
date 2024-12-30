"use client"
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";  // Import js-cookie library

interface TimerButtonProps {
  telegramId: string;
  thirdRetweetUrl: string;
}

const ThirdRetweetButton: React.FC<TimerButtonProps> = ({ telegramId, thirdRetweetUrl }) => {
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load state from Cookies
  useEffect(() => {
    const clickedState = Cookies.get(`hasCli_${telegramId}`);  // Ensure proper key formatting
    if (clickedState === "true") {
      setHasClicked(true);
    }
  }, [telegramId]);

  const handleClick = async () => {
    if (hasClicked || loading) return; // Prevent multiple clicks while loading or if already clicked
    setLoading(true);
    setHasClicked(true);

    // Set the cookie to store the state permanently
    Cookies.set(`hasCli_${telegramId}`, "true", { expires: 365, path: "" }); // Cookie persists for 1 year

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
      window.location.href = thirdRetweetUrl;
    } catch (error) {
      console.error("Error updating points:", error);

      // Optionally: revert click state if needed
      Cookies.remove(`hasCli_${telegramId}`); // Remove cookie on error (optional)
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
