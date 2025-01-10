"use client";
import useSWR from "swr";
import TrophyPage from "@/components/Trophy";
import Image from "next/image";
import LoadingLottie from "./LoadingLottie";

type User = {
  id: string;
  username: string | null;
  points: number;
};

const fetcher = async (url: string) => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const LeaderboardPage = () => {
  const { data, error, isValidating } = useSWR<{ topUsers: User[]; totalCount: number }>(
    "/api/top",
    fetcher,
    {
      refreshInterval: 20000, // Poll every 3 seconds
      dedupingInterval: 0,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  if (error) {
    return <div className="text-red-500">Failed to load leaderboard data.</div>;
  }

  if (!data) {
    return (
      <div className="font-Nohemi text-base flex items-center flex-col gap-2 justify-center h-screen text-text-color">
        <LoadingLottie />
        Loading...
      </div>
    );
  }

  const { topUsers, totalCount } = data;

  return (
    <div className="bg-primary-bg p-4 w-full gap-8 flex flex-col justify-center items-center overflow-y-scroll h-fit mb-20">
      <div className="flex flex-col items-center justify-center gap-2">
        <TrophyPage />
        <h1 className="font-Nohemi text-text-color text-2xl">LeaderBoard</h1>
      </div>
      <div className="bg-text-color rounded-md w-full flex items-center flex-row p-1 justify-between">
        <p className="text-under-color text-sm font-Nohemi rounded-md">Total Users</p>
        <p className="font-Nohemi text-sm">{totalCount}</p>
      </div>
      <div className="w-full flex flex-col">
        {topUsers.map((user, index) => (
          <div
            key={user.id}
            className="border-b-[1.5px] border-b-text-color flex flex-row w-full p-2 bg-primary-bg justify-between items-center"
          >
            <div className="bg-primary-bg flex flex-row gap-2">
              <div className="rounded-md w-12 h-12 bg-primary-bg relative">
                <Image src="/soh.png" alt="sloth image" fill />
              </div>
              <div className="flex flex-col">
                <p className="text-[12px] font-Nohemi text-text-color">{user.username}</p>
                <p className="text-[10px] font-Nohemi text-button-color">{user.points}</p>
              </div>
            </div>
            <div className="font-Nohemi text-text-color">{index + 1}</div>
          </div>
        ))}
      </div>
      {isValidating && <p className="text-text-color text-sm mt-2">.</p>}
    </div>
  );
};

export default LeaderboardPage;

