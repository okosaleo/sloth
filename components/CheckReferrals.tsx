"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CheckReferralsButtonProps {
  telegramId: bigint;
}

const CheckReferralsButton: React.FC<CheckReferralsButtonProps> = ({ telegramId }) => {
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Unique key for storing state in localStorage
  const localStorageKey = `checkReferrals_${telegramId}`;

  // Load initial state from localStorage
  useEffect(() => {
    const storedState = localStorage.getItem(localStorageKey);
    if (storedState === "true") {
      setHasClicked(true);
    }
  }, [localStorageKey]);

  const handleCheckReferrals = async () => {
    if (hasClicked || loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/check-referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegramId }),
      });

      if (!response.ok) {
        throw new Error("You haven't invited enough users");
      }

      const data = await response.json();
      if (data.success) {
        setHasClicked(true);
        localStorage.setItem(localStorageKey, "true");
      } else {
        throw new Error(data.message || "You haven't referred enough users.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckReferrals}
        className={`text-[12px] font-bold p-2 rounded-md font-Nohemi text-text-color ${
          hasClicked || loading ? "bg-primary-bg cursor-not-allowed" : "bg-button-color"
        }`}
        disabled={hasClicked || loading}
      >
        {loading ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : hasClicked ? (
          <Image src="/check.svg" alt="" width={14} height={14} />
        ) : (
          "5000 Sloth"
        )}
      </button>
      {error && <p className="text-[#db1e1ee5] font-Nohemi text-[10px] mt-2">{error}</p>}
    </div>
  );
};

export default CheckReferralsButton;

