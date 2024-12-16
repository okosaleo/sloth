'use client';

import useSWR from 'swr';
import Image from 'next/image';
import { ArrowRight, MedalIcon, UsersRound } from "lucide-react";
import WalletConnect from "@/components/WalletConnect";
import KoalaLottie from "@/components/koalaLottie";
import Link from 'next/link';
import LoadingLottie from '@/components/LoadingLottie';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProtectedPageUser({ params }: { params: { id: string } }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const { data: userDetails, error: userError } = useSWR(
    `${apiUrl}/api/user/${params.id}`,
    fetcher
  );

  const { data: userPoints, error: pointsError, isValidating } = useSWR(
    `${apiUrl}/api/points/${params.id}`,
    fetcher,
  );

  if (userError || pointsError) {
    return <div className="text-red-500">Error loading data. Please try again later.</div>;
  }

  if (!userDetails || !userPoints) {
    return <div className='font-Nohemi text-base flex items-center flex-col gap-2 justify-center h-screen text-text-color'>
     <LoadingLottie />
      Loading...</div>;
  }

  return (
    <div className="flex h-fit min-h-[86vh] flex-col w-full items-center justify-center p-10 bg-primary-bg">
      <div className="mb-5">
        <WalletConnect />
      </div>
      <div className="relative w-[120px] h-[120px] mb-4">
        <Image src="https://utfs.io/f/MyBJHXY8aJsOS2KmH9WimRJdxk6aPTCH0YyQGBOlWEbsU5c2" alt="Koala Logo" fill />
      </div>
      <div className="flex flex-col border-[1.5px] border-text-color rounded-md mb-16">
        <div className="flex flex-row items-center text-4xl font-Nohemi text-text-color gap-2 p-3">
          <p>{userPoints.points}</p> <span className="text-sm">Sloth</span>
          {isValidating && <span className="text-xs ml-2">.</span>}
        </div>
        <hr />
        <div className="flex-row p-3 flex items-center justify-center border-t-[1px] border-text-color w-full">
          <h3 className="text-text-color font-Nohemi text-[13px]">
            Hello {userDetails.json.username}
          </h3>
          <KoalaLottie />
        </div>
      </div>
      <a className='border-0 bg-none ' href='https://t.me/RealslothHouse'>
      <div className="flex bg-under-color items-center w-max justify-center flex-row gap-4 border-[1.5px] border-text-color p-3 rounded-md font-Nohemi text-text-color mb-4">
        <UsersRound className="size-4" />
        <p>Join the Sloth Community</p>
        <ArrowRight className="size-4" />
      </div>
      </a>
      <Link href={`/protectedUser/tasks/${userDetails.json.telegramId}`} className="flex bg-under-color items-center w-max justify-center flex-row gap-4 border-[1.5px] border-text-color p-3 rounded-md font-Nohemi text-text-color">
        <MedalIcon className="size-4" />
        <p>Start Earning with Tasks</p>
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
