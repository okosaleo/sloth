"use client";
import FriendComponent from "@/components/Friends";
import { initUtils } from "@telegram-apps/sdk";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Sloth from "../../../../public/lottie/sloth.json"

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Friends({ params }: { params: { id: string } }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [startParam, setStartParam] = useState("");
  const [initData, setInitData] = useState("");
  const [username, setUsername] = useState<string | undefined>("");
  const [userId, setUserId] = useState("");
  const INVITE_URL = "https://t.me/Cutekoalabot/CuteKoala/start";

  const { data, error, isLoading} = useSWR(
    `${apiUrl}/api/referrals/${params.id}`,
    fetcher
  );

  useEffect(() => {
    const initWebApp = async () => {
      if (typeof window !== "undefined") {
        const WebApp = (await import("@twa-dev/sdk")).default;
        WebApp.ready();
        setInitData(WebApp.initData || "");
        setUserId(WebApp.initDataUnsafe?.user?.id?.toString() || "");
        setStartParam(WebApp.initDataUnsafe?.start_param || "");
        setUsername(WebApp.initDataUnsafe?.user?.username || "");
      }
    };
    initWebApp();
  }, []);

  useEffect(() => {
    const handleReferral = async () => {
      if (startParam && userId) {
        try {
          const response = await fetch("/api/referrals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, referrerId: startParam, username }),
          });

          if (!response.ok) {
            throw new Error("Failed to save referral");
          }
        } catch (error) {
          console.error("Error saving referral:", error);
        }
      }
    };

    handleReferral();
  }, [userId, startParam, username]);

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

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error fetching referral data.</p>
      </div>
    );
  }

  if (isLoading) {
    return <div className='font-Nohemi text-base flex items-center flex-col gap-2 justify-center h-screen text-text-color'>
      <Lottie  animationData={Sloth} loop={true} className="w-[120px] h-[120px]" />
      Loading...</div>;
  }

  const { referrals, referralCount } = data;

  return (
    <div className="bg-primary-bg p-4 w-full gap-3 flex flex-col justify-center items-center overflow-y-scroll h-fit mb-20">
      <FriendComponent />
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
      {referralCount ? (
        <div className="mt-1 flex flex-col items-center justify-center w-full">
          <strong className="font-Nohemi text-text-color text-xl ">Total Referrals: {referralCount}</strong> 
          <div className="flex justify-start items-start flex-col w-full">
          <ul className="mt-4 text-text-color font-Nohemi text-sm flex flex-col justify-start items-start w-full gap-2 ">
          {
            referrals.map((referral: { referrerUsername: string | null }, index: number) => (
              <li key={index} className="p-2 border-b w-full">
             Sloth Member🦥:<span> </span> {referral.referrerUsername || "Anonymous"}
            </li>
            ))
          }
          </ul>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="p-3 w-full flex justify-center items-center">
            <p className="font-Nohemi text-text-color">
              You have no referrals now. Invite friends to get more points.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
