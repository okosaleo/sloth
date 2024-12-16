"use client";
import { useState, useEffect } from "react";
import { initUtils } from "@telegram-apps/sdk";

interface ReferralSystemProps {
  initData: string;
  userId: string;
  startParam: string;
}

const ReferralSystem: React.FC<ReferralSystemProps> = ({
  initData,
  userId,
  startParam,
}) => {
  const [referrals, setReferrals] = useState<string[]>([]);
  const [referrer, setReferrer] = useState<string | null>(null);
  const INVITE_URL = "https://t.me/Cutekoalabot/CuteKoala/start";

  useEffect(() => {
    const handleReferral = async () => {
      if (startParam && userId) {
        try {
          const response = await fetch("/api/referrals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, referrerId: startParam }),
          });

          if (!response.ok) {
            throw new Error("Failed to save referral");
          }

          // Fetch the latest referrals and referrer info
          fetchReferrals();
        } catch (error) {
          console.error("Error saving referral:", error);
        }
      }
    };

    const fetchReferrals = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/referrals?userId=${userId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch referrals");
          }
          const data = await response.json();
          setReferrals(data.referrals);
          setReferrer(data.referrer);
        } catch (error) {
          console.error("Error fetching referrals:", error);
        }
      }
    };

   handleReferral();
  }, [userId, startParam]);

  const handleInviteFriend = () => {
    const utils = initUtils();
    const inviteLink = `${INVITE_URL}?startapp=${userId}`;
    const shareText = `Join me on Sloth and gain rewards!`;
    const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(
      inviteLink
    )}&text=${encodeURIComponent(shareText)}`;
    utils.openTelegramLink(fullUrl);
  };

  const handleCopyLink = () => {
    const inviteLink = `${INVITE_URL}?startapp=${userId}`;
    navigator.clipboard.writeText(inviteLink);
    alert("Invite link copied to clipboard!");
  };

  return (
    <div className="w-full max-w-md flex flex-col">
      {referrer && (
        <p className="text-text-color font-Nohemi text-sm mb-4">
          You were referred by user {referrer}
        </p>
      )}
      <div className="flex flex-row items-center gap-8 justify-center mt-5 mb-7 w-[98%]">
        <button
          onClick={handleInviteFriend}
          className="text-primary-bg font-bold py-2 px-4 bg-button-color rounded"
        >
          Invite Friend
        </button>
        <button
          onClick={handleCopyLink}
          className="text-primary-bg font-bold py-2 px-4 bg-button-color rounded"
        >
          Copy Invite Link
        </button>
      </div>
      {referrals.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-2xl font-Nohemi text-text-color font-bold mb-4">
            Your Referrals
          </h2>
          <ul>
            {referrals.map((referral, index) => (
              <li
                key={index}
                className="bg-gray-100 font-Nohemi text-text-color p-2 mb-2 rounded"
              >
                User {referral}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-[150px] h-[150px]"></div>
          <div className="p-3 w-full flex justify-center items-center">
            <p className="font-Nohemi text-text-color">
              You have no referrals now. Invite friends to get more points.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralSystem;
