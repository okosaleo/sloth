"use client";
import Lottie from "lottie-react";
import Link from "next/link";
import coins from "../public/lottie/coins.json"

export default function Airdrop() {
  return (
    <div className="flex h-fit min-h-[86vh] flex-col w-full items-center justify-center p-10 bg-primary-bg">
      <div className="h-[40vh] flex flex-col items-center justify-center">
      <Lottie animationData={coins} loop={true} className="w-[100px] h-[100px]" />
        <h1 className="font-Nohemi text-2xl text-text-color">Claim your rewards!</h1>
        <h2 className="font-Nohemi text-sm text-button-color">Coming soon....</h2>
        </div>
    </div>
  )
}
